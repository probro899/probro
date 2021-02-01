

const headerArray = {id: 'Id', name: 'Name' };

const data = [{ id: 1, name: 'bhagya' }, { id: 2, name: 'ranjit' }];

const values = Object.values(headerArray);
const keys = Object.keys(headerArray);

console.log('keys and values', keys, values);
 {id: 1, name: 'bhagya'}
data.map((obj) => {
  keys.map(key => {
    obj[key]
  })
})