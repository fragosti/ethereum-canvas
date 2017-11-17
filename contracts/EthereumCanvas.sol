pragma solidity ^0.4.11;

contract EthereumCanvas {
  // .0001 ETH
  uint constant pixelPrice = 100000000000000; 
  // struct Pixel {
  //   address owner;
  //   bytes3 color;
  // }

  struct Line {
    address owner;
    bytes3 color;
    uint size;
    uint startX;
    uint startY;
    uint endX;
    uint endY;
  }

  struct Rectangle {
    address owner;
    bytes3 fill;
    bytes3 outline;
    uint size;
    uint startX;
    uint startY;
    uint endX;
    uint endY;
  }

  Line[] public lines;

  // Pixel[1000][1000] public pixels;
  mapping(address => uint) public pendingRefunds;

  function sqrt(uint x) pure internal returns (uint y) {
    uint z = (x + 1) / 2;
    y = x;
    while (z < y) {
        y = z;
        z = (x / z + z) / 2;
    }
  }

  function calculateLinePrice(Line line) pure internal returns (uint) {
    uint dx = line.endX - line.startX;
    uint dy = line.endY - line.endX;
    return line.size*sqrt(dx*dx + dy*dy);
  }

  function drawLine(bytes3 color, uint size, uint startX, uint startY, uint endX, uint endY) public payable {
    Line memory line = Line(msg.sender, color, size, startX, startY, endX, endY);
    uint price = calculateLinePrice(line);
    require(msg.value >= price);
    lines.push(line);
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
