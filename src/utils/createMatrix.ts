const createMatrix = (height: number, width: number, fill = 0) =>
  Array(height).fill(Array(width).fill(fill));

export default createMatrix;
