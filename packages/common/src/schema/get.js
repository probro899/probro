"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = get;
function get(schema, id) {
  return schema.byId[id];
}