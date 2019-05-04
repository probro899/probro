
export default async function insert(db, table, values) {
  const fields = Object.keys(values);
  const fieldName = fields.map(f => `[${f}]`).join(',');
  const fieldPlaceHolder = fields.map(() => '?').join(',');
  const params = fields.map(f => values[f]);
  const sql = `INSERT INTO [${table}](${fieldName}) VALUES (${fieldPlaceHolder})`;
  const res = await db.run(sql, ...params);
  return res.stmt.lastID;
}
