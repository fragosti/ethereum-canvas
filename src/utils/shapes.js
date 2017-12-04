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
console.log(toolToId)

const idToTool = revert(toolToId);

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
}

export const doesIntersectRectangle = (item, x, y) => {
  return isBetween({ x, y }, item.start, item.end);
}

export const doesIntersectLine = (item, x, y) => {
  const deltas1 = deltas(item.start, item.end);
  const deltas2 = deltas({ x, y }, item.end);
  const slope1 = deltas1.dy / deltas1.dx;
  const slope2 = deltas2.dy / deltas2.dx;
  return isBetween({ x, y }, item.start, item.end) && slope1 === slope2;
}

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