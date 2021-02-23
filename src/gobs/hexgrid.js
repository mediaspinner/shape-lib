import Gob from "./gob.js";
import GobList from "./goblist.js";
import Hexagon from "./hexagon.js";
import FillStyle from "./fill_style.js";
import { getRandomColor } from "./random_helpers.js";

function create_hexagon_grid(x, y, cell_width, cell_height, rows, cols) {
  let objects = new GobList();
  let shape_x = x;
  let shape_y = y;

  let x_offset = 0;
  let y_offset = 0;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      if (i % 2 == 0 && i !== 0) {
        x_offset = (-cell_width / 4) * i;
        y_offset = 0;
      } else if (i % 2 !== 0) {
        x_offset = (-cell_width / 4) * i;
        y_offset = cell_height / 2;
      }

      let hex = new Hexagon({
        x: shape_x + x_offset,
        y: shape_y + y_offset,
        r: cell_width / 2,
        pointy: false,
        fillStyle: new FillStyle({
          visible: true,
          color: getRandomColor(),
          alpha: 0.5,
        }),
        showLabel: false,
        label: `$(j),$(i)`,
        user: {},
      });
      objects.add(hex);
      shape_x += cell_width;
    }
    x_offset = 0;
    y_offset = 0;
    shape_x = x;
    shape_y += cell_height;
  }
  return objects;
}

class HexGrid extends Gob {
  constructor({ x, y, w, h, cell_width, cell_height, rows, cols, user }) {
    let fill = true;
    let color = null;
    let showLabel = false;
    let label = "";
    let selected = false;

    super({ x, y, w, h, showLabel, label, selected, user });
    this.rows = rows;
    this.cols = cols;
    this.cell_width = cell_width;
    this.cell_height = cell_height;

    this.children = create_hexagon_grid(
      x,
      y,
      cell_width,
      cell_height,
      rows,
      cols
    );
  }

  draw(ctx) {
    ctx.save();
    this.children.render(ctx);
    super.draw(ctx);
  }

  move(x, y) {
    super.move(x, y);
    for (let i = 0; i < this.children.length(); i++) {
      this.children.children[i].move(x, y);
    }
  }

  is_hit(x, y) {
    // console.log(
    //   `HexGrid is_hit ${x} ${y} => ${this.x} ${this.y} ${this.w} ${this.h}`
    // );
    if (
      x >= this.x &&
      x <= this.x + this.w &&
      y >= this.y &&
      y <= this.y + this.h
    ) {
      return true;
    }
    return false;
  }
}

export default HexGrid;
