--Up

CREATE TABLE IF NOT EXISTS BoardMessage(
  id INTEGER PRIMARY KEY,
  boardId INTEGER NOT NULL,
  message TEXT NOT NULL,
  userId INTEGER NOT NULL,
  timeStamp INTEGER NOT NULL,
  url TEXT,
  remarks TEXT,

  --CONSTRAINTS
  CONSTRAINT BoardMessage_fk_boardId FOREIGN KEY (boardId) REFERENCES Board(id),
  CONSTRAINT BoardMessage_fk_userId FOREIGN KEY (userId) REFERENCES User(id)
);
-- Down





