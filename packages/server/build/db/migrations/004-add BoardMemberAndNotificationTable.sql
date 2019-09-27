-- Up

CREATE TABLE IF NOT EXISTS BoardMember(
  id INTEGER PRIMARY KEY,
  tuserId INTEGER NOT NULL,
  fuserId INTEGER NOT NULL,
  boardId INTEGER NOT NULL,
  joinStatus TEXT,
  timeStamp INTEGER NOT NULL,
  userType TEXT NOT NULL,

  --CONSTRAINTS
  CONSTRAINT BoardMember_fk_boardId FOREIGN KEY (boardId) REFERENCES Board(id),
  CONSTRAINT BoardMember_fk_userId FOREIGN KEY (fuserId) REFERENCES User(id),
  CONSTRAINT BoardMember_fk_userId FOREIGN KEY (tuserId) REFERENCES User(id)
);

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

