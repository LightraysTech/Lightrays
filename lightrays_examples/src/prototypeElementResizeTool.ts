
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

function cornerControlElement(x: -1 | 0 | 1, y: -1 | 0 | 1) {
    return (el: HTMLElement) => {
        let startWidth = 0
        let startHeight = 0
        let startLeft: CSSStyleValue | undefined
        let startRight: CSSStyleValue | undefined
        let startTop: CSSStyleValue | undefined
        let startBottom: CSSStyleValue | undefined

        addDragEventListeners(el,
            () => {
                startWidth = attached?.clientWidth || 0
                startHeight = attached?.clientHeight || 0

                startLeft = attached?.computedStyleMap().get("left")
                startRight = attached?.computedStyleMap().get("right")
                startTop = attached?.computedStyleMap().get("top")
                startBottom = attached?.computedStyleMap().get("bottom")

            },
            (e, d) => {
                if (attached) {
                    let ox = x * d.dxTotal
                    let oy = y * d.dyTotal
                    if (x != 0 && y != 0 && e.shiftKey) {
                        ox = oy = Math.max(ox, oy)
                    }

                    const fac = e.ctrlKey ? 2 : 1
                    if (x != 0) attached.style.width = startWidth + fac * ox + "px"
                    if (y != 0) attached.style.height = startHeight + fac * oy + "px"

                    if ((e.ctrlKey || x == -1) && startLeft instanceof CSSNumericValue) {
                        attached.style.left = startLeft.sub(CSS.px(ox)).toString()
                    }
                    if ((e.ctrlKey || x == 1) && startRight instanceof CSSNumericValue) {
                        attached.style.right = startRight.add(CSS.px(ox)).toString()
                    }
                    if ((e.ctrlKey || y == -1) && startTop instanceof CSSNumericValue) {
                        attached.style.top = startTop.sub(CSS.px(oy)).toString()
                    }
                    if ((e.ctrlKey || y == 1) && startBottom instanceof CSSNumericValue) {
                        attached.style.bottom = startBottom.sub(CSS.px(oy)).toString()
                    }

                    if (x == 0 && y == 0) {
                        if (attached?.computedStyleMap().get("position")?.value == "static") {
                            attached.style.marginLeft = CSS.px(d.dxTotal).toString()
                            attached.style.marginTop = CSS.px(d.dyTotal).toString()
                        }
                        if (startLeft instanceof CSSNumericValue) {
                            attached.style.left = startLeft.add(CSS.px(d.dxTotal)).toString()
                        }
                        if (startRight instanceof CSSNumericValue) {
                            attached.style.right = startRight.sub(CSS.px(d.dyTotal)).toString()
                        }
                        if (startTop instanceof CSSNumericValue) {
                            attached.style.top = startTop.add(CSS.px(d.dyTotal)).toString()
                        }
                        if (startBottom instanceof CSSNumericValue) {
                            attached.style.bottom = startBottom.sub(CSS.px(d.dyTotal)).toString()
                        }

                    }
                }
            }
        )
    }
}

window.addEventListener("keydown", e => {
    if (e.key != "s") return
    if (!attached) return

    const startWidth = attached?.clientWidth || 0
    const startHeight = attached?.clientHeight || 0

    let x = null
    window.addEventListener("mousemove", e => {
        if (x == null) {
            x = e.clientX
        }
        attached.style.width = startWidth + (e.clientX - x) + "px"
    })
})

let visual = div({
    id: "fdsg",
    popover: "manual",
}, html("style", {}, `
    #fdsg {
        background-color: rgba(219, 219, 219, 0.3);
        border: 2px dashed #ffffff;
        position-area: center;
        margin: 0;
        inset: auto;
        width: 100%;
        height: 100%;
        overflow: visible;

        .sizeControls {
            position: absolute;
            inset: -8px;
            display: grid;
            grid-template-columns: 15px 1fr 15px;
            grid-template-rows: 15px 1fr 15px;
            padding: 0;
            user-select: none;
            touch-action: none;

            div {
                // background-color: rgba(0, 255, 0, 0.5);
            }

            :nth-child(1), :nth-child(9) { cursor: nwse-resize; }
            :nth-child(3), :nth-child(7) { cursor: nesw-resize; }
            :nth-child(2), :nth-child(8) { cursor: ns-resize; }
            :nth-child(4), :nth-child(6) { cursor: ew-resize; }
            :nth-child(5) { cursor: move; }

            :nth-child(1), :nth-child(9), :nth-child(3), :nth-child(7) {
                border-radius: 2px;
                background-color: #00b7d3;
                border: 1px solid black;
            }
        }
    }
    `),
    div({ class: "sizeControls" },
        div({}, cornerControlElement(-1, -1)),
        div({}, cornerControlElement(0, -1)),
        div({}, cornerControlElement(1, -1)),
        div({}, cornerControlElement(-1, 0)),
        div({}, cornerControlElement(0, 0)),
        div({}, cornerControlElement(1, 0)),
        div({}, cornerControlElement(-1, 1)),
        div({}, cornerControlElement(0, 1)),
        div({}, cornerControlElement(1, 1)),
    )
)
document.body.append(visual)

let attached: HTMLElement | null = null
window.addEventListener("pointerdown", async e => {
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
    const els = document.elementsFromPoint(e.clientX, e.clientY)

    if (!e.target || visual.contains(e.target as HTMLElement) || e.target == document.body) return

    attached = e.target as HTMLElement

    visual.hidePopover()
    visual.showPopover({ source: attached })

    window.addEventListener("keydown", e => {
        if (e.key == "Escape") {
            visual.hidePopover()
        }
    }, { once: true })
})