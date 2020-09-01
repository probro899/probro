-- Up
ALTER TABLE Blog ADD COLUMN title TEXT;
ALTER TABLE Blog ADD COLUMN content TEXT;

DROP TABLE BlogDetail;

-- Down

