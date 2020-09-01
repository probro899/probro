-- Up
ALTER TABLE UserDetail ADD COLUMN bio TEXT;
ALTER TABLE UserDetail ADD COLUMN address TEXT;
ALTER TABLE UserDetail ADD COLUMN latitude INTEGER;
ALTER TABLE UserDetail ADD COLUMN longitude INTEGER;

CREATE TABLE IF NOT EXISTS UserWorkExperience(
  id INTEGER PRIMARY KEY,
  userId INTEGER NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  startTime TEXT NOT NULL,
  endTime TEXT NOT NULL,
  summary TEXT,
  remarks TEXT,

  --CONSTAINTS
  CONSTRAINT UserWorkExperience_fk_userId FOREIGN KEY (userId) REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS UserEducation(
  id INTEGER PRIMARY KEY,
  userId INTEGER NOT NULL,
  address TEXT NOT NULL,
  degree TEXT NOT NULL,
  startTime TEXT TIME,
  endTime TEXT TIME,
  remarks TEXT,

--CONSTRAINTS
CONSTRAINT UserEducation_fk_userId FOREIGN KEY (userId) REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS UserSkill(
  id INTEGER PRIMARY KEY,
  userId INTEGER NOT NULL,
  skill TEXT NOT NULL,
  remark TEXT,

  --CONSTRAINTS
  CONSTRAINT UserSkill_fk_userId FOREIGN KEY (userId) REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS UserPortal(
  id INTEGER PRIMARY KEY,
  userId INTEGER NOT NULL,
  title TEXT NOT NULL,
  attachment TEXT,
  link TEXT,
  description TEXT,

  --CONSTRAINTS
  CONSTRAINT UserPortal_fk_userId FOREIGN KEY (userId) REFERENCES User(id)
);

-- Down

