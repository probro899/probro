-- Up

CREATE TABLE IF NOT EXISTS User(
  id INTEGER PRIMARY KEY,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  password TEXT NOT NULL,
  middleName TEXT NOT NULL,
  email TEXT NOT NULL,
  verificationToken TEXT,
  verify TEXT
);

CREATE INDEX User_ix_id ON User(id);

CREATE TABLE IF NOT EXISTS UserDetail(
  id INTEGER PRIMARY KEY,
  userId INTEGER NOT NULL,
  phoneNumber INTEGER,
  gender TEXT,
  degree TEXT,
  field TEXT,
  image TEXT,
  skill TEXT,
  type TEXT,
  experience TEXT,
  userProduct TEXT,
  onlinePortal TEXT,

  --Constraints
  CONSTRAINT UserDetails_fk_userId FOREIGN KEY (userId) REFERENCES User(id)
);

CREATE INDEX UserDetail_ix_userId ON UserDetail(userId);

CREATE TABLE IF NOT EXISTS Board(
  id INTEGER PRIMARY KEY,
  timeStamp TEXT NOT NULL,
  name TEXT NOT NULL,
  userId INTEGER NOT NULL,
  image TEXT,

  -- Constraints
  CONSTRAINT Board_creator_userId FOREIGN KEY (userId) REFERENCES User(id)
);

CREATE INDEX Board_ix_userId ON Board(userId);

CREATE TABLE IF NOT EXISTS BoardColumn(
  id INTEGER PRIMARY KEY,
  boardId INTEGER NOT NULL,
  name TEXT NOT NULL,
  timeStamp TEXT NOT NULL,
  userId INTEGER NOT NULL,

  -- Constraints
  CONSTRAINT Board_Column_creator_userId FOREIGN KEY (userId) REFERENCES User(id),
  CONSTRAINT Board_Column_BoardId FOREIGN KEY (boardId) REFERENCES Board(id)
);

CREATE INDEX BoardColumn_ix_boardId ON BoardColumn(boardId);

CREATE TABLE IF  NOT EXISTS BoardColumnCard(
  id INTEGER PRIMARY KEY,
  userId INTEGER NOT NULL,
  boardColumnId NOT NULL,
  timeStamp TEXT NOT NULL,
  name TEXT NOT NULL,
  position INTEGER NOT NULL,
  description TEXT NOT NULL,
  attachment TEXT NOT NULL,

  -- CONSTRAINTS
  CONSTRAINT Board_Column_Creator_Task_UserId FOREIGN KEY (userId) REFERENCES User(id),
  CONSTRAINT Board_Column_Id FOREIGN KEY (boardColumnId) REFERENCES BoardColumn(id)
);

CREATE INDEX BoardColumnCard_ix_boardColumnId ON BoardColumnCard(boardColumnId);


CREATE TABLE IF NOT EXISTS BoardColumnCardDescription(
  id INTEGER PRIMARY KEY,
  userId INTEGER NOT NULL,
  boardColumnCardId INTEGER NOT NULL,
  title TEXT NOT NULL,
  timeStamp TEXT NOT NULL,

  -- CONSTRAINTS
  CONSTRAINT Board_Column_Card_Creator_UserId FOREIGN KEY (userId) REFERENCES User(id),
  CONSTRAINT Board_Column_Card_id FOREIGN KEY (boardColumnCardId) REFERENCES BoardColumnCard(id)
);

CREATE INDEX BoardColumnCardDescription_ix_boardColumnCardId ON BoardColumnCardDescription(boardColumnCardId);

CREATE TABLE IF NOT EXISTS BoardColumnCardAttachment(
  id INTEGER PRIMARY KEY,
  userId INTEGER NOT NULL,
  boardColumnCardId INTEGER NOT NULL,
  timeStamp INTEGER NOT NULL,
  name TEXT NOT NULL,
  url TEXT NOT NULL,

  -- CONSTRAINT
  CONSTRAINT Board_Column_Card_cardId FOREIGN KEY (boardColumnCardId) REFERENCES BoardColumnCard(id),
  CONSTRAINT Board_Column_Card_Attachment_Creator_UserId FOREIGN KEY  (userId) REFERENCES User(id)
);

CREATE INDEX BoardColumnCardAttachment_ix_boardColumnCardId ON BoardColumnCardAttachment(boardColumnCardId);

CREATE TABLE IF NOT EXISTS BoardColumnCardComment(
  id INTEGER PRIMARY KEY,
  userId INTEGER NOT NULL,
  boardColumnCardId INTEGER NOT NULL,
  timeStamp INTEGER NOT NULL,
  comment TEXT NOT NULL,

-- CONSTRAINT
 CONSTRAINT Board_Column_Card_CardId FOREIGN KEY (boardColumnCardId) REFERENCES BoardColumnCard(id),
 CONSTRAINT Board_Column_Card_Comment_Creator_UserId FOREIGN KEY (userId) REFERENCES User(id)
);

CREATE INDEX BoardColumnCardComment_ix_boardColumnCardId ON BoardColumnCardComment(boardColumnCardId);
-- Down

