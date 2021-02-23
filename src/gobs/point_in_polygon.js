export default function point_in_polygon(x, y, pts) {
  // ray-casting algorithm based on
  // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    let xi = pts[i][0],
      yi = pts[i][1];
    let xj = pts[j][0],
      yj = pts[j][1];

    let intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
}
