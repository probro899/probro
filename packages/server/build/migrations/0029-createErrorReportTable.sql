--Up
CREATE TABLE IF NOT EXISTS ErrorReport(
  id INTEGER PRIMARY KEY,
  userId INTEGER,
  error TEXT,
  errorCode TEXT,
  userAgent TEXT,
  timeStamp INTEGER
)
-- Down
