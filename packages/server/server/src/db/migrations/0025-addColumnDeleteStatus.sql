--Up
ALTER TABLE BoardColumnCardAttachment ADD COLUMN deleteStatus INTEGER;
ALTER TABLE BoardColumnCardComment ADD COLUMN deleteStatus INTEGER;
ALTER TABLE BoardColumnCardTag ADD COLUMN deleteStatus INTEGER;
ALTER TABLE BoardColumnCardDescription ADD COLUMN deleteStatus INTEGER;
-- Down
