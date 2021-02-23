import Circle from "./circle.js";
import LineStyle from "./line_style.js";
import FillStyle from "./fill_style.js";

describe("Circle", function () {
  beforeEach(function () {
    //do something
  });
  afterAll(function () {
    //do something
  });
  test("it should initialize correctly", function () {
    let obj = new Circle({
      cx: 100,
      cy: 100,
      r: 100,
      fillStyle: new FillStyle({
        visible: true,
        color: "red",
        alpha: 0.5,
      }),
      showLabel: false,
      label: new String("circle 1"),
      selected: false,
      user: {},
    });
    expect(obj.x).toBe(0);
    expect(obj.y).toBe(0);
  });
  //   test("it should be in", function () {
  //     var rect = new rect_1.default(0, 0, 100, 100);
  //     expect(rect.in(0, 0)).toBeTruthy();
  //   });
  //   test("it should not be in", function () {
  //     var rect = new rect_1.default(0, 0, 100, 100);
  //     expect(rect.in(-1, -1)).toBeFalsy();
  //   });
});
