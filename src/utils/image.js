
export const dec2hex = (dec) => ('00' + parseInt(dec, 10).toString(16)).slice(-2);

export const rgbToHex = (r, g, b) => ['0x', dec2hex(r), dec2hex(g), dec2hex(b)].join('');

export const get = (context, i, j) => {
  const data = context.getImageData(i, j, 1, 1).data;
  return {
    r: data[0],
    g: data[1],
    b: data[2],
    a: data[3] / 255,
  };
};

// context = CanvasRenderingContext2D
export const diff = (context1, context2, width = 100, height = 100) => {
  const diffPoints = [];
  for (let i = 0 ; i < width ; i++) {
    for (let j = 0 ; j < height ; j++) {
      const c1 = get(context1, i, j);
      const c2 = get(context2, i, j);
      if (c1.r !== c2.r || c1.g !== c2.g || c1.b !== c2.b) {
        diffPoints.push(rgbToHex(c2.r, c2.g, c2.b));
      }
    }
  }
  return diffPoints;
};
