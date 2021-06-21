--Up
CREATE TABLE IF NOT EXISTS CallForAction(
  id INTEGER PRIMARY KEY,
  createdAt INTEGER,
  updatedAt INTEGER,
  email TEXT NOT NULL,
  status TEXT,
  replyBy INTEGER,
  content TEXT,
  remarks TEXT
);

CREATE TABLE IF NOT EXISTS OurPartner(
  id INTEGER PRIMARY KEY,
  logo TEXT,
  name TEXT,
  email TEXT,
  phoneNo TEXT,
  createdAt INTEGER,
  updatedAt INTEGER,
  remarks TEXT
);
-- Down
