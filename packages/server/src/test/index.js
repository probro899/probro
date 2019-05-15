// const array1 = [1, 2, 3];
// const array2 = [4, 5, 6];

// array1.forEach((a) => {
//   console.log('array1', a);
//   array2.forEach((b) => {
//     console.log('b called', b);
//     setTimeout(() => console.log('array2', a, b), 3000);
//   });
// });


const arr = [[{id: 1},{id: 2}],[{id: 1}, {id: 2}],[{id: 1}, {id: 2}]]

const mapArray = arr.map(a => a.map(o => o.id)).flat();

console.log(mapArray);

