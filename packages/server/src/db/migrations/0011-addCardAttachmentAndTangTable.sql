--Up
ALTER TABLE BoardColumnCard ADD COLUMN Deadline INTEGER;

CREATE TABLE IF NOT EXISTS BoardColumnCardTag(
  id INTEGER PRIMARY KEY,
  tag TEXT NOT NULL,
  boardColumnCardId INTEGER NOT NULL,

  --CONSTRAINTS
  CONSTRAINT BoardColumnCardTag_fk_boardColumnCardId FOREIGN KEY (boardColumnCardId) REFERENCES BoardColumnCard(id)
);
-- Down

