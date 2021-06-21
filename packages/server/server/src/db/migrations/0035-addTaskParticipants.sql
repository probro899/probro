--Up
CREATE TABLE IF NOT EXISTS TaskParticipant(
  id INTEGER PRIMARY KEY,
  taskId INTEGER NOT NULL,
  participantId INTEGER NOT NULL,
  userId INTEGER NOT NULL,
  timeStamp INTEGER,

  --CONTSTRAINTS 
  CONSTRAINT TaskParticipant_fk_taskId FOREIGN KEY (taskId) REFERENCES BoardColumnCard(id) ON DELETE CASCADE
);

ALTER TABLE SellPackage ADD COLUMN createdAt INTEGER;
ALTER TABLE SellPackage ADD COLUMN updatedAt INTEGER;
ALTER TABLE SellPackage ADD COLUMN expiredOn INTEGER;
ALTER TABLE SellPackage ADD COLUMN status TEXT;

-- Down