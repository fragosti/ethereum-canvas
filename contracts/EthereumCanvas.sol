pragma solidity ^0.4.11;

contract EthereumCanvas {
  // .0001 ETH
  uint constant pixelPrice = 100000000000000;
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

  Shape[] public shapes;

  mapping(address => uint) public pendingRefunds;

  function sqrt(uint x) pure internal returns (uint y) {
    uint z = (x + 1) / 2;
    y = x;
    while (z < y) {
        y = z;
        z = (x / z + z) / 2;
    }
  }

  function getNumberOfShapes() view public returns (uint) {
    return shapes.length;
  }  

  function calculateLinePrice(Shape line) pure internal returns (uint) {
    uint dx = line.endX - line.startX;
    uint dy = line.endY - line.endX;
    return line.size*sqrt(dx*dx + dy*dy)*pixelPrice;
  }

  function calculateRectanglePrice(Shape rec) pure internal returns (uint) {
    uint dx = rec.endX > rec.startX ? rec.endX - rec.startX : rec.startX - rec.endX;
    uint dy = rec.endY > rec.startY ? rec.endY - rec.startY : rec.startY - rec.endY;
    return dx*dy;
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
    }
    require(msg.value >= totalCost);
  }

  // event PixelsChanged(
  //   address owner,
  //   uint[] xs,
  //   uint[] ys,
  //   bytes3[] colors
  // );
 
  // function colorPixels(uint[] xs, uint[] ys, bytes3[] colors) payable {
  //   require(xs.length == ys.length);
  //   require(xs.length == colors.length);
  //   require(msg.value >= xs.length*pixelPrice);
  //   for (uint i = 0 ; i < xs.length ; i++) {
  //     uint x = xs[i];
  //     uint y = ys[i];
  //     bytes3 color = colors[i];

  //     Pixel storage pixel = pixels[x][y];

  //     pixel.owner = msg.sender;
  //     pixel.color = color;

  //     if(pixel.owner != address(0)) {
  //       pendingRefunds[pixel.owner] += pixelPrice;
  //     }
  //   }
  //   PixelsChanged(msg.sender, xs, ys, colors);
  // }
  
  // based on PullPayment.sol
  function withdrawRefunds() public {
    address payee = msg.sender;
    uint payment = pendingRefunds[payee];
    
    require(payment != 0);
    require(this.balance >= payment);
    
    pendingRefunds[payee] = 0;
    require(payee.send(payment));
  }
}
