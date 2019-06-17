const board = [{ id: 1, name: 'test' }, { id: 2, name: 'id 2 test' }, { id: 3, name: 'id 3 test' }, { id: 4, name: 'id 4 test' }];
const userList = [{ userId: 1 }, { userId: 4 }];

function presentorTestor(obj) {
  let p = false;
  userList.forEach((e) => {
    if (e.userId === obj.id) {
      p = true;
    }
  });
  return p;
}

const result = board.filter(e => presentorTestor(e));

console.log(result);
