import { 
  TOOL_LINE, 
  TOOL_RECTANGLE, 
  TOOL_ELLIPSE, 
} from '../tools';

const toolToId = {
  [TOOL_LINE]: 0,
  [TOOL_RECTANGLE]: 1,
  [TOOL_ELLIPSE]: 2,
};

export const itemsToShapes = (stagedItems) => {
  const numOfItems = stagedItems.length;
  return stagedItems.reduce((acc, val, i) => {
    acc.shapeIds[i] = toolToId[val.tool];
    acc.colors[i] = '0x' + val.color.slice(1);
    acc.fills[i] = val.fill;
    acc.sizes[i] = val.size;
    acc.startXs[i] = val.start.x;
    acc.startYs[i] = val.start.y;
    acc.endXs[i] = val.end.x;
    acc.endYs[i] = val.end.y;
    return acc;
  }, {
    shapeIds: Array(numOfItems),
    colors: Array(numOfItems),
    fills: Array(numOfItems),
    sizes: Array(numOfItems),
    startXs: Array(numOfItems),
    startYs: Array(numOfItems),
    endXs: Array(numOfItems),
    endYs: Array(numOfItems),
  });
};