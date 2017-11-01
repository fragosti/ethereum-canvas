
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
export const diff = (context1, context2, width = 1000, height = 1000) => {
  const diffPoints = [];
  const data1 = context1.getImageData(0, 0, width, height).data;
  const data2 = context2.getImageData(0, 0, width, height).data;
  for (let i = 0 ; i < data1.length ; i += 4) {
    const ri = i;
    const gi = i + 1;
    const bi = i + 2;
    if (
      data1[ri] !== data2[ri] ||
      data1[gi] !== data2[gi] ||
      data1[bi] !== data2[bi]
      ) {
      diffPoints.push(rgbToHex(
        data2[ri],
        data2[gi],
        data2[bi],
      ))
    }
  }
  return diffPoints;
};
