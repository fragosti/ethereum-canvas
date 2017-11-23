import { v4 } from 'uuid';

import { revert } from './object';
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

const idToTool = revert(toolToId);

export const itemsToShapes = (stagedItems) => {
  const numOfItems = stagedItems.length;
  return stagedItems.reduce((acc, val, i) => {
    acc.shapeIds[i] = toolToId[val.tool];
    acc.colors[i] = '0x' + val.color.slice(1);
    acc.fills[i] = val.fill ? ('0x' + val.fill.slice(1)) : undefined;
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

export const rawShapeToItem = (data) => ({
  id: v4(),
  tool: idToTool[Number(data[1])],
  color: `#${data[2].slice(2)}`,
  fill: `#${data[3].slice(2)}`,
  size: Number(data[4]),
  start: {
    x: Number(data[5]),
    y: Number(data[6]),
  },
  end: {
    x: Number(data[7]),
    y: Number(data[8]),
  },
});