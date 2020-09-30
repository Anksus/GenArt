const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  const grid = () => {
    const points = [];
    const cnt = 5;

    for (let i = 0; i <= cnt; i++) {
      for (let j = 0; j <= cnt; j++) {
        const u = i / cnt;
        const v = j / cnt;

        points.push([u, v]);
      }
    }
    return points;
  };

  const gd = grid();
  const margin = 100;
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    gd.forEach(([u, v]) => {
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, width - margin, v);

      context.beginPath();
      context.arc(x, y, 50, 0, Math.PI * 2, false);
      context.strokeStyle = "black";
      context.lineWidth = 20;
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);
