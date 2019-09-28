const arr = [[1, 2, 3], [3, 4, 5]];

const newArray = arr.reduce((t, a) => {
  if (Array.isArray(a)) {
    a.forEach(am => t.push(am));
  } else {
    t.push(a);
  }
  return t;
}, []);

console.log(newArray);