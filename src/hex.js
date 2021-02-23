import Hexagon from "./gobs/hexagon.js";
import FillStyle from "./gobs/fill_style.js";
import { getRandomColor } from "./gobs/random_helpers.js";

function create_hexagon_grid(
  hcanvas,
  x,
  y,
  r,
  //cell_width,
  //cell_height,
  rows,
  cols,
  pointy
) {
  let shape_x = x;
  let shape_y = y;

  let hex = new Hexagon({
    x: shape_x,
    y: shape_y,
    r: r,
    pointy: pointy,
    fillStyle: new FillStyle({
      visible: true,
      color: getRandomColor(),
      alpha: 0.5,
    }),
    showLabel: false,
    label: `$(j),$(i)`,
    user: {},
  });

  console.log(`width:${hex.w}`, `height:${hex.h}`);
  let cell_width = hex.w;
  let cell_height = hex.h;
  let x_offset = 0;
  let y_offset = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (pointy) {
        x_offset = (row % 2) * (cell_width / 2) + col * cell_width;
        y_offset = row * cell_height - row * (r / 2);
      } else {
        x_offset = col * cell_width - col * (r / 2);
        y_offset = (col % 2) * (cell_height / 2) + row * cell_height;
      }

      hex = new Hexagon({
        x: shape_x + x_offset,
        y: shape_y + y_offset,
        r: r,
        pointy: pointy,
        fillStyle: new FillStyle({
          visible: true,
          color: getRandomColor(),
          alpha: 0.5,
        }),
        showLabel: false,
        label: `$(j),$(i)`,
        user: {},
      });
      hcanvas.add(hex);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let hcanvas = document.querySelector("#hcanvas");
  let x = 0;
  let y = 0;
  let radius = 32;
  let pointy = false;
  create_hexagon_grid(hcanvas, x, y, radius, 10, 10, pointy);
  hcanvas.render();
});
