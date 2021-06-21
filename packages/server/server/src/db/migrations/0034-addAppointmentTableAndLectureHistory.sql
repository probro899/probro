--Up

CREATE TABLE IF NOT EXISTS CourseCompleteHistory(
  id INTEGER PRIMARY KEY,
  courseId INTEGER NOT NULL,
  userId INTEGER NOT NULL,
  lectureId INTEGER,
  createdAt INTEGER,
  updatedAt INTEGER,
  status TEXT,
  remarks TEXT,
  note TEXT,

  --CONTSTRAINTS
  CONSTRAINT CourseCompleteHistory_fk_courseId FOREIGN KEY (courseId) REFERENCES Course(id),
  CONSTRAINT CourseCompleteHistory_fk_userId FOREIGN KEY (userId) REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS Appointment(
  id INTEGER PRIMARY KEY,
  userId INTEGER NOT NULL,
  classId INTEGER NOT NULL,
  title TEXT,
  description TEXT,
  status TEXT,
  startDate INTEGER,
  endDate INTEGER,
  createdAt INTEGER,
  updatedAt INTEGER,
  remarks TEXT,
  deleteStatus INTEGER,

  --CONSTRAINTS
  CONSTRAINT Appointment_fk_userId FOREIGN KEY (userId) REFERENCES User(id),
  CONSTRAINT Appointment_fk_classId FOREIGN KEY (classId) REFERENCES Board(id)
);

ALTER TABLE Course ADD COLUMN slug TEXT;
ALTER TABLE Organization ADD COLUMN slug TEXT;

-- Down
