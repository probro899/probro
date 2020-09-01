export default async function exec(db, sql, params) {
  const res = await db.all(sql, ...params);
  return res;
}
