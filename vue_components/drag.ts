export function startDrag(
  ev: MouseEvent,
  type: "mouse" | "touch" | "both",
  onDragEnd = (dx: number, dy: number, e: MouseEvent | TouchEvent) => { },
  onMove: (dx: number, dy: number, vx: number, vy: number, t: number, i: number) => boolean | void = () => false,
) {
  const startX = ev.screenX;
  const startY = ev.screenY;
  const startT = ev.timeStamp;

  let lastdx = ev.screenX;
  let lastdy = ev.screenY;
  let lastt = ev.timeStamp;

  let i = 0;

  function move(dx: number, dy: number, t: number) {
    const vx = (dx - lastdx) / (t - lastt);
    const vy = (dy - lastdy) / (t - lastt);

    lastdx = dx
    lastdy = lastdy
    lastt = t

    if (onMove(dx, dy, vx, vy, t - startT, i)) {
      cancel()
      return
    }
    i += 1
    console.log(i);
    
  }
  function mouseMove(e: MouseEvent) {
    const dx = e.screenX - startX;
    const dy = e.screenY - startY;
    move(dx, dy, e.timeStamp)
  }
  function touchMove(e: TouchEvent) {
    const touch = e.touches.item(0)
    if (!touch || e.touches.length != 1) return

    const dx = touch.screenX - startX;
    const dy = touch.screenY - startY;
    move(dx, dy, e.timeStamp)
  }

  function up(e: MouseEvent | TouchEvent) {
    onDragEnd(lastdx, lastdy, e)

    cancel()
  }

  function cancel() {
    console.log("cancel");

    if (type == "mouse" || type == "both") {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", up);
    }
    if (type == "touch" || type == "both") {
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchend", up);
    }
  }

  if (type == "mouse" || type == "both") {
    window.addEventListener("mousemove", mouseMove)
    window.addEventListener("mouseup", up)
  }
  if (type == "touch" || type == "both") {
    window.addEventListener("touchmove", touchMove)
    window.addEventListener("touchend", up)
  }
}