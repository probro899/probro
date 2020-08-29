export default (ctx, x, y) => {
  const { canvas } = ctx;
  const bbox = canvas.getBoundingClientRect();
  return {
    x: x * (canvas.width / bbox.width) - bbox.left * (canvas.width / bbox.width),
    y: y * (canvas.width / bbox.width) - bbox.top * (canvas.height / bbox.height),
  };
};
