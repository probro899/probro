'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TYPE = 'schema.remove';

function remove(schema, record) {
  return {
    schema: schema,
    type: TYPE,
    payload: record
  };
}

remove.TYPE = TYPE;

exports.default = remove;