pragma solidity ^0.4.11;

contract EthereumCanvas {
  // .0000001 ETH
  uint constant pixelPrice = 100000000000;
  uint constant pi = 3;

  struct Shape {
    address owner;
    uint name;
    bytes3 color;
    bytes3 fill;
    uint size;
    uint startX;
    uint startY;
    uint endX;
    uint endY;
  }

  event ShapeDrawn (
    Shape shape
  );

  Shape[] public shapes;

  address contractOwner;

  function EthereumCanvas() payable {
    contractOwner = msg.sender;
  }

  function getNumberOfShapes() view public returns (uint) {
    return shapes.length;
  }  

  function calculateLinePrice(Shape line) pure internal returns (uint) {
    uint dx = line.endX > line.startX ? line.endX - line.startX : line.startX - line.endX;
    uint dy = line.endY > line.startY ? line.endY - line.startY : line.startY - line.endY;
    return line.size*(dx + dy)*pixelPrice;
  }

  function calculateRectanglePrice(Shape rec) pure internal returns (uint) {
    uint dx = rec.endX > rec.startX ? rec.endX - rec.startX : rec.startX - rec.endX;
    uint dy = rec.endY > rec.startY ? rec.endY - rec.startY : rec.startY - rec.endY;
    return dx*dy*pixelPrice;
  }

  function calculateEllipsePrice(Shape el) pure internal returns (uint) {
    return calculateRectanglePrice(el)*pi/4;
  }

  /**
   * ShapeId:
   * 0: Line
   * 1: Rectangle
   * 2: Ellipse
   */
  function drawShapes(uint[] shapeNames, bytes3[] colors, bytes3[] fills, uint[] sizes, uint[] startXs, uint[] startYs, uint[] endXs, uint[] endYs) public payable {
    require(shapeNames.length == colors.length);
    require(shapeNames.length == fills.length);
    require(shapeNames.length == sizes.length);
    require(shapeNames.length == startXs.length);
    require(shapeNames.length == startYs.length);
    require(shapeNames.length == endXs.length);
    require(shapeNames.length == endYs.length);
    uint totalCost = 0;
    for (uint i = 0 ; i < shapeNames.length ; i++) {
      Shape memory shape = Shape(msg.sender, shapeNames[i], colors[i], fills[i], sizes[i], startXs[i], startYs[i], endXs[i], endYs[i]);
      if (shapeNames[i] == 0) { // Line
        totalCost += calculateLinePrice(shape);
      }
      if (shapeNames[i] == 1) { // Rectangle
        totalCost += calculateRectanglePrice(shape);
      }
      if (shapeNames[i] == 2) { // Ellipse
        totalCost += calculateEllipsePrice(shape);
      }
      shapes.push(shape);
      ShapeDrawn(shape);
    }
    require(msg.value >= totalCost);
  }

  function withdraw() public {
    require(msg.sender == contractOwner);
    contractOwner.transfer(this.balance);
  }
}
