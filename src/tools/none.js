export const TOOL_NONE = 'none';

export default (context) => {
  const onMouseDown = (x, y, color, size) => {};
  const onMouseMove = (x, y) => {};
  const onDebouncedMouseMove = () => {};
  const onMouseUp = (x, y) => {};
  const draw = (item, animate) => {};
  return {
    onMouseDown,
    onMouseMove,
    onDebouncedMouseMove,
    onMouseUp,
    draw,
  };
};