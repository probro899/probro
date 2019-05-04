-- Up

CREATE TABLE IF NOT EXISTS User(
  id INTEGER PRIMARY KEY,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  password TEXT NOT NULL,
  middleName TEXT NOT NULL,
  email TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS UserDetail(
  id INTEGER PRIMARY KEY,
  userId INTEGER NOT NULL,
  phoneNumber INTEGER,
  gender TEXT,
  degree TEXT,
  field TEXT,
  image TEXT,
  skill TEXT,
  type TEXT,
  experience TEXT,
  userProduct TEXT,
  onlinePortal TEXT,

  --Constraints
  CONSTRAINT UserDetails_fk_userId FOREIGN KEY (userId) REFERENCES User(id)
)
-- Down
