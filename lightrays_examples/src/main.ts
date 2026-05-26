import '../../style/Lightrays.scss'
import './style.css'
import { cssNodeListToString, cssNodeToString, CssNodeType, Lexer, parse, TokenKind, TokenKindStr, type CssNode } from "./cssParser"
import { Patcher } from "./patch";

type EventRecord<K extends HTMLElement = HTMLElement> = {
    [T in keyof HTMLElementEventMap]?: <F extends Event = HTMLElementEventMap[T]>(this: K, ev: F) => any
} & Record<string, (this: K, ev: Event) => any>

type AttributeRecord<K extends HTMLElement> = {
    class?: string,
    style?: string | Partial<CSSStyleProperties>,
    events?: EventRecord<K>
} & Record<string, any>

export function html<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    attributes?: AttributeRecord<HTMLElementTagNameMap[K]>,
    ...children: (Node | string | null | ((el: HTMLElementTagNameMap[K]) => void))[]
): HTMLElementTagNameMap[K];

export function html(
    tag: string,
    attributes?: AttributeRecord<HTMLElement>,
    ...children: (Node | string | null | ((el: HTMLElement) => void))[]
): HTMLElement;

export function html(
    tag: string,
    attributes?: AttributeRecord<HTMLElement>,
    ...children: (Node | string | null | ((el: HTMLElement) => void))[]
) {
    const el = document.createElement(tag);
    if (attributes) {
        if (attributes.events) {
            for (const key in attributes.events) {
                if (!Object.hasOwn(attributes.events, key)) continue;

                const val = attributes.events[key];
                el.addEventListener(key, val)
            }
            delete attributes.events
        }
        for (const key in attributes) {
            const val = attributes[key]
            if (!val) continue

            if (key == "style" && typeof (val) == "object") {
                Object.assign(el.style, val)
            } else {
                el.setAttribute(key, val)
            }
        }
    }

    for (const c of children) {
        if (typeof c === "function") {
            c(el)
        } else if (c) {
            el.append(c)
        }
    }

    return el;
}

export const div = (html as typeof html<"div">).bind(undefined, "div")
export const span = (html as typeof html<"span">).bind(undefined, "span")
export const button = (html as typeof html<"button">).bind(undefined, "button")
export const input = (html as typeof html<"input">).bind(undefined, "input")
export const br = (html as typeof html<"br">).bind(undefined, "br")

document.body.append(
    div({ class: "bg0 p8" }, ". "),
    div({ class: "bg1 p8" }, ". "),
    div({ class: "bg2 p8" }, ". "),
    div({ class: "bg3 p8" }, ". "),
    div({ class: "bg4 p8" }, ". "),
    div({ class: "bg5 p8" }, ". "),
    br(),
    div({ class: "flex-col align-start gap16" },
        button({}, "Button"),
        input({}),
        html("select", {}, html("option", {}, "Select")),

        div({ class: "flex gap8" },
            button({ class: "", events: { click: function (e) { this.style } } }, "Button"),
            button({ class: "primary" }, "Button"),
            button({ class: "success" }, "Button"),
            button({ class: "warning" }, "Button"),
            button({ class: "error" }, "Button"),
            button({ class: "complete" }, "Button"),
        ), div({ class: "flex gap8" },
            button({ class: "muted" }, "Button"),
            button({ class: "muted primary" }, "Button"),
            button({ class: "muted success" }, "Button"),
            button({ class: "muted warning" }, "Button"),
            button({ class: "muted error" }, "Button"),
            button({ class: "muted complete" }, "Button"),
        ), div({ class: "flex gap8" },

            button({ class: "outline" }, "Button"),
            button({ class: "outline primary" }, "Button"),
            button({ class: "outline success" }, "Button"),
            button({ class: "outline warning" }, "Button"),
            button({ class: "outline error" }, "Button"),
            button({ class: "outline complete" }, "Button"),
        ), div({ class: "flex gap8" },

            button({ class: "subtle" }, "Button"),
            button({ class: "subtle primary" }, "Button"),
            button({ class: "subtle success" }, "Button"),
            button({ class: "subtle warning" }, "Button"),
            button({ class: "subtle error" }, "Button"),
            button({ class: "subtle complete" }, "Button"),
        ), div({ class: "row" },
            button({ class: "very-small mx4" }, "Button"),
            button({ class: "small mx4" }, "Button"),
            button({ class: "medium mx4" }, "Button"),
            button({ class: "large mx4" }, "Button"),
        ),
    ),
    div({ class: "bg0", style: { position: "fixed", left: "100px", top: "100px", } }, "Some Test Thingy"),
    /*html("textarea",{ class: "bg0", style: { position: "fixed", right: "8px", inset: "8px", overflow:"auto" },
 contenteditable:"true",
          events:{input:e=>document.styleSheets[0].ownerNode.innerHTML=e.target.value} },
       document.styleSheets[0].ownerNode?.innerHTML
  ), */
    // div({
    //     class: "bg0", style: { position: "fixed", right: "8px", inset: "8px", overflow: "auto", whiteSpace: "pre" },
    //     // contenteditable: "true",
    //     events: { input: e => document.styleSheets[0].ownerNode.innerHTML = e.target.value }
    // },
    //     ...[...document.styleSheets].map(sheet => [...sheet.cssRules]).flat().map(rule => div({
    //         events: {
    //             pointerover: e => {
    //                 document.querySelectorAll(rule.selectorText).forEach(el=>el.style.background="red")
    //             },
    //              pointerout: e => {
    //                 document.querySelectorAll(rule.selectorText).forEach(el=>el.style.background="")
    //             }
    //         }
    //     }, rule.selectorText))
    // )
    // createCssEditor(),
    // ...tokenizeCss(document.styleSheets[1].ownerNode.innerHTML)
    //     .map(v => div({}, "|" + document.styleSheets[1].ownerNode.innerHTML.slice(v.start, v.end) + "|", "  ------ ", v.type))
)

// let txt = document.styleSheets[1]!.ownerNode!.innerHTML as string
// let newtxt = tokenizeCss(txt).map(t => txt.slice(t.loc.start, t.loc.end)).join("")
// // console.log(txt == newtxt);
// console.log(parseCss(txt));

interface CssRuleRef {
    stylesheet: StyleSheet;
    selectorPath: string[];
    linePath: number[];
}

function benchmark(N: number, fn: () => any, name?: string) {
    let sum = 0
    for (let i = 0; i < N; i++) {
        const t0 = performance.now()
        fn()
        const t1 = performance.now()
        sum += t1 - t0
    }

    console.log("Benchmark:", name || fn.name, sum / N);
}

function benchmark2(N: number, fn1: () => any, fn2: () => any, name?: string) {
    let sum1 = 0
    let sum2 = 0
    for (let i = 0; i < N; i++) {
        const t0 = performance.now()
        fn1()
        const t1 = performance.now()
        fn2()
        const t2 = performance.now()
        sum1 += t1 - t0
        sum2 += t2 - t1
    }

    console.log("Benchmark:", name || (fn1.name + " - " + fn2.name), sum1 / N, "-", sum2 / N);
}

fetch("test.css").then(async res => {
    const txt = await res.text()
    // console.time()
    // console.log(parseCss(txt));
    // console.timeEnd()
    document.body.append(new NewCssEditor(txt).el)

    // setTimeout(() => {
    //     const N = 100

    //     const bench: number[] = []
    //     let sum = 0
    //     for (let i = 0; i < N; i++) {
    //         const t0 = performance.now()
    //         tokenizeCss(txt)
    //         const t1 = performance.now()
    //         bench.push(t1 - t0);
    //         sum += t1 - t0
    //     }

    //     console.log("Tokenizer Benchmark:", sum / N);

    // }, 10);

    // benchmark(100, parse.bind(undefined, txt))


    // const ed = new CssEditor()
    // ed.addBuffer("test.css", txt)
    // document.body.append(ed.el)
})

// interface CssBufferRange {
//     buffer: CssBuffer
//     start: number
//     end: number
// }

interface CssRuleReference {
    buffer: CssBuffer
    idxPath: number[]
    selectorPath: string[]
}

class CssBuffer {
    src: string
    styleElement: HTMLStyleElement

    tokens: CssToken[] = []
    ast: CssNode[] = []

    constructor(src: string, element?: HTMLStyleElement) {
        this.src = src
        if (element) {
            this.styleElement = element
        } else {
            this.styleElement = document.createElement("style")
            document.head.append(this.styleElement)
        }

        this.update()
    }

    update() {
        this.tokens = tokenizeCss(this.src)
        this.ast = parseCss(this.src, this.tokens)
        this.styleElement.innerHTML = this.src
    }

    replace(start: number, end: number, replacement: string) {
        this.src = this.src.slice(0, start)
            + replacement
            + this.src.slice(end)
        this.update()
    }


    findMatchingRules(element: HTMLElement, nodes = this.ast, parentSelector?: string) {
        const result: CssRuleReference[] = []

        let i = 0;
        for (const node of nodes) {
            if (node.type != "rule") continue
            if (!node.block) continue
            // if (this.src[node.prelude[0].loc.start] == "@") continue // TODO support @media
            if (node.prelude.length == 0) continue

            const selector = this.src.slice(node.prelude[0].loc.start, node.prelude[node.prelude.length - 1].loc.end)
            // if (parentSelector) selector = selector.replaceAll("&", `:is(${parentSelector})`)
            if (element.matches(selector)) {
                result.push({ buffer: this, idxPath: [i], selectorPath: [selector] })
                console.log(selector);

            }

            // TODO: nested style rules
            // result.push(...this.findMatchingRules(element, node.block.children, selector))

            i++ // Dont turn this into for-loop
        }
        return result
    }

    getAllSelectors(nodes: CssNode[] = this.ast) {
        let results: string[][] = []
        for (const node of nodes) {
            if (node.type != "rule") continue
            if (node.prelude.length == 0) continue

            const selector = this.src.slice(node.prelude[0].loc.start, node.prelude[node.prelude.length - 1].loc.end)
            results.push([selector])

            for (const res of this.getAllSelectors(node.block)) {
                results.push([selector, ...res])
            }
        }
        return results
    }

    getRuleAtPath(selectorPath: string[], nodes?: CssNode[]): CssRule | null {
        if (!nodes) nodes = this.ast


        for (const node of nodes) {
            if (node.type != "rule") continue
            if (node.prelude.length == 0) continue

            const selector = this.src.slice(node.prelude[0].loc.start, node.prelude[node.prelude.length - 1].loc.end)
            if (selector == selectorPath[0]) {
                if (selectorPath.length == 1) {
                    return node
                } else {
                    return this.getRuleAtPath(selectorPath.slice(1), node.block)
                }
            } else {
                continue
            }
        }

        return null
    }

}

function arraysEqual<T>(arr1: T[], arr2: T[]): boolean {
    return arr1.reduce((p, c, i) => p && arr1[i] == arr2[i], true)
}

class CssEditor {
    el: HTMLElement

    buffers: CssBuffer[] = []

    selectedElement: HTMLElement | null = null
    shownRules: {
        buffer: CssBuffer
        selectorPath: string[]
    }[] = []

    constructor() {
        this.el = document.createElement("div")
        this.el.className = "cssEditor"

        this.update()


        window.addEventListener("click", e => {
            if (!(e.target instanceof HTMLElement)) return
            if (this.selectedElement) return

            this.selectedElement = e.target
            this.update()
        })
    }

    addBuffer(src: string, text: string, styleElement?: HTMLStyleElement) {
        this.buffers.push(new CssBuffer(text))
        this.update()
    }

    update() {
        if (!this.selectedElement) {
            // TODO print some msg
            return
        }

        const prevShownRules = this.shownRules
        this.shownRules = []
        for (const buffer of this.buffers) {
            this.shownRules.push(...buffer.findMatchingRules(this.selectedElement))
        }


        console.log(this.shownRules, prevShownRules);

        // if (arraysEqual(this.shownRules.map(r => r.selectorPath.join("")), prevShownRules.map(r => r.selectorPath.join("")))) return

        this.el.replaceChildren()

        for (const shownRule of this.shownRules) {
            const rule = shownRule.buffer.getRuleAtPath(shownRule.selectorPath)
            if (!rule) throw new Error("");
            console.log(shownRule.buffer.src.slice(rule.loc.start, rule.loc.end));
            let txt = shownRule.buffer.src.slice(rule.loc.start, rule.loc.end)
            this.el.append(html("pre", { contenteditable: "plaintext-only" },
                txt
                , el => {
                    el.oninput = e => {
                        this.handleBufferChange(shownRule.buffer, el, shownRule.selectorPath)
                    }
                })
            )
        }



        let nodes: CssNode[] = this.buffers.map(b => b.ast.filter(n => n.type == "rule")).flat()
        // console.log(nodes);


    }

    handleBufferChange(buffer: CssBuffer, el: HTMLElement, ruleSelectorPath: string[]) {
        const rule = buffer.getRuleAtPath(ruleSelectorPath)
        if (!rule) {
            this.update()
            return
        }

        // const selectorsBefore = JSON.stringify(buffer.getAllSelectors())
        buffer.replace(rule.loc.start, rule.loc.end, el.innerText)
        // const selectorsAfter = JSON.stringify(buffer.getAllSelectors())

        // this.update()

        const newRule = buffer.getRuleAtPath(ruleSelectorPath)
        if (!newRule) {
            this.update()
            return
        }
        const newText = buffer.src.slice(newRule.loc.start, newRule.loc.end)
        console.log("old", el.innerText);
        console.log("new", newText);

        if (newText != el.innerText) {
            // el.innerText = newText
            this.update()
        }

    }

    htmlFromNode(node: CssNode, src: string): HTMLElement | string {
        switch (node.type) {
            case "token":
                return src.slice(node.loc.start, node.loc.end)
            case "rule": {
                const nameEl = span({ class: "selector" }, cssNodeListToString(node.prelude, src))
                const el = span({ class: "rule" }, nameEl)
                if (node.block)
                    el.append(this.htmlFromNode(node.block, src))
                else
                    el.append(";")
                return el
            }
            case "block": {
                const el = span({ class: "body" },
                    "{",
                    ...this.htmlFromNodes(node.children, src),
                    "}"
                )
                return el
            }
            case "declaration":
                return span({},
                    span({ class: "property" }, ...this.htmlFromNodes(node.property, src)),
                    ":",
                    span({ class: "value" }, cssNodeListToString(node.value, src)),
                    ";"
                )
            case "comment":
                return span({}, src.slice(node.loc.start, node.loc.end))
            default:
                let _notAllCasesHandeled: never = node
                return span({}, JSON.stringify(_notAllCasesHandeled))
        }
    }

    htmlFromNodes(nodes: CssNode[], src: string) {
        return nodes.map(node => this.htmlFromNode(node, src))
    }
}

class NewCssEditor {
    src: string
    styleElement: HTMLStyleElement

    el: HTMLElement

    selectorHighlights: HTMLElement

    buffer: HTMLElement
    cursor: HTMLElement

    cursorOffset = 0

    controlKey = false
    shiftKey = false

    constructor(text: string) {
        this.src = text
        this.styleElement = document.head.appendChild(document.createElement("style"))
        this.styleElement.innerHTML = this.src

        this.cursor = div({ style: { width: "2px", height: "1em", backgroundColor: "red", position: "absolute", left: "10ch", top: "3lh" } })

        this.selectorHighlights = div()

        this.buffer = html("pre", {}, el => el.oninput = e => {
            this.src = el.innerText
            this.update()
        })
        this.el = div({ class: "cssEditor flex" },
            html("pre", {
                contenteditable: "plaintext-only",
                style: { width: "50vw" }
            }, this.src, el => el.oninput = e => {
                this.src = el.innerText
                this.update()
            }),
            this.buffer,
            this.selectorHighlights,
        )


        console.time("Parse")
        const sheet = parse(this.src)
        console.timeEnd("Parse")

        console.log(sheet);
        /* this.buffer.oninput = e => {
            this.update()
            let selection = window.getSelection()
            if (selection) {
                console.log(this.cursorOffset);
                for (let i = 0; i < this.cursorOffset; i++) {
                }
            }
            e
        } */
        document.addEventListener("selectionchange", e => {
            console.group("select")
            let selection = window.getSelection()
            console.log(e, selection?.getRangeAt(0));

            if (selection) {

                let r = selection.getRangeAt(0).cloneRange()
                r.setStart(this.buffer, 0)
                console.log(r, r.toString().length, r.toString());
                this.cursorOffset = r.toString().length
                console.log(this.cursorOffset)
                console.log(this.src.slice(this.cursorOffset, this.cursorOffset + 10));

                // selection.setPosition(this.el, this.cursorOffset)

                // console.log(getOffsetFromElement(this.el, selection.baseNode, selection.baseOffset),
                //     getOffsetFromElement(this.el, selection.extentNode, selection.extentOffset));
            }
            console.groupEnd()
        })


        window.addEventListener("keydown", e => {
            switch (e.key) {
                case "Control":
                    this.controlKey = true
                    this.buffer.classList.add("control")
                    break
                case "Shift":
                    this.shiftKey = true
                    break
            }
        })
        window.addEventListener("keyup", e => {
            switch (e.key) {
                case "Control":
                    this.controlKey = false
                    this.buffer.classList.remove("control")
                    break
                case "Shift":
                    this.shiftKey = false
                    break
            }
        })

        console.time("Gen HTML")
        // this.buffer.replaceChildren(...this.htmlFromNodes(sheet))
        new Patcher(this.buffer).patch(el => {
            el.attr("contenteditable", "plaintext-only")
            this.highlight(sheet, el)
        })
        console.timeEnd("Gen HTML")
    }

    updateTimeout: number | null = null
    update() {
        console.group("update")
        // this.src = this.el.textContent

        if (this.updateTimeout) clearTimeout(this.updateTimeout)
        this.updateTimeout = setTimeout(() => {
            console.time("Parse")
            const sheet = parse(this.src)
            console.log(sheet);
            debugger

            console.timeEnd("Parse")

            function getOffsetFromParent(node: Node, parent: Node, offest: number) {
                let count = offest - (node.textContent?.length || 0)
                let sib: Node | null = node
                while (sib && sib != parent) {
                    if (sib instanceof Element && sib.tagName == "BR") {
                        count++
                    } else if (sib instanceof HTMLElement) {
                        count += sib.innerText?.length || 0
                    } else {
                        count += sib.textContent?.length || 0
                    }

                    while (sib && !sib.previousSibling) {
                        sib = sib.parentNode
                        if (sib == parent)
                            return count
                    }
                    if (sib?.previousSibling) {
                        sib = sib.previousSibling
                    }
                }
                return count
            }

            // console.warn(window.getSelection()?.anchorNode,window.getSelection()?.anchorOffset);
            // return

            const selectOffset = getOffsetFromParent(window.getSelection()?.anchorNode, this.buffer, window.getSelection()?.anchorOffset)
            // console.warn(selectOffset);


            // document.styleSheets[1].ownerNode.innerHTML = this.src
            console.time("Gen HTML")
            new Patcher(this.buffer).patch(el => {
                el.attr("contenteditable", "plaintext-only")
                this.highlight(sheet, el)
            })


            function getNodeAtOffset(node: Node, targetLength: number): { node: Node, offset: number } | number {
                if (node.nodeType == node.TEXT_NODE) {
                    const len = node.textContent?.length || 0
                    if (len > targetLength) return { node, offset: targetLength }
                    return len
                }
                if (node instanceof Element && node.tagName == "BR") {
                    return 1
                }
                let count = 0
                for (const child of node.childNodes) {
                    const len = getNodeAtOffset(child, targetLength - count)
                    if (typeof len === "object") {
                        return len
                    }
                    count += len
                }
                return count
            }
            const res = getNodeAtOffset(this.buffer, selectOffset)
            if (typeof res == "object") {
                window.getSelection()?.setPosition(res.node, res.offset)
            }


            // this.buffer.replaceChildren(...this.htmlFromNodes(sheet))
            console.timeEnd("Gen HTML")
        }, 5);
        console.groupEnd()
    }

    insertText(start: number, end: number, replacement: string) {
        this.src = this.src.slice(0, start) + replacement + this.src.slice(end)
    }

    htmlFromNode(node: CssNode): HTMLElement | string {
        switch (node.type) {
            case CssNodeType.token:
                if (node.kind == TokenKind.COMMENT) {
                    return span({ class: "comment" }, this.src.slice(node.start, node.end))
                } else if (node.kind == TokenKind.STR) {
                    return span({ class: "string" }, this.src.slice(node.start, node.end))
                } else if (node.kind == TokenKind.NUM) {
                    return span(
                        { class: "num" },
                        this.src.slice(node.start, node.end),
                        el => {
                            let initialVal = Number(el.textContent)
                            let fac = 1
                            addDragEventListeners(el, (e, cancel) => {
                                if (!this.controlKey) {
                                    cancel()
                                    return
                                }
                                initialVal = Number(el.textContent)
                                if (initialVal > 0 && initialVal < 1) {
                                    fac = 0.25
                                } else {
                                    fac = Math.pow(10, 0.5 * Math.ceil(Math.log10(Math.abs(initialVal))))
                                }
                            }, (e, d) => {
                                // const delta = d.dxTotal * (this.shiftKey ? 0.5 : 1)
                                const delta = 0.05 * d.dxTotal * (this.shiftKey ? 1 : fac)
                                // Math.pow(10, Math.ceil(Math.log10(initialVal)))
                                const prevStr = el.textContent
                                el.textContent = (initialVal + delta).toFixed(Number.isInteger(initialVal) ? 0 : 2)
                                this.src = this.src.slice(0, node.start) + el.textContent + this.src.slice(node.start + prevStr.length)
                                this.styleElement.innerHTML = this.src
                            }, e => this.update())
                        }
                    )
                } else {
                    return this.src.slice(node.start, node.end)
                }
            case CssNodeType.rule: {
                const nameEl = span({ class: "selector", contenteditable: "plaintext-only" }, ...this.htmlFromNodes(node.prelude, true),
                    el => {
                        el.onmouseover = e => {
                            this.selectorHighlights.replaceChildren(
                                ...[...document.querySelectorAll(el.textContent)].map(x => createSelectorVisualizer(x))
                            )
                        }
                        el.onbeforeinput = e => {
                            if (e.inputType == "insertText" && (e.data == "{" || e.data == "}")) {
                                e.preventDefault()
                            }
                        }
                        el.onblur = e => {
                            let start = node.start
                            let end = node.start
                            if (node.prelude.length > 0) {
                                start = node.prelude[0].start
                                end = node.prelude[node.prelude.length - 1].end
                            }

                            this.src = this.src.slice(0, start) + el.textContent + this.src.slice(end)
                            this.update()
                        }
                    },
                    el => el.onmouseout = e => this.selectorHighlights.replaceChildren()
                )
                const el = div({ class: "rule", contenteditable: "false" }, nameEl)
                if (node.block)
                    el.append(div({ class: "body", contenteditable: "" }, ...this.htmlFromNodes(node.block)))
                else
                    el.append(";")
                return el
            }
            case CssNodeType.decl:
                return div({},
                    span({ class: "property", contenteditable: "plaintext-only" }, cssNodeToString(node.property, this.src)),
                    ": ",
                    span({ class: "value", contenteditable: "plaintext-only" }, ...this.htmlFromNodes(node.value, true),
                        el => {
                            el.onbeforeinput = e => {
                                if (e.inputType == "insertText" && (e.data == "{" || e.data == "}")) {
                                    // e.preventDefault()
                                }
                                if (e.inputType == "insertLineBreak") {
                                    e.preventDefault()
                                    // highlightElement(el.parentElement.parentElement);
                                    el.parentElement?.insertAdjacentElement("afterend", button())
                                    this.insertText(node.end, node.end, "\n    test: nothing;")
                                    this.update()
                                }
                            }
                            let prev = el.textContent
                            el.oninput = e => {

                                this.src = this.src.slice(0, node.value[0].start) + el.textContent + this.src.slice(node.value[0].start + prev.length)
                                this.styleElement.innerHTML = this.src
                                prev = el.textContent

                            }
                            el.onblur = e => this.update()
                        }),
                    // ";"
                )
            default:
                let _notAllCasesHandeled: never = node
                return span({}, JSON.stringify(_notAllCasesHandeled))
        }
    }

    htmlFromNodes(nodes: CssNode[], includeInbetween = false) {
        const arr: (HTMLElement | string)[] = []
        for (let i = 0; i < nodes.length; i++) {
            if (includeInbetween && i > 0) {
                arr.push(this.src.slice(nodes[i - 1].end, nodes[i].start))
            }
            arr.push(this.htmlFromNode(nodes[i]))
        }
        return arr
    }

    highlight(nodes: CssNode[], root: Patcher, lastPos = 0) {
        // root.text(this.src.slice(nodes[0].prelude[0].start, nodes[0].prelude[nodes[0].prelude.length - 1].end));
        // root.tag('span').patch(span => {
        //     span.attr('class', 'name');
        //     span.text('world');
        // });

        // debugger
        // let nextChild = parentEl.firstChild
        for (const node of nodes) {
            if (lastPos != node.start) {
                const prefix = this.src.slice(lastPos, node.start)
                root.text(prefix)
                // if (nextChild && nextChild.nodeType == Node.TEXT_NODE) {
                //     if (nextChild.textContent != prefix) {
                //         nextChild.textContent = prefix
                //     }
                //     nextChild = nextChild.nextSibling
                // } else {
                //     const el = document.createTextNode(prefix)
                //     if (nextChild) {
                //         try {
                //             parentEl.insertBefore(nextChild, el)
                //         } catch (error) {
                //             console.error(error, parentEl, nextChild, el);
                //             console.log(nextChild);
                //         }
                //     } else {
                //         parentEl.append(el)
                //     }
                // }
            }
            // el.attr('data-nodeType', Object.keys(CssNodeType)[node.type]);
            // el.attr('title', Object.keys(CssNodeType)[node.type] + " " + JSON.stringify(node, null, 2));

            switch (node.type) {
                case CssNodeType.rule:
                    const prelude = node.prelude.length > 0 ? this.src.slice(node.prelude[0].start, node.prelude[node.prelude.length - 1].end) : undefined
                    root.tag('span').patch(el => {
                        el.attr('class', 'name');
                        // el.attr("contenteditable", "plaintext-only")

                        if (prelude) {
                            el.tag('span').patch(selector => {
                                selector.attr('class', 'selector');
                                selector.text(prelude);
                                (selector.node as HTMLElement).onmouseover = e => {
                                    this.selectorHighlights.replaceChildren(
                                        ...[...document.querySelectorAll(selector.node.textContent)].map(x => createSelectorVisualizer(x))
                                    )
                                }
                                (selector.node as HTMLElement).onmouseout = e => this.selectorHighlights.replaceChildren()
                            });
                        }

                        if (node.block.length > 0) {
                            el.text(this.src.slice(node.prelude[node.prelude.length - 1].end, node.block[0].start));

                            el.tag('span').patch(block => {
                                this.highlight(node.block, block, node.block[0].start)
                            })

                            el.text(this.src.slice(node.block[node.block.length - 1].end, node.end));
                        } else {
                            if (prelude) {
                                el.text(this.src.slice(node.prelude[node.prelude.length - 1].end, node.end));
                            } else {
                                el.text(this.src.slice(node.start, node.end));
                            }
                        }
                    });
                    break;
                case CssNodeType.decl:
                    root.tag('span').patch(el => {
                        // el.attr('class', 'decl');
                        el.tag('span').patch(property => {
                            property.attr('class', 'property');
                            property.text(this.src.slice(node.property.start, node.property.end));
                        });
                        if (node.value.length > 0) {
                            el.text(this.src.slice(node.property.end, node.value[0].start));

                            el.text(this.src.slice(node.value[0].start, node.value[node.value.length - 1].end));
                            // el.tag('span').patch(block => {
                            //     el.attr("class", "value")
                            //     this.highlight(node.value, block, node.value[0].start)
                            // })

                            el.text(this.src.slice(node.value[node.value.length - 1].end, node.end));
                        } else {
                            el.text(this.src.slice(node.property.end, node.end));
                        }

                    });
                    break;
                case CssNodeType.token:
                    root.tag('span').patch(el => {
                        if (node.kind == TokenKind.STR) {
                            el.attr('class', 'string');
                        } else if (node.kind == TokenKind.COMMENT) {
                            el.attr('class', 'comment');
                        } else {
                        }
                        el.text(this.src.slice(node.start, node.end));
                    });
                    break;
                default:
                    let _notAllCasesHandeled: never = node

                    // el.attr('style', 'color: red');
                    // el.attr('data-nodeType', Object.keys(CssNodeType)[node.type]);

                    // el.text(this.src.slice(node.start, node.end));

                    break;
                //return span({}, JSON.stringify(_notAllCasesHandeled))
            }

            // nextChild = nextChild?.nextSibling || null
            lastPos = node.end
        }
    }


}


function getOffsetFromElement(parentNode: HTMLElement, startNode: Node, nodeOffset: number) {
    if (!parentNode.contains(startNode)) return null;
    let node: Node = startNode;
    let length = nodeOffset;
    while (true) {
        let prev = node.previousSibling;
        if (prev !== null) {
            node = prev;
            length += node.textContent?.length || 0;
        } else {
            if (!parentNode.contains(startNode)) break;
            if (!node.parentElement || !node.parentElement.previousSibling) break;
            node = node.parentElement.previousSibling;
            length += node.textContent?.length || 0;
        }
    }
    return length;
}

// document.body.append(new CssEditor(document.styleSheets[1]).el)

function createCssEditor() {
    const el = div({
        class: "bg0 cssEditor", style: {
            position: "fixed",
            padding: "8px",
            inset: "8px",
            left: "50%",
            overflow: "auto",
            whiteSpace: "pre"
        },
        // contenteditable: "true"
    })

    const cssText = document.styleSheets[1].ownerNode instanceof Element ? document.styleSheets[1].ownerNode.innerHTML : null
    if (!cssText) throw new Error("");

    const editor = div()
    el.append(editor)
    el.oninput = e => {
        document.styleSheets[1].ownerNode.innerHTML = editor.textContent
    }

    editor.replaceChildren(htmlFromCssTree(cssText, parseCss(cssText)))

    let selectedRuleSelector = ""
    let selectedRule: HTMLElement | null = null
    let selectedElement: HTMLElement | null = null

    let visualizers: HTMLElement = document.createElement("div")
    el.append(visualizers)

    el.onclick = e => {
        if (selectedElement) return
        const target = e.target as HTMLElement

        const rule = target.closest("[data-selector]") as HTMLElement | null
        if (rule) {
            selectRule(rule.dataset["selector"] ?? "", rule)
            // rule.classList.add("selected")
        }
    }
    window.addEventListener("click", e => {
        let match = (e.target as HTMLElement).closest(selectedRuleSelector)

        if (match) {
            visualizers.replaceChildren(createVisualEditor(match, selectedRule))
        }
    })

    function selectRule(selector: string, body: HTMLElement) {
        selectedRule = body
        selectedRuleSelector = selector
        visualizers.replaceChildren(...
            [...document.querySelectorAll(selector)]
                .map(el => createSelectorVisualizer(el)))
    }

    return el
}

function createSelectorVisualizer(attached: HTMLElement) {
    return div(
        {
            popover: "manual",
            style: {
                backgroundColor: "rgba(219, 219, 219, 0.1)",
                border: "2px dashed #ffffff",
                positionArea: "center",
                margin: "0",
                inset: "auto",
                width: "100%",
                height: "100%",
                pointerEvents: "none"
            }
        },
        el => requestAnimationFrame(() => el.showPopover({ source: attached }))
    )
}

function createVisualEditor(attached: HTMLElement, rule: HTMLElement) {
    return div(
        {
            popover: "manual",
            style: {
                backgroundColor: "rgba(219, 219, 219, 0.1)",
                border: "2px dashed #ffffff",
                positionArea: "center",
                margin: "0",
                inset: "auto",
                width: "100%",
                height: "100%",
                pointerEvents: "none"
            }
        },
        el => requestAnimationFrame(() => el.showPopover({ source: attached })),


    )
}

function addDragEventListeners(
    el: HTMLElement,
    start: ((event: MouseEvent, cancel: () => void) => any) | null,
    move: ((event: MouseEvent, detail: { dxTotal: number, dyTotal: number, dx: number, dy: number }, cancel: () => void) => any) | null,
    end?: ((event: MouseEvent, detail: { dxTotal: number, dyTotal: number, dx: number, dy: number }) => any) | null
) {
    let dragging = false
    let startClientX = 0
    let startClientY = 0
    let lastClientX = 0
    let lastClientY = 0


    function onPtrUp(e: PointerEvent) {
        if (!dragging) return
        dragging = false
        end?.(e, {
            dxTotal: e.clientX - startClientX,
            dyTotal: e.clientY - startClientY,
            dx: e.clientX - lastClientX,
            dy: e.clientY - lastClientY,
        })
    }

    el.addEventListener("pointerdown", e => {
        dragging = true
        startClientX = e.clientX
        startClientY = e.clientY
        lastClientX = e.clientX
        lastClientY = e.clientY
        start?.(e, () => {
            dragging = false
            window.removeEventListener("pointerup", onPtrUp)
        })

        window.addEventListener("pointerup", onPtrUp, { once: true })
    })
    window.addEventListener("pointermove", e => {
        if (!dragging) return
        move?.(e, {
            dxTotal: e.clientX - startClientX,
            dyTotal: e.clientY - startClientY,
            dx: e.clientX - lastClientX,
            dy: e.clientY - lastClientY,
        }, () => dragging = false)
        lastClientX = e.clientX
        lastClientY = e.clientY
    })
}

function findMatchingCssRules(element: HTMLElement, parentRule?: CSSRule, parentSelector?: string) {
    const result: CSSRule[] = []



    if (!parentRule) {
        for (const sheet of document.styleSheets) {
            for (const rule of sheet.cssRules) {
                result.push(...findMatchingCssRules(element, rule))
            }
        }
    } else {
        let selector = parentSelector
        if (parentRule instanceof CSSStyleRule) {
            selector = parentRule.selectorText
            if (parentSelector) selector = selector.replaceAll("&", `:is(${parentSelector})`)
            if (parentSelector) console.log(parentRule, parentSelector, selector);

            if (element.matches(selector)) {
                result.push(parentRule)
            }

            for (const rule of parentRule.cssRules) {
                result.push(...findMatchingCssRules(element, rule, selector))
            }
        }
        if (parentRule instanceof CSSGroupingRule) {
            // console.log(parentRule, selector);

        }
    }

    return result
}

let selectedRule: CSSStyleRule | null = null
let selectedElement: HTMLElement | null = null

const ctxMenu = div({ class: "ctxMenu editorGui", popover: "manual" })
document.body.append(ctxMenu)

let activeResolve: Function | null = null
function simpleContextMenu<T>(anchor: HTMLElement, options: Record<string, T>): Promise<T | null> {
    activeResolve?.(null)
    return new Promise(resolve => {
        activeResolve = resolve
        ctxMenu.replaceChildren(...Object.entries(options).map(([k, v]) => div({}, k,
            el => el.onclick = () => { ctxMenu.hidePopover(); resolve(v); }
        )))
        ctxMenu.hidePopover()
        ctxMenu.showPopover({ source: anchor })
    })
}

window.addEventListener("click", async e => {
    if (!(e.target instanceof HTMLElement)) return
    if (e.target.matches(".editorGui, .editorGui *")) return
    return

    selectedElement = e.target

    let options: Record<string, CSSStyleRule> = {}
    for (const sheet of document.styleSheets) {
        for (const rule of sheet.cssRules) {
            if (rule instanceof CSSStyleRule) {
                if (selectedElement.matches(rule.selectorText)) {
                    options[rule.selectorText] = rule
                }
            }
        }
        console.groupEnd()
    }

    console.log(findMatchingCssRules(selectedElement));


    selectedRule = await simpleContextMenu(selectedElement, options)
    if (selectedRule) {
        console.log(selectedRule);

        document.body.append(createSelectorVisualizer(selectedElement))
    }

})

function highlightElement(el: HTMLElement) {
    el.animate([
        { background: "red", outline: "2px solid red", outlineOffset: "4px" }
    ], { duration: 800, direction: "reverse" })

}