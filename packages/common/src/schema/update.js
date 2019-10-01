'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TYPE = 'schema.update';

function update(schema, record) {
  return {
    type: TYPE,
    schema: schema,
    payload: record
  };
}

update.TYPE = TYPE;

exports.default = update;