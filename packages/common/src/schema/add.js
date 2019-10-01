'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TYPE = 'schema.add';

function add(table, record) {
  return {
    schema: table,
    type: TYPE,
    payload: record
  };
}
add.TYPE = TYPE;
exports.default = add;