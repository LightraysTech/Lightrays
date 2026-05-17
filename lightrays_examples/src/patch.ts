// dom-patch - make small updates to the DOM to match a desired tree
// https://caolan.uk/src/dom-patch/about
//
// Copyright (c) 2026 Caolan McMahon
// MIT License

// The meta Symbol is used to attach metadata to DOM elements that will
// persist across multiple patch calls. A Symbol is used to avoid the
// property name conflicting with other libraries.
const meta = Symbol();

const DEFAULT_NAMESPACE = document.documentElement.namespaceURI;

// Checks if node matches expected tag name and key (which might be
// undefined).
const matches = (namespace: string, name: string, key: string | number | null | undefined, node: Node): boolean => (
    (node as any)[meta] &&
    (node as any)[meta].key === key &&
    (node as any)[meta].name === name &&
    (node as any)[meta].namespace === namespace
);

const adopt = (namespace: string, name: string, key: string | number | null | undefined, node: Node): void => {
    (node as any)[meta] = {
        name: (node as Element).localName,
        namespace: (node as Element).namespaceURI,
    };
    if (matches(namespace, name, undefined, node)) {
        // Assume this is hydration of server-rendered or manually inserted
        // content and optimistically adopt with the provided key if the
        // tag name matches.
        (node as any)[meta].key = key;
    }
};

export class Patcher {
    node: Element;
    #visitedAttributes?: Set<Attr>;
    #removedKeyedNodes?: Record<string | number, Node>;
    #nextChild: Node | null;

    constructor(node: Element) {
        this.node = node;
        this.#nextChild = node.firstChild;
    }

    #align(namespace: string, name: string, key: string | number | null | undefined): Element {
        let el: Element;
        if (!this.#nextChild) {
            // Reached end of node's children
            el = (
                this.#takeRemovedKey(namespace, name, key) ??
                this.#create(namespace, name, key)
            );
            this.node.append(el);
            return el;
        }
        // On first encounter of nextChild, set its metadata property.
        if (!(this.#nextChild as any)[meta]) {
            adopt(namespace, name, key, this.#nextChild);
        }
        // Does nextChild match the expected tag name (and possibly key)?
        if (matches(namespace, name, key, this.#nextChild)) {
            // No change required to DOM
            return this.#nextChild as Element;
        }
        // nextChild did not match desired tag name and key (if any).
        // Search for element with matching key.
        if (key != null) {
            // First, check to see if the key was previously removed
            if ((el = this.#takeRemovedKey(namespace, name, key) as Element)) {
                // Do not replace nextChild when matched element was
                // previously removed (keyed insert optimisation)
                this.node.insertBefore(el, this.#nextChild);
                return el;
            }
            // Look for key in later siblings
            let node: Node | null = this.#nextChild?.nextSibling;
            while (node) {
                if (matches(namespace, name, key, node)) {
                    el = node as Element;
                    break;
                }
                node = node.nextSibling;
            }
        }
        // If no keyed node matches, create a new element
        el ??= this.#create(namespace, name, key);

        // Replace nextChild with the found or created element
        this.#replaceWith(this.#nextChild as Node, el);

        // Return aligned node
        return el;
    }

    #replaceWith(a: Node, b: Element): void {
        (a as Element).replaceWith(b);
        // If 'a' has a key, add it to the removed nodes list as
        // we might need to re-insert it later.
        if ((a as any)[meta]?.key != null) {
            this.#removedKeyedNodes ??= {};
            this.#removedKeyedNodes[(a as any)[meta].key] = a;
        }
    }

    tagNS(namespace: string, name: string, key?: string | number): Patcher {
        const el = this.#align(namespace, name, key ?? null);
        this.#nextChild = el.nextSibling;
        return new Patcher(el);
    }

    tag(name: string, key?: string | number): Patcher {
        return this.tagNS(DEFAULT_NAMESPACE, name, key);
    }

    attr(name: string, value: string | number | null): this {
        return this.attrNS(undefined, name, value);
    }

    attrNS(namespace: string | undefined, name: string, value: string | number | null): this {
        // This always needs to be getAttributeNodeNS, otherwise it might
        // return differently namespaced attributes with the same name.
        let a = this.node.getAttributeNodeNS(namespace ?? null, name);
        if (a) {
            const v = typeof(value) === 'string' ? value : '' + value;
            if (a.value !== v) {
                a.value = v;
            }
        } else {
            a = this.node.ownerDocument.createAttributeNS(namespace ?? null, name);
            a.value = typeof(value) === 'string' ? value : (value === null ? '' : '' + value);
            this.node.setAttributeNodeNS(a);
        }
        this.#visitedAttributes ??= new Set();
        this.#visitedAttributes.add(a);
        return this;
    }

    #textNode(type_prop: keyof Node, create: 'createTextNode' | 'createComment' | 'createCDATASection', value: string | number): this {
        if (!this.#nextChild) {
            this.node.append(this.node.ownerDocument[create](String(value)));
        } else {
            const el = this.#nextChild;
            this.#nextChild = el.nextSibling;
            if (el.nodeType !== (Node as any)[type_prop]) {
                this.#replaceWith(el, this.node.ownerDocument[create](String(value)) as any);
            } else {
                const v = typeof(value) === 'string' ? value : '' + value;
                if (el.nodeValue !== v) {
                    el.textContent = v;
                }
            }
        }
        return this;
    }

    text(value: string | number): this {
        return this.#textNode('TEXT_NODE', 'createTextNode', value);
    }

    comment(value: string | number): this {
        return this.#textNode('COMMENT_NODE', 'createComment', value);
    }

    // This will only work with XML, not HTML documents (as HTML
    // documents do not support CDATA sections); attempting it on an
    // HTML document will throw NOT_SUPPORTED_ERR.
    cdata(value: string | number): this {
        return this.#textNode('CDATA_SECTION_NODE', 'createCDATASection', value);
    }

    // Remove unvisited child nodes
    cleanupChildNodes(): this {
        while (this.#nextChild) {
            const el = this.#nextChild;
            this.#nextChild = el.nextSibling;
            (el as Element).remove();
        }
        return this;
    }

    // Remove unvisited attributes
    cleanupAttributes(): this {
        if (this.#visitedAttributes || this.node.hasAttributes()) {
            if (this.#visitedAttributes?.size !== this.node.attributes.length) {
                for (const a of this.node.attributes) {
                    if (!this.#visitedAttributes || !this.#visitedAttributes.has(a)) {
                        this.node.removeAttributeNode(a);
                    }
                }
            }
        }
        return this;
    }

    cleanup(): this {
        return this.cleanupChildNodes().cleanupAttributes();
    }

    patch(callback: (p: Patcher) => void): this {
        callback(this);
        return this.cleanup();
    }

    // Takes node with matching key from the removed nodes array (if any)
    #takeRemovedKey(namespace: string, name: string, key: string): Element | undefined {
        const node = this.#removedKeyedNodes?.[key];
        if (node) {
            // Delete whether it matches or not, as we've now seen the key
            delete this.#removedKeyedNodes![key];
            // Only return if the tag name and namespace also match
            if (matches(namespace, name, key, node)) {
                return node as Element;
            }
        }
    }

    // Creates a new element, adding expected metadata.
    #create(namespace: string, name: string, key: string | number | null | undefined): Element {
        // NOTE: namespace will always be set due to default arg in tag()
        const el = this.node.ownerDocument.createElementNS(namespace, name);
        // setTimeout(()=>highlightElement(el),10);
        // If setting custom properties is good enough for jQuery, it's good
        // enough for me. I could use a WeakMap but it's slower.
        (el as any)[meta] = { name, key, namespace };
        return el;
    }
}


function highlightElement(el: HTMLElement) {
    el.animate([
        { background: "red", outline: "2px solid red", outlineOffset: "4px" }
    ], { duration: 800, direction: "reverse" })

}