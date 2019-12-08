"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = all;
function all(schema) {
  return schema.allIds.map(function (id) {
    return schema.byId[id];
  });
}