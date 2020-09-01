--Up
CREATE TABLE IF NOT EXISTS UserConnection(
  id INTEGER PRIMARY KEY,
  mId INTEGER NOT NULL,
  userId INTEGER NOT NULL,
  timeStamp INTEGER,
  status TEXT,

  --CONSTRAINT
  CONSTRAINT UserConnection_fk_mId FOREIGN KEY (mId) REFERENCES User(id),
  CONSTRAINT UserConnection_fk_userId FOREIGN KEY (userId) REFERENCES User(id)
);
-- Down
