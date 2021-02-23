// aqua: "#00ffff",
// azure: "#f0ffff",
// beige: "#f5f5dc",
// black: "#000000",
// blue: "#0000ff",
// brown: "#a52a2a",
// cyan: "#00ffff",
// darkblue: "#00008b",
// darkcyan: "#008b8b",
// darkgrey: "#a9a9a9",
// darkgreen: "#006400",
// darkkhaki: "#bdb76b",
// darkmagenta: "#8b008b",
// darkolivegreen: "#556b2f",
// darkorange: "#ff8c00",
// darkorchid: "#9932cc",
// darkred: "#8b0000",
// darksalmon: "#e9967a",
// darkviolet: "#9400d3",
// //fuchsia: "#ff00ff",
// gold: "#ffd700",
// green: "#008000",
// indigo: "#4b0082",
// khaki: "#f0e68c",
// lightblue: "#add8e6",
// lightcyan: "#e0ffff",
// lightgreen: "#90ee90",
// lightgrey: "#d3d3d3",
// lightpink: "#ffb6c1",
// lightyellow: "#ffffe0",
// lime: "#00ff00",
// magenta: "#ff00ff",
// maroon: "#800000",
// navy: "#000080",
// olive: "#808000",
// orange: "#ffa500",
// pink: "#ffc0cb",
// purple: "#800080",
// violet: "#800080",
// red: "#ff0000",
// silver: "#c0c0c0",
// white: "#ffffff",
// yellow: "#ffff00",

class Colors {
  constructor() {
    this.names = {
      soap: "#d5d6ea",
      isabelline: "#F6F6EB",
      chinesewhite: "#D7ECD9",
      champagnepink: "#F5D5CB",
      antiflashwhite: "#F6ECF5",
      pinklace: "#F3DDF2",
    };
  }

  random() {
    let result;
    let count = 0;
    for (let prop in this.names)
      if (Math.random() < 1 / ++count) result = this.names[prop];
    return result;
  }
}

class Gob {
  constructor() {}
}

class Line {
  constructor({ x1, y1, x2, y2, stroke, strokeWidth }) {
    if (x1 !== undefined) {
      this.x1 = x1;
    }
    if (y1 !== undefined) {
      this.y1 = y1;
    }
    if (x2 !== undefined) {
      this.x2 = x2;
    }
    if (y2 !== undefined) {
      this.y2 = y2;
    }
    if (stroke !== undefined) {
      this.stroke = stroke;
    }
    if (strokeWidth !== undefined) {
      this.strokeWidth = strokeWidth;
    }
  }
  createElement() {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "line");
    ele.setAttribute("x1", this.x1);
    ele.setAttribute("y1", this.y1);
    ele.setAttribute("x2", this.x2);
    ele.setAttribute("y2", this.y2);
    if (this.stroke) {
      ele.setAttribute("stroke", this.stroke);
      ele.setAttribute("stroke-width", this.strokeWidth);
    }
    ele.addEventListener("click", this.onClick);
    return ele;
  }

  onClick(event) {
    console.log(this, event);
  }
}

class Rect {
  constructor({ x, y, width, height, fill }) {
    if (x !== undefined) {
      this.x = x;
    } else {
      this.x = 0;
    }
    if (y !== undefined) {
      this.y = y;
    } else {
      this.y = 0;
    }
    if (width !== undefined) {
      this.width = width;
    } else {
      this.width = 100;
    }
    if (height !== undefined) {
      this.height = height;
    } else {
      this.height = 100;
    }
    if (fill !== undefined) {
      this.fill = fill;
    }
  }

  createElement() {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    ele.setAttribute("x", this.x);
    ele.setAttribute("y", this.y);
    ele.setAttribute("width", this.width);
    ele.setAttribute("height", this.height);
    if (this.fill) {
      ele.setAttribute("fill", this.fill);
    }
    ele.addEventListener("click", this.onClick);
    return ele;
  }

  onClick(event) {
    console.log(this, event);
  }
}

class Circle {
  constructor({ cx, cy, r, fill, stroke, strokeWidth }) {
    if (cx !== undefined) {
      this.cx = cx;
    } else {
      this.cx = 0;
    }
    if (cy !== undefined) {
      this.cy = cy;
    } else {
      this.cy = 0;
    }
    if (r !== undefined) {
      this.r = r;
    } else {
      this.r = 100;
    }
    if (stroke !== undefined) {
      this.stroke = stroke;
    } else {
      this.stroke = null;
    }
    if (strokeWidth !== undefined) {
      this.strokeWidth = strokeWidth;
    } else {
      this.strokeWidth = null;
    }
    if (fill !== undefined) {
      this.fill = fill;
    }
  }

  createElement() {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    ele.setAttribute("cx", this.cx);
    ele.setAttribute("cy", this.cy);
    ele.setAttribute("r", this.r);
    ele.setAttribute("stroke", this.stroke);
    ele.setAttribute("stroke-width", this.strokeWidth);
    if (this.fill) {
      ele.setAttribute("fill", this.fill);
    }
    ele.addEventListener("click", this.onClick);
    return ele;
  }

  onClick(event) {
    console.log(this, event);
  }
}

class Triangle {
  constructor({ x, y, w, h, fill, stroke, strokeWidth }) {
    if (x !== undefined) {
      this.x = x;
    }
    if (y !== undefined) {
      this.y = y;
    }
    if (w !== undefined) {
      this.w = w;
    }
    if (h !== undefined) {
      this.h = h;
    }
    if (stroke !== undefined) {
      this.stroke = stroke;
    } else {
      this.stroke = null;
    }
    if (strokeWidth !== undefined) {
      this.strokeWidth = strokeWidth;
    } else {
      this.strokeWidth = null;
    }
    if (fill !== undefined) {
      this.fill = fill;
    }
    this.pts = [];
    this.pts.push([this.x + this.w / 2, this.y]);
    this.pts.push([this.x + this.w / 2 + this.w / 2, this.y + this.h]);
    this.pts.push([this.x - this.w / 2 + this.w / 2, this.y + this.h]);

    this.path = "";
    for (let index = 0; index < this.pts.length; index++) {
      if (index === 0) {
        this.path += `M${this.pts[0][0]} ${this.pts[0][1]} `;
      }
      this.path += `L${this.pts[index][0]} ${this.pts[index][1]} `;
    }
    this.path += `Z`;
    //console.log(this.path);
    //this.path = "M150 0 L75 200 L225 200 Z";
  }

  createElement() {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "path");
    ele.setAttribute("d", this.path);
    ele.setAttribute("stroke", this.stroke);
    ele.setAttribute("stroke-width", this.strokeWidth);
    if (this.fill) {
      ele.setAttribute("fill", this.fill);
    }
    ele.addEventListener("click", this.onClick);
    return ele;
  }

  onClick(event) {
    console.log(this, event);
  }
}

class Hexagon {
  constructor({ x, y, r, pointy, fill, stroke, strokeWidth, user }) {
    if (x !== undefined) {
      this.x = x;
    }
    if (y !== undefined) {
      this.y = y;
    }
    if (r !== undefined) {
      this.r = r;
    }
    if (pointy !== undefined) {
      this.pointy = pointy;
    } else {
      this.pointy = false;
    }
    if (stroke !== undefined) {
      this.stroke = stroke;
    } else {
      this.stroke = null;
    }
    if (strokeWidth !== undefined) {
      this.strokeWidth = strokeWidth;
    } else {
      this.strokeWidth = null;
    }
    if (fill !== undefined) {
      if (fill === "random") {
        this.fill = Colors.random();
      } else {
        this.fill = fill;
      }
      //console.log(this.fill);
    }
    if (user !== undefined) {
      this.user = user;
    } else {
      this.user = {};
    }
    this.fillOpacity = 0.0;

    if (pointy) {
      this.h = Math.sin(Math.PI / 2) * r * 2; // 90 degress
      this.w = Math.cos(Math.PI / 6) * r * 2; // 30 degress
    } else {
      this.w = Math.sin(Math.PI / 2) * r * 2; // 90 degress
      this.h = Math.cos(Math.PI / 6) * r * 2; // 30 degress
    }

    this.pts = [];
    this.pointy = pointy;

    this.pts = this.create_pts(
      this.x,
      this.y,
      this.w,
      this.h,
      this.r,
      this.pointy
    );

    this.pointsCS = "";
    for (let index = 0; index < this.pts.length; index++) {
      this.pointsCS += `${this.pts[index][0]},${this.pts[index][1]} `;
    }

    this.path = "";
    for (let index = 0; index < this.pts.length - 1; index++) {
      if (index === 0) {
        this.path += `M${this.pts[0][0]} ${this.pts[0][1]} `;
      }
      this.path += `L${this.pts[index][0]} ${this.pts[index][1]} `;
    }
    this.path += `Z`;

    //console.log("Hexagon path: ", this.path);
    //console.log("Hexagon pts: ", this.pointsCS);
  }

  create_pts(x, y, w, h, r, pointy) {
    const turnHexagon = pointy ? 30 : 0;

    let x_offset = x + w / 2;
    let y_offset = y + h / 2;

    let pts = [0, 1, 2, 3, 4, 5, 6].map((n) => {
      const degrees = 60 * n - turnHexagon;
      const radians = (Math.PI / 180) * degrees;
      return [
        x_offset + r * Math.cos(radians),
        y_offset + r * Math.sin(radians),
      ];
    });

    return pts;
  }

  createElement() {
    let eles = [];

    let ele = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    ele.setAttribute("points", this.pointsCS);
    ele.setAttribute("stroke", this.stroke);
    ele.setAttribute("stroke-width", this.strokeWidth);
    if (this.fill) {
      ele.setAttribute("fill", this.fill);
    }
    ele.addEventListener("click", (event) => {
      this.onClick(event);
    });

    eles.push(ele);

    // let ele2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    // ele2.setAttribute("d", this.path);
    // ele2.setAttribute("fill-opacity", this.fillOpacity);
    // ele2.setAttribute("stroke", "red");
    // ele2.setAttribute("stroke-width", "2");
    // eles.push(ele2);

    return eles;
  }

  onClick(event) {
    console.log(`(${this.user.row},${this.user.col})`, this);
  }
}

class HexGrid {
  constructor({ x, y, r, rows, cols, pointy, fill, stroke, strokeWidth }) {
    if (x !== undefined) {
      this.x = x;
    }
    if (y !== undefined) {
      this.y = y;
    }
    if (r !== undefined) {
      this.r = r;
    }
    if (rows !== undefined) {
      this.rows = rows;
    }
    if (cols !== undefined) {
      this.cols = cols;
    }
    if (pointy !== undefined) {
      this.pointy = pointy;
    } else {
      this.pointy = false;
    }
    if (stroke !== undefined) {
      this.stroke = stroke;
    } else {
      this.stroke = null;
    }
    if (strokeWidth !== undefined) {
      this.strokeWidth = strokeWidth;
    } else {
      this.strokeWidth = null;
    }
    if (fill !== undefined) {
      this.fill = fill;
    }
    this.fillOpacity = 0.0;
    this.children = [];

    let shape_x = x;
    let shape_y = y;

    let x_offset = 0;
    let y_offset = 0;

    let hex = new Hexagon({
      x: 0,
      y: 0,
      r: r,
      pointy: pointy,
      stroke: "#00000",
      strokeWidth: 1,
    });

    console.log(`r:${hex.r}`, `width:${hex.w}`, `height:${hex.h}`);
    let cell_width = hex.w;
    let cell_height = hex.h;

    let colors = new Colors();

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        if (i % 2 == 0 && i !== 0) {
          if (pointy === false) {
            x_offset = (-cell_width / 4) * i;
            y_offset = 0;
          } else {
            x_offset = (-cell_width / 4) * i;
            y_offset = 0;
          }
        } else if (i % 2 !== 0) {
          if (pointy === false) {
            x_offset = (-cell_width / 4) * i;
            y_offset = cell_height / 2;
          } else {
            x_offset = (-cell_width / 2) * i;
            y_offset = cell_height / 2;
          }
        }
        let hex = new Hexagon({
          x: shape_x + x_offset,
          y: shape_y + y_offset,
          r: cell_width / 2,
          pointy: pointy,
          fill: colors.random(),
          stroke: this.stroke,
          strokeWidth: this.strokeWidth,
          user: { row: i, col: j },
        });
        this.children.push(hex);
        shape_x += cell_width;
      }
      x_offset = 0;
      y_offset = 0;
      shape_x = x;
      shape_y += cell_height;
    }
    //console.log(this.children);
  }

  createElement() {
    let eles = [];

    for (let idx = 0; idx < this.children.length; idx++) {
      eles.push(this.children[idx].createElement());
    }
    return eles;
  }

  onClick(event) {
    console.log(this, event);
  }
}

class SVG {
  constructor({ id }) {
    this.id = id;
    this.object = [];
  }

  add(obj) {
    this.object.push(obj);
    let ele = obj.createElement();
    if (Array.isArray(ele)) {
      ele.forEach((element) => {
        if (Array.isArray(element)) {
          element.forEach((element2) => {
            this.svg.appendChild(element2);
          });
        } else {
          this.svg.appendChild(element);
        }
      });
    } else {
      this.svg.appendChild(ele);
    }
  }

  createElement() {
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svg.setAttribute("class", "octicon octicon-star");
    this.svg.setAttribute("viewBox", "0 0 600 600");
    this.svg.setAttribute("version", "1.1");
    this.svg.setAttribute("aria-hidden", "true");
    document.getElementById(this.id).appendChild(this.svg);
  }
}

function addElement() {
  // create a new div element
  const newDiv = document.createElement("div");

  // and give it some content
  const newContent = document.createTextNode("Hi there and greetings!");

  // add the text node to the newly created div
  newDiv.appendChild(newContent);

  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementById("div1");
  document.body.insertBefore(newDiv, currentDiv);
}

function create_svg() {
  const xoffset = 5;
  const yoffset = 5;
  let mySVG = new SVG({ id: "mySVG" });
  mySVG.createElement();

  mySVG.add(
    new Rect({
      x: 0 + xoffset,
      y: 0 + yoffset,
      width: 100 + xoffset,
      height: 100 + yoffset,
      fill: "orange",
    })
  );

  mySVG.add(
    new Circle({
      cx: 150 + xoffset + 20,
      cy: 50 + yoffset + 6,
      r: 50 + xoffset,
      stroke: "black",
      strokeWidth: "4",
      fill: "yellow",
    })
  );

  mySVG.add(
    new Triangle({
      x: 300,
      y: 0,
      w: 300,
      h: 300,
      stroke: "black",
      strokeWidth: "1",
      fill: "#987676",
    })
  );

  mySVG.add(
    new Line({
      x1: 0,
      y1: 5,
      x2: 600,
      y2: 5,
      stroke: "black",
      strokeWidth: "1",
    })
  );

  mySVG.add(
    new Line({
      x1: 300,
      y1: 0,
      x2: 300,
      y2: 600,
      stroke: "black",
      strokeWidth: "1",
    })
  );

  mySVG.add(
    new Line({
      x1: 0,
      y1: 300,
      x2: 600,
      y2: 300,
      stroke: "black",
      strokeWidth: "1",
    })
  );

  mySVG.add(
    new Rect({
      x: 0,
      y: 300,
      width: 300,
      height: 300,
      fill: "orange",
    })
  );

  // mySVG.add(
  //   new Hexagon({
  //     x: 0,
  //     y: 300,
  //     r: 32,
  //     fill: "blue",
  //     stroke: "black",
  //     strokeWidth: "2",
  //   })
  // );

  mySVG.add(
    new HexGrid({
      x: 0,
      y: 300,
      r: 32,
      rows: 10,
      cols: 10,
      pointy: false,
      fill: "random",
      stroke: "black",
      strokeWidth: "1",
    })
  );
}

document.addEventListener("DOMContentLoaded", function () {
  create_svg();
});
