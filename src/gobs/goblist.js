import Gob from "./gob.js";

class GobList {
  constructor() {
    this.children = [];
  }

  length() {
    return this.children.length;
  }

  add(gob) {
    this.children.push(gob);
  }

  move(x, y) {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].move(x, y);
    }
  }

  render(ctx) {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].draw(ctx);
    }
  }

  select_a_shape(x, y) {
    let selected_shape;
    //console.log("select_a_shape");
    selected_shape = null;

    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].is_hit(x, y)) {
        this.children[i].select();
        if (selected_shape === null) {
          selected_shape = this.children[i];
        } else {
          console.log("error two selected objects!");
        }
      } else {
        if (this.children[i].is_selected()) {
          this.children[i].deselect();
        }
      }
      // if (this.children[i].children && this.children[i].children.length > 0) {
      //   //selected_shape = this.children[i].children.select_a_shape(x, y);
      // } else {
      //   //selected_shape = this.children[i].children.select_a_shape(x, y);
      // }
    }

    return selected_shape;
  }
}
export default GobList;
