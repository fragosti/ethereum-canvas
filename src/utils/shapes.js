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

const numberOfPixelsInLine = ({start, end, size}) => {
  const dx = Math.abs(end.x - start.x);
  const dy = Math.abs(end.y - start.y);
  return (dx + dy)*size;
};

const numberOfPixelsInRectangle = ({start, end}) => {
  const w = Math.abs(end.x - start.x);
  const h = Math.abs(end.y - start.y);
  return w*h;
};

const numberOfPixelsInEllipse = (item) => {
  return Math.round(numberOfPixelsInRectangle(item)*3/4);
};

export const numberOfPixels = (item) => {
  switch(item.tool) {
    case TOOL_LINE:
      return numberOfPixelsInLine(item);
    case TOOL_RECTANGLE:
      return numberOfPixelsInRectangle(item);
    case TOOL_ELLIPSE:
      return numberOfPixelsInEllipse(item);
    default:
      throw new Error(`Did not pass in valid item: ${item}`);
  }
};

export const totalPixels = (items) => items.reduce((acc, item) => acc + numberOfPixels(item), 0);

export const itemsToShapes = (stagedItems) => {
  const numOfItems = stagedItems.length;
  return stagedItems.reduce((acc, val, i) => {
    acc.shapeIds[i] = toolToId[val.tool];
    acc.colors[i] = '0x' + val.color.slice(1);
    acc.fills[i] = val.fill ? ('0x' + val.fill.slice(1)) : undefined;
    acc.sizes[i] = val.size;
    acc.startXs[i] = Math.round(val.start.x);
    acc.startYs[i] = Math.round(val.start.y);
    acc.endXs[i] = Math.round(val.end.x);
    acc.endYs[i] = Math.round(val.end.y);
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
  owner: data[0],
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