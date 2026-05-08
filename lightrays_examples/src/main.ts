import '../../style/Lightrays.scss'
import './style.css'
import { parseCss } from "./cssParser"

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
    createCssEditor(),
    div({
        class: "bg0", style: { display: "none", position: "fixed", padding: "8px", inset: "8px", left: "50%", overflow: "auto", whiteSpace: "pre" },
        contenteditable: "true"
    },
        // html("pre", {}, JSON.stringify(parseCss(`

        //     "asdfgf""ne\\"xt"""asdfsfa `), null, 2)),
        br(),
        async el => {
            // el.replaceChildren(htmlFromCssTree(document.styleSheets[0].ownerNode.innerHTML, parseCss(document.styleSheets[0].ownerNode.innerHTML)))
            el.oninput = e => {
                document.getSelection()?.setPosition()
                el.replaceChildren(htmlFromCssTree(el.textContent, parseCss(el.textContent)))

            }

            el.onpointerover = e => {
                const target = e.target as HTMLElement

                const rule = target.closest("[data-selector]")
                if (rule) {
                    console.log((rule as HTMLElement).dataset["selector"]);
                    document.querySelectorAll((rule as HTMLElement).dataset["selector"])
                        .forEach(el => el.style.background = "red")
                }

                // document.querySelectorAll(src.slice(node.selector.start, node.selector.end)).forEach(el => el.style.background = "red")
            }
            el.onpointerout = e => {
                // document.querySelectorAll(src.slice(node.selector.start, node.selector.end)).forEach(el => el.style.background = "")
            }
        }
    ),
)

function createCssEditor() {
    const el = div({
        class: "bg0", style: { position: "fixed", padding: "8px", inset: "8px", left: "50%", overflow: "auto", whiteSpace: "pre" },
        contenteditable: "true"
    })

    const cssText = document.styleSheets[0].ownerNode instanceof Element ? document.styleSheets[0].ownerNode.innerHTML : null
    if (!cssText) throw new Error("");

    const editor = div()
    el.append(editor)
    el.oninput = e => {
        document.styleSheets[0].ownerNode.innerHTML = editor.textContent
    }

    editor.replaceChildren(htmlFromCssTree(cssText, parseCss(cssText)))

    let selectedRule = ""

    let visualizers: HTMLElement = document.createElement("div")
    el.append(visualizers)

    el.onpointerover = e => {
        const target = e.target as HTMLElement

        const rule = target.closest("[data-selector]")
        if (rule) {
            selectedRule = (rule as HTMLElement).dataset["selector"] ?? ""
            visualizers.replaceChildren(...
                [...document.querySelectorAll((rule as HTMLElement).dataset["selector"])]
                    .map(el => createVisualizer(el)))
        }

        // document.querySelectorAll(src.slice(node.selector.start, node.selector.end)).forEach(el => el.style.background = "red")
    }
    el.onpointerout = e => {
        visualizers.replaceChildren()
    }

    return el
}

function createVisualizer(attached: HTMLElement) {
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

function htmlFromCssTree(src: string, node: CssAstNode): HTMLElement {
    switch (node.type) {
        case 'rulelist': {
            let el = span({ style: { color: "white" } });
            let i = node.start
            for (const rule of node.rules) {
                el.append(src.slice(i, rule.start))
                el.append(htmlFromCssTree(src, rule))
                i = rule.end
            }
            el.append(src.slice(i, node.end))
            return el
        }
        case 'comment':
            return span({ style: { color: "gray" } }, src.slice(node.start, node.end))
        case 'rule':
            let el = div({
                style: { color: "white" }, events: {

                }
            });
            el.dataset["nodetype"] = "rule"
            el.dataset["selector"] = src.slice(node.selector.start, node.selector.end)

            el.append(src.slice(node.start, node.selector.start))
            el.append(span({
                style: { color: "yellow" }
            },
                src.slice(node.selector.start, node.selector.end)
            ))
            el.append(src.slice(node.selector.end, node.block.start))
            el.append(htmlFromCssTree(src, node.block))
            el.append(src.slice(node.block.end, node.end))
            return el
        case 'decl': {
            const property = src.slice(node.property.start, node.property.end)
            const value = src.slice(node.value.start, node.value.end)
            const el = span({ style: { color: "white" } });
            el.append(src.slice(node.start, node.property.start))
            el.append(span({ style: { color: "blue" } }, property))
            el.append(src.slice(node.property.end, node.value.start))
            const valEl = span({ style: { color: "green" } }, value)
            el.append(valEl)
            el.append(src.slice(node.value.end, node.end))

            if (/^\s*\d+(\.\d+)?\w*/.test(value))
                el.append(html("input", {
                    type: "range",
                    events: {
                        input: function () {
                            valEl.innerHTML = valEl.innerHTML.replace(/(?<=^\s*)\d+(\.\d+)?(?=\w*)/, this.value)
                        }
                    }
                }))
            return el
        }
        case 'unknown':
            return span({ style: { color: "red" } }, src.slice(node.start, node.end))
        default:
            return span({ style: { color: "magenta" } }, src.slice(node.start, node.end))
    }
}



const layerPicker = div({ class: "flex-col gap4 p4 rad4 bg2 m0", style: { position: "fixed" } },
    button({ class: "subtle px4 py0" }, "test"),
    // button({class:"subtle px4 py0"}, "testrt"),
)

document.body.append(layerPicker)

function addDragEventListeners(
    el: HTMLElement,
    start: ((event: MouseEvent) => any) | null,
    move: ((event: MouseEvent, detail: { dxTotal: number, dyTotal: number, dx: number, dy: number }) => any) | null,
    end?: ((event: MouseEvent, detail: { dxTotal: number, dyTotal: number, dx: number, dy: number }) => any) | null
) {
    let dragging = false
    let startClientX = 0
    let startClientY = 0
    let lastClientX = 0
    let lastClientY = 0

    el.addEventListener("pointerdown", e => {
        dragging = true
        startClientX = e.clientX
        startClientY = e.clientY
        lastClientX = e.clientX
        lastClientY = e.clientY
        start?.(e)

        window.addEventListener("pointerup", e => {
            dragging = false
            end?.(e, {
                dxTotal: e.clientX - startClientX,
                dyTotal: e.clientY - startClientY,
                dx: e.clientX - lastClientX,
                dy: e.clientY - lastClientY,
            })
        }, { once: true })
    })
    window.addEventListener("pointermove", e => {
        if (!dragging) return
        move?.(e, {
            dxTotal: e.clientX - startClientX,
            dyTotal: e.clientY - startClientY,
            dx: e.clientX - lastClientX,
            dy: e.clientY - lastClientY,
        })
        lastClientX = e.clientX
        lastClientY = e.clientY
    })
}