-- Up
ALTER TABLE BoardMessage ADD COLUMN readStatus INTEGER;

CREATE TABLE IF NOT EXISTS UserMessage(
  id INTEGER PRIMARY KEY,
  tuserId INTEGER NOT NULL,
  fuserId INTEGER NOT NULL,
  connectionId INTEGER NOT NULL,
  timeStamp INTEGER NOT NULL,
  type TEXT,
  duration INTEGER,
  message TEXT,
  url TEXT,
  readStatus INTEGER,

  --CONSTRAINT
  CONSTRAINT UserMessage_fk_tuserId FOREIGN KEY (tuserId) REFERENCES User(id),
  CONSTRAINT UserMessage_fk_fuserId FOREIGN KEY (fuserId) REFERENCES User(id),
  CONSTRAINT UserMessage_fk_connectionId FOREIGN KEY (connectionId) REFERENCES UserConnection(id) ON DELETE CASCADE
);
-- Down
