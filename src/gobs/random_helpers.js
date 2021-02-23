export function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function rand_boolean() {
  if (Math.floor(Math.random() * 2) == 0) {
    return true;
  } else {
    return false;
  }
}

export function rand_percent_boolean(percent) {
  const rnd = Math.floor(Math.random() * 100);
  if (rnd / 100 >= 1 - percent) {
    return true;
  } else {
    return false;
  }
}
