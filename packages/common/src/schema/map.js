"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = map;
function map(schema, fn) {
  return schema.allIds.map(function (id) {
    return fn(schema.byId[id]);
  });
}