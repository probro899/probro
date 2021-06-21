--Up
ALTER TABLE TaskParticipant ADD COLUMN deleteStatus INTEGER;
ALTER TABLE BoardActivity ADD COLUMN participantId INTEGER;
-- Down
