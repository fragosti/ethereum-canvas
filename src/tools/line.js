import { v4 } from 'uuid';
import { deltas, isBetween } from '../utils/shapes';

export const TOOL_LINE = 'line';

export const doesIntersect = (item, x, y) => {
  const deltas1 = deltas(item.start, item.end);
  const deltas2 = deltas({ x, y }, item.end);
  const slope1 = deltas1.dy / deltas1.dx;
  const slope2 = deltas2.dy / deltas2.dx;
  return isBetween({ x, y }, item.start, item.end) && slope1 === slope2;
}

export default (context) => {
  let line = null;
  let imageData = null;

  const onMouseDown = (x, y, color, size) => {
    line = {
      id: v4(),
      tool: TOOL_LINE,
      color,
      size,
      start: { x, y },
      end: null
    };
    imageData = context.getImageData(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);
    return [line];
  };

  const drawLine = (item, x, y) => {
    context.save();
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.beginPath();
    context.lineWidth = item.size;
    context.strokeStyle = item.color;
    context.globalCompositeOperation = 'source-over';
    context.moveTo(item.start.x, item.start.y);
    context.lineTo(x, y);
    context.closePath();
    context.stroke();
    context.restore();
  };

  const onMouseMove = (x, y) => {
    if (!line) return;
    context.putImageData(imageData, 0, 0);
    drawLine(line, x, y);
  };

  const onMouseUp = (x, y) => {
    if (!line) return;
    onMouseMove(x, y);
    const item = line;
    imageData = null;
    line = null;
    item.end = { x, y };
    return [item];
  };

  const draw = item => drawLine(item, item.end.x, item.end.y);

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    draw,
  };
};