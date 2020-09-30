const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");
const settings = {
  dimensions: [2048, 2048],
  pixels: 300,
};

const sketch = () => {
  const tpr = random.rangeFloor(0, 6);
  const palette = random.shuffle(random.pick(palettes)).slice(0, 3);
  const grid = () => {
    const points = [];
    const cnt = 50;

    for (let i = 0; i <= cnt; i++) {
      for (let j = 0; j <= cnt; j++) {
        const u = i / cnt;
        const v = j / cnt;

        points.push({
          color: random.pick(palette),
          raduis: Math.abs(0.01 + random.gaussian() * 0.01),
          position: [u, v],
        });
      }
    }
    return points;
  };
  // random.setSeed(20);
  const gd = grid().filter(() => random.value() > 0.5);
  const margin = 100;
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    gd.forEach((data) => {
      const [u, v] = data.position;
      const raduis = data.raduis;
      const color = data.color;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, width - margin, v);

      context.beginPath();
      context.arc(x, y, raduis * width, 0, Math.PI * 2, false);

      context.fillStyle = color;
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
