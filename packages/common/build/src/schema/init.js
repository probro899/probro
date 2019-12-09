'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SCHEMA_INIT = 'schema.init';

function init(table, data) {
  return {
    type: SCHEMA_INIT,
    schema: table,
    payload: data
  };
}
init.TYPE = SCHEMA_INIT;
exports.default = init;