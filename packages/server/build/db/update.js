'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function update(db, table, values, condition) {
  console.log('update core method', table, values, condition);
  const fields = Object.keys(values);
  const set = fields.map(f => `[${f}]=?`).join(',');
  const fieldParams = fields.map(f => values[f]);

  const conditionFields = Object.keys(condition);
  const conditionStr = conditionFields.map(c => `[${c}]=?`).join(' AND ');
  const conditionParams = conditionFields.map(c => condition[c]);

  const sql = `UPDATE [${table}] SET ${set} WHERE ${conditionStr}`;
  const res = await db.run(sql, ...fieldParams, ...conditionParams);
  return res.stmt.changes;
};