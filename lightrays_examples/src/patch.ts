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
const matches = (namespace, name, key, node) => (
    node[meta] &&
    node[meta].key === key &&
    node[meta].name === name &&
    node[meta].namespace === namespace
);

const adopt = (namespace, name, key, node) => {
    node[meta] = {
        name: node.localName,
        namespace: node.namespaceURI,
    };
    if (matches(namespace, name, undefined, node)) {
        // Assume this is hydration of server-rendered or manually inserted
        // content and optimistically adopt with the provided key if the
        // tag name matches.
        node[meta].key = key;
    }
};

export class Patcher {
    #visitedAttributes;
    #removedKeyedNodes;
    #nextChild;

    constructor(node) {
        this.node = node;
        this.#nextChild = node.firstChild;
    }

    #align(namespace, name, key) {
        let el;
        if (!this.#nextChild) {
            // Reached end of node's children
            const el = (
                this.#takeRemovedKey(namespace, name, key) ??
                this.#create(namespace, name, key)
            );
            this.node.append(el);
            return el;
        }
        // On first encounter of nextChild, set its metadata property.
        if (!this.#nextChild[meta]) {
            adopt(namespace, name, key, this.#nextChild);
        };
        // Does nextChild match the expected tag name (and possibly key)?
        if (matches(namespace, name, key, this.#nextChild)) {
            // No change required to DOM
            return this.#nextChild;
        }
        // nextChild did not match desired tag name and key (if any).
        // Search for element with matching key.
        if (key != null) {
            // First, check to see if the key was previously removed
            if ((el = this.#takeRemovedKey(namespace, name, key))) {
                // Do not replace nextChild when matched element was
                // previously removed (keyed insert optimisation)
                this.node.insertBefore(el, this.#nextChild);
                return el;
            }
            // Look for key in later siblings
            let node = this.#nextChild?.nextSibling;
            while (node) {
                if (matches(namespace, name, key, node)) {
                    el = node;
                    break;
                }
                node = node.nextSibling;
            }
        }
        // If no keyed node matches, create a new element
        el ??= this.#create(namespace, name, key);

        // Replace nextChild with the found or created element
        this.#replaceWith(this.#nextChild, el);

        // Return aligned node
        return el;
    }

    #replaceWith(a, b) {
        a.replaceWith(b);
        // If 'a' has a key, add it to the removed nodes list as
        // we might need to re-insert it later.
        if (a[meta]?.key != null) {
            this.#removedKeyedNodes ??= {};
            this.#removedKeyedNodes[a[meta].key] = a;
        }
    }

    tagNS(namespace, name, key) {
        const el = this.#align(namespace, name, key);
        this.#nextChild = el.nextSibling;
        return new Patcher(el);
    }

    tag(name, key) {
        return this.tagNS(DEFAULT_NAMESPACE, name, key);
    }

    attr(name, value) {
        return this.attrNS(undefined, name, value);
    }

    attrNS(namespace, name, value) {
        // This always needs to be getAttributeNodeNS, otherwise it might
        // return differently namespaced attributes with the same name.
        let a = this.node.getAttributeNodeNS(namespace, name);
        if (a) {
            const v = typeof(value) === 'string' ? value : '' + value;
            if (a.value !== v) {
                a.value = v;
            }
        } else {
            a = this.node.ownerDocument.createAttributeNS(namespace, name);
            a.value = value;
            this.node.setAttributeNodeNS(a);
        }
        this.#visitedAttributes ??= new Set();
        this.#visitedAttributes.add(a);
        return this;
    }

    #textNode(type_prop, create, value) {
        if (!this.#nextChild) {
            this.node.append(this.node.ownerDocument[create](value));
        } else {
            const el = this.#nextChild;
            this.#nextChild = el.nextSibling;
            if (el.nodeType !== el[type_prop]) {
                this.#replaceWith(el, this.node.ownerDocument[create](value));
            } else {
                const v = typeof(value) === 'string' ? value : '' + value;
                if (el.nodeValue !== v) {
                    el.textContent = v;
                }
            }
        }
        return this;
    }

    text(value) {
        return this.#textNode('TEXT_NODE', 'createTextNode', value);
    }

    comment(value) {
        return this.#textNode('COMMENT_NODE', 'createComment', value);
    }

    // This will only work with XML, not HTML documents (as HTML
    // documents do not support CDATA sections); attempting it on an
    // HTML document will throw NOT_SUPPORTED_ERR.
    cdata(value) {
        return this.#textNode('CDATA_SECTION_NODE', 'createCDATASection', value);
    }

    // Remove unvisited child nodes
    cleanupChildNodes() {
        while (this.#nextChild) {
            const el = this.#nextChild;
            this.#nextChild = el.nextSibling;
            el.remove();
        }
        return this;
    }

    // Remove unvisited attributes
    cleanupAttributes() {
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

    cleanup() {
        return this.cleanupChildNodes().cleanupAttributes();
    }

    patch(callback) {
        callback(this);
        return this.cleanup();
    }

    // Takes node with matching key from the removed nodes array (if any)
    #takeRemovedKey(namespace, name, key) {
        const node = this.#removedKeyedNodes?.[key];
        if (node) {
            // Delete whether it matches or not, as we've now seen the key
            delete this.#removedKeyedNodes[key];
            // Only return if the tag name and namespace also match
            if (matches(namespace, name, key, node)) {
                return node;
            }
        }
    }

    // Creates a new element, adding expected metadata.
    #create(namespace, name, key) {
        // NOTE: namespace will always be set due to default arg in tag()
        const el = this.node.ownerDocument.createElementNS(namespace, name);
        // If setting custom properties is good enough for jQuery, it's good
        // enough for me. I could use a WeakMap but it's slower.
        el[meta] = {name, key, namespace};
        return el;
    }
}