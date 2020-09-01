--Up
CREATE TABLE IF NOT EXISTS UserCarrierInterest(
  id INTEGER PRIMARY KEY,
  userId INTEGER NOT NULL,
  interest TEXT NOT NULL,

  --CONSTRAINT
  CONSTRAINT UserCarrierInterest_fk_userId FOREIGN KEY (userId) REFERENCES User(id)
);

ALTER TABLE BoardMessage ADD COLUMN fuserId INTEGER;
-- Down

