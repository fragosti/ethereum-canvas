pragma solidity ^0.4.11;

contract EthereumCanvas {
  struct Pixel {
    address owner;
    uint soldPrice;
    bytes3 color;
  }
  Pixel[1000][1000] public pixels;
  mapping(address => uint) public pendingRefunds;

  event PixelChanged(
    uint x,
    uint y,
    address owner,
    uint soldPrice,
    bytes3 color
  );

  function colorPixel(uint x, uint y, bytes3 color) payable {
    Pixel storage pixel = pixels[x][y];

    // pixel.soldPrice will initialize to 0
    require(msg.value > pixel.soldPrice);
    
    if(pixel.owner != address(0x0)) {
      pendingRefunds[pixel.owner] += pixel.soldPrice;
    }

    pixel.owner = msg.sender;
    pixel.soldPrice = msg.value;
    pixel.color = color;

    PixelChanged(x, y, pixel.owner, pixel.soldPrice, pixel.color);
  }
  
  // based on PullPayment.sol
  function withdrawRefunds() {
      address payee = msg.sender;
      uint payment = pendingRefunds[payee];
      
      require(payment != 0);
      require(this.balance >= payment);
      
      pendingRefunds[payee] = 0;
      require(payee.send(payment));
  }
}
