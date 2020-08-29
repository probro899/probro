--Up
CREATE TABLE IF NOT EXISTS UserMessageSeenStatus(
  id INTEGER PRIMARY KEY,
  umId INTEGER NOT NULL,
  userId INTEGER NOT NULL,
  timeStamp INTEGER,
  status TEXT,

  --CONSTRAINTS
  CONSTRAINT UserMessageSeenStatus_fk_umId FOREIGN KEY (umId) REFERENCES UserMessage(id)
);
-- Down

