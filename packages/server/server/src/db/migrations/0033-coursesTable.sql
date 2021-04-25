--Up
CREATE TABLE IF NOT EXISTS Course(
  id INTEGER PRIMARY KEY,
  createdBy INTEGER NOT NULL,
  title TEXT,
  subTitle TEXT,
  description TEXT,
  skill TEXT,
  createdAt INTEGER,
  updatedAt INTEGER,
  accessToken TEXT,
  duration INTEGER,
  deleteStatus INTEGER,
  status TEXT,
  level TEXT,
  domain TEXT,
  subDomain TEXT,
  logo TEXT,
  remarks TEXT,

  --CONSTRAINTS
  CONSTRAINT Course_fk_createdBy FOREIGN KEY (createdBy) REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS Section(
  id INTEGER PRIMARY KEY,
  courseId INTEGER NOT NULL,
  title TEXT,
  objective TEXT,
  duration INTEGER,
  createdAt INTEGER,
  updatedAt INTEGER,
  remarks TEXT,

  --CONSTRAINTS
  CONSTRAINT Section_fk_courseId FOREIGN KEY (courseId) REFERENCES Course(id)
);

CREATE TABLE IF NOT EXISTS Lecture(
  id INTEGER PRIMARY KEY,
  sectionId INTEGER NOT NULL,
  title TEXT,
  description TEXT,
  duration INTEGER,
  createdAt INTEGER,
  updatedAt INTEGER,
  remarks TEXT,

  --CONTRAINTS
  CONSTRAINT Lecture_fk_sectionId FOREIGN KEY (sectionId) REFERENCES Section(id)
);

CREATE TABLE IF NOT EXISTS Resource(
  id INTEGER PRIMARY KEY,
  lecId INTEGER NOT NULL,
  type TEXT,
  name TEXT,
  url TEXT,
  accessToken TEXT,
  createdAt INTEGER,
  updatedAt INTEGER,
  remarks TEXT,

  --CONTRAINTS
  CONSTRAINT Resource_fk_lecId FOREIGN KEY (lecId) REFERENCES Lecture(id)
);

CREATE TABLE IF NOT EXISTS CoursePrice(
  id INTEGER PRIMARY KEY,
  courseId INTEGER NOT NULL,
  price INTEGER,
  discount INTEGER,
  currency TEXT,
  createdAt INTEGER,
  updatedAt INTEGER,
  remarks TEXT,

  --CONTSTRAINTS
  CONSTRAINT CoursePrice_fk_courseId FOREIGN KEY (courseId) REFERENCES Course(id)
);

CREATE TABLE IF NOT EXISTS CourseEnroll(
  id INTEGER PRIMARY KEY,
  userId INTEGER NOT NULL,
  courseId INTEGER NOT NULL,
  status TEXT,
  createdAt INTEGER,
  updatedAt INTEGER,
  remarks TEXT,

  --CONSTRAINTS 
  CONSTRAINT CourseEnroll_fk_userId FOREIGN KEY (userId) REFERENCES User(id),
  CONSTRAINT CourseEnroll_fk_courseId FOREIGN KEY (courseId) REFERENCES Course(id)
);

CREATE TABLE IF NOT EXISTS StarRating(
  id INTEGER PRIMARY KEY,
  courseId INTEGER,
  mentorId INTEGER,
  noOfStar INTEGER,
  review TEXT,
  userId INTEGER NOT NULL,
  type TEXT,
  createdAt INTEGER,
  updatedAt INTEGER,
  remarks TEXT,

  --CONTSTRAINT 
  CONSTRAINT StarRating_fk_courseId FOREIGN KEY (courseId) REFERENCES Course(id),
  CONSTRAINT StarRating_fk_mentorId FOREIGN KEY (mentorId) REFERENCES User(id),
  CONSTRAINT StarRating_fk_userId FOREIGN KEY (userId) REFERENCES User(id)
);

ALTER TABLE OrganizationMember ADD COLUMN email TEXT;

ALTER TABLE User ADD COLUMN createdAt INTEGER DEFAULT 1617015622731;
ALTER TABLE User ADD COLUMN updatedAt INTEGER DEFAULT 1617015622731;
ALTER TABLE Blog ADD COLUMN createdAt INTEGER DEFAULT 1617015622731;
ALTER TABLE Blog ADD COLUMN updatedAt INTEGER DEFAULT 1617015622731;

-- Down

