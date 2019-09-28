"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = query;
function query(db, sql, ...params) {
  return db.all(sql, ...params);
}