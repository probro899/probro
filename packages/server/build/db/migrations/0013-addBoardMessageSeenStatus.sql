--Up
CREATE TABLE IF NOT EXISTS BoardMessageSeenStatus(
  id INTEGER PRIMARY KEY,
  bmId INTEGER NOT NULL,
  status INTEGER,
  userId INTEGER,
  timeStamp INTEGER,
--CONSTRAINTS
CONSTRAINT BoardMessageSeenStatus_fk_bmId FOREIGN KEY (bmId) REFERENCES BoardMessage(id),
CONSTRAINT BoardMessageSeenStatus_fk_userId FOREIGN KEY (userId) REFERENCES User(id)
);
-- Down
