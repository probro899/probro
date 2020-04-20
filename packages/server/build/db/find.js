'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function find(db, table, condition) {
  if (condition) {
    const fields = Object.keys(condition);
    const conditionStr = fields.map(f => `[${f}]=?`).join(' AND ');
    const params = fields.map(str => condition[str]);
    const sql = `SELECT * FROM ${table} WHERE ${conditionStr}`;
    const res = await db.all(sql, ...params);
    return res;
  }
  const sql = `SELECT * FROM ${table}`;
  const allRes = await db.all(sql);
  return allRes;
};