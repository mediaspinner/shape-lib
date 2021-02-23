import Gob from "./gob.js";
import GobList from "./goblist.js";
import Component from "./component.js";

class HyperCanvasComponent extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = `
      <style media="screen">
        :host {
            //   position: fixed;
            //   cursor: pointer;
           display: block;
          //overflow: visible;
          width: 200;
          height: 300;
          border: 1px solid black;
        }
      </style>
      <canvas width="1024" height="1024"></canvas>
    `;
    this.shapes = new GobList();

    this.x = 0;
    this.y = 0;
    this.width = 1024;
    this.height = 1024;
    this.starting_x = null;
    this.starting_y = null;
    this.moving = false;

    this.addEventListener("mousedown", (e) => {
      this.mousedown(e);
    });
    this.addEventListener("mousemove", (e) => {
      this.mousemove(e);
    });
    this.addEventListener("mouseup", (e) => {
      this.mouseup(e);
    });
  }
  
  connectedCallback() {
    this.render();
  }

  add(shape) {
    this.shapes.add(shape);
  }

  render() {
    this.canvas = this.shadow.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.shapes.render(this.ctx);
  }

  mousedown(e) {
    let x = e.offsetX;
    let y = e.offsetY;

    if (this.starting_x === null) {
      this.starting_x = x;
      this.starting_y = y;
    }

    this.selected_shape = this.shapes.select_a_shape(x, y);

    if (this.selected_shape) {
      if (this.selected_shape instanceof Component) {
        //console.log(this.selected_shape, typeof this.selected_shape);
        this.selected_shape.mousedown(e);
      } else {
        if (this.selected_shape) {
          this.moving = true;
        }
      }
    }
    this.render();
  }

  mousemove(e) {
    let x = e.offsetX;
    let y = e.offsetY;
    let x_moved = x - this.starting_x;
    let y_moved = y - this.starting_y;

    this.starting_x = x;
    this.starting_y = y;

    if (this.selected_shape) {
      if (this.selected_shape instanceof Component) {
        //console.log(this.selected_shape, typeof this.selected_shape);
        this.selected_shape.mousemove(e);
      }
    } else if (this.selected_shape && this.moving) {
      this.selected_shape.move(x_moved, y_moved);
      this.render();
    }
    //this.render();
  }

  mouseup(e) {
    let x = e.offsetX;
    let y = e.offsetY;

    if (this.selected_shape) {
      if (this.selected_shape instanceof Component) {
        //console.log(this.selected_shape, typeof this.selected_shape);
        this.selected_shape.mouseup(e);
      }
    }
    this.moving = false;
    this.starting_x = null;
    this.starting_y = null;
  }
}

window.customElements.define("hyper-canvas", HyperCanvasComponent);
