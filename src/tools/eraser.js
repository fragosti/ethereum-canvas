import { doesIntersect as doesIntersectEllipse } from './ellipse';
import { doesIntersect  as doesIntersectRectangle } from './rectangle';
import { doesIntersect as doesIntersectLine } from './line';

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