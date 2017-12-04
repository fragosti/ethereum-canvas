export const deltas = (startPoint, endPoint) => {
  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;
  return { dx, dy }
}

export const isBetween = (point, startPoint, endPoint) => {
  const isBetweenX = point.x >= Math.min(startPoint.x, endPoint.x) && point.x <= Math.max(startPoint.x, endPoint.x);
  const isBetweenY = point.y >= Math.min(startPoint.y, endPoint.y) && point.y <= Math.max(startPoint.y, endPoint.y);
  return isBetweenX && isBetweenY;
};

export const distanceBetween = (startPoint, endPoint) => {
  const { dx, dy } = deltas(startPoint, endPoint);
  return Math.sqrt(dx**2 + dy**2);
};

export const centerPoint = (startPoint, endPoint) => {
  const dxToCenter = Math.abs(endPoint.x - startPoint.x) / 2;
  const dyToCenter = Math.abs(endPoint.y - startPoint.y) / 2;
  return {
    x: Math.min(endPoint.x, startPoint.x) + dxToCenter,
    y: Math.min(endPoint.y, startPoint.y) + dyToCenter,
  }
};

export const doesIntersectEllipse = (item, x, y) => {
  const radius = distanceBetween(item.start, item.end) / 2;
  const center = centerPoint(item.start, item.end);
  return distanceBetween({x, y}, center) <= radius;
};

export const doesIntersectRectangle = (item, x, y) => {
  return isBetween({ x, y }, item.start, item.end);
};

export const doesIntersectLine = (item, x, y) => {
  const deltas1 = deltas(item.start, item.end);
  const deltas2 = deltas({ x, y }, item.end);
  const slope1 = deltas1.dy / deltas1.dx;
  const slope2 = deltas2.dy / deltas2.dx;
  return isBetween({ x, y }, item.start, item.end) && slope1 === slope2;
};

export const TOOL_ERASER = 'eraser';

let mouseIsDown = false;

export default (context, items, setItems) => {

  const removeLastItemAddedAt = (x, y) => {
    let foundOne = false;
    const newItems = items.slice().reverse().filter((item) => {
      if (!foundOne && (
          doesIntersectEllipse(item, x, y) ||
          doesIntersectLine(item, x, y) ||
          doesIntersectRectangle(item, x, y)
          )
        ) {
        foundOne = true;
        return false; 
      }
      return true;
    }).reverse();
    return setItems(newItems);
  }

  const onMouseDown = (x, y, color, size) => {
    mouseIsDown = true;
    removeLastItemAddedAt(x, y);
  };

  const onMouseMove = (x, y) => {
    mouseIsDown && removeLastItemAddedAt(x, y);
  };

  const onDebouncedMouseMove = () => {};

  const onMouseUp = (x, y) => {
    mouseIsDown = false;
  };

  const draw = (item, animate) => {};

  return {
    onMouseDown,
    onMouseMove,
    onDebouncedMouseMove,
    onMouseUp,
    draw,
  };
};