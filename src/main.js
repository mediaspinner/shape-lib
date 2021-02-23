import Oval from "./gobs/oval.js";
import Circle from "./gobs/circle.js";
import Rectangle from "./gobs/rectangle.js";
import Triangle from "./gobs/triangle.js";
import CheckerBoard from "./gobs/checkerboard.js";
import Hexagon from "./gobs/hexagon.js";
import HexGrid from "./gobs/hexgrid.js";
import FillStyle from "./gobs/fill_style.js";
import {
  getRandomColor,
  rand_boolean,
  rand_percent_boolean,
} from "./gobs/random_helpers.js";
import Component from "./gobs/component.js";
import ButtonComponent from "./gobs/button_component.js";

function button_down(button, e) {
  button.fillStyle.color = getRandomColor();
}

function button_move(button, e) {
  //button.fillStyle.color = getRandomColor();
}

function button_up(button, e) {}

function genRandomShape(hcanvas, x, y, w, h, user) {
  let margin = 2;
  let log = true;
  let shape = Math.floor(Math.random() * 8);
  //shape = 7;
  switch (shape) {
    case 0:
      //console.log("Circle ", x, y, user);
      hcanvas.add(
        new Circle({
          cx: x + w / 2 + margin,
          cy: y + h / 2 + margin,
          r: w / 2 - margin,
          fillStyle: new FillStyle({
            visible: rand_percent_boolean(0.9),
            color: getRandomColor(),
            alpha: 0.5,
          }),
          showLabel: false,
          label: new String(user.row + ", " + user.col),
          selected: false,
          user: user,
        })
      );
      break;
    case 1:
      //console.log("Rectangle ", x, y, user);
      hcanvas.add(
        new Rectangle({
          x: x + margin,
          y: y + margin,
          w: w - margin,
          h: h - margin,
          fillStyle: new FillStyle({
            visible: rand_percent_boolean(0.9),
            color: getRandomColor(),
            alpha: 0.5,
          }),
          showLabel: false,
          label: new String(user.row + ", " + user.col),

          user: user,
        })
      );
      break;
    case 2:
      //console.log("Triangle ", x, y, user);
      hcanvas.add(
        new Triangle({
          x: x + margin,
          y: y + margin,
          w: w - margin,
          h: h - margin,
          fillStyle: new FillStyle({
            visible: rand_percent_boolean(0.9),
            color: getRandomColor(),
            alpha: 0.5,
          }),
          showLabel: false,
          label: new String(user.row + ", " + user.col),
          user: user,
        })
      );
      break;
    case 3:
      //console.log("Oval ", x, y, user);
      hcanvas.add(
        new Oval({
          //x: x + margin,
          //y: y + margin,
          cx: x + w / 2 + margin,
          cy: y + h / 2 + margin,
          radiusX: w / 4 - margin,
          radiusY: h / 2 - margin,
          fillStyle: new FillStyle({
            visible: rand_percent_boolean(0.9),
            color: getRandomColor(),
            alpha: 0.5,
          }),
          showLabel: false,
          label: new String(user.row + ", " + user.col),

          user: user,
        })
      );
      break;
    case 4:
      //console.log("CheckerBoard ", x, y, user);
      hcanvas.add(
        new CheckerBoard({
          x: x + margin,
          y: y + margin,
          w: w - margin,
          h: h - margin,
          rows: 4,
          cols: 4,
          fillStyle1: new FillStyle({
            visible: rand_percent_boolean(0.9),
            color: getRandomColor(),
            alpha: 1.0,
          }),
          fillStyle2: new FillStyle({
            visible: rand_percent_boolean(0.9),
            color: getRandomColor(),
            alpha: 0.5,
          }),
          user: user,
        })
      );
      break;
    case 5:
      //console.log("Hexagon ", x, y, user);
      hcanvas.add(
        new Hexagon({
          x: x + margin,
          y: y + margin,
          r: (w - margin) / 2,
          pointy: rand_boolean(),
          fillStyle: new FillStyle({
            visible: rand_percent_boolean(0.9),
            color: getRandomColor(),
            alpha: 0.5,
          }),
          showLabel: false,
          label: new String(user.row + ", " + user.col),
          user: user,
        })
      );
      break;
    case 6:
      let r = w / 2 / 6;
      let hex = new Hexagon({
        x: x,
        y: y,
        r: r,
        pointy: false,
        user: {},
      });
      //console.log(`x:${x},y:${y},r:${r},hex.w:${hex.w}, hex.h:${hex.h}`);
      hcanvas.add(
        new HexGrid({
          x: x + margin,
          y: y + margin,
          w: w,
          h: h,
          cell_width: hex.w,
          cell_height: hex.h,
          rows: 6,
          cols: 7,
          pointy: rand_boolean(),
          user: user,
        })
      );
      break;
    case 7:
      //console.log("ButtonComponent ", x, y, user);
      hcanvas.add(
        new ButtonComponent({
          x: x + margin,
          y: y + margin,
          w: w - margin,
          h: h - margin,
          fillStyle: new FillStyle({
            visible: rand_percent_boolean(0.9),
            color: getRandomColor(),
            alpha: 1.0,
          }),
          showLabel: true,
          label: new String(`Btn (${user.row},${user.col})`),
          user: user,
          down: button_down,
          move: button_move,
          up: button_up,
        })
      );
      break;
    default:
      console.log("Error ", shape, x, y);
      break;
  }
}

function create_sub_grid(depth) {
  if (depth < 2) {
    if (Math.floor(Math.random() * 100) < 10) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function createGrid(hcanvas, x, y, cell_width, cell_height, rows, cols, depth) {
  let offset = 0;
  let shape_x = x;
  let shape_y = y;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      if (create_sub_grid(depth)) {
        //console.log("sub grid ", j, i);
        createGrid(
          hcanvas,
          shape_x,
          shape_y,
          cell_width / 2,
          cell_height / 2,
          2, //rows,
          2, //cols,
          depth + 1
        );
      } else {
        genRandomShape(hcanvas, shape_x, shape_y, cell_width, cell_height, {
          row: j,
          col: i,
        });
      }
      shape_x += cell_width;
    }
    shape_x = x;
    shape_y += cell_height;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let hcanvas = document.querySelector("#hcanvas");
  let x = 0;
  let y = 0;
  let cell_height = 200;
  let cell_width = 200;
  createGrid(hcanvas, x, y, cell_width, cell_height, 5, 5, 0);
  hcanvas.render();
});
