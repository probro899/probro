-- Up

CREATE TABLE IF NOT EXISTS Notification(
  id INTEGER PRIMARY KEY,
  userId INTEGER NOT NULL,
  boardId INTEGER,
  type TEXT NOT NULL,
  timeStamp INTEGER NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  viewStatus TEXT NOT NULL,
  imageUrl TEXT,

  --CONSTRAINT
  CONSTRAINT Notification_fk_boarId FOREIGN KEY (boardId) REFERENCES Board(id),
  CONSTRAINT Notification_fk_userId FOREIGN KEY (userId) REFERENCES User(id)
);

-- Down

