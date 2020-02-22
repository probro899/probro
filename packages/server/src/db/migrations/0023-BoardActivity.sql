--Up
CREATE TABLE IF NOT EXISTS BoardActivity(
  id INTEGER PRIMARY KEY,
  userId INTEGER NOT NULL,
  boardId INTEGER NOT NULL,
  columnId INTEGER,
  cardId INTEGER,
  message TEXT,
  timeStamp INTEGER  NOT NULL,
  --CONSTRAINTS
  CONSTRAINT BaordAcitivity_fk_baordId FOREIGN KEY (boardId) REFERENCES Board(id) ON DELETE CASCADE
);
-- Down
