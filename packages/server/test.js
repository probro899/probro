const _ = require('lodash');

const arr = [{id: 1, name: 'bhagya'}, { id: 2, name: 'rajiv' }];

let element = _.find(arr, e => e.id === 1);
const tempElemnt = element;

console.log('arr after delete', {...element, id: undefined});