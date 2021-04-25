--Up
CREATE TABLE IF NOT EXISTS Organization(
  id INTEGER PRIMARY KEY,
  uId INTEGER NOT NULL,
  name TEXT NOT NULL,
  address TEXT,
  email TEXT,
  phoneNo TEXT,
  image TEXT, 
  timeStamp INTEGER,

  --CONSTRAINT
  CONSTRAINT Oraganization_fk_uId FOREIGN KEY (uId) REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS OrganizationMember(
  id INTEGER PRIMARY KEY,
  uId INTEGER NOT NULL,
  oId INTEGER NOT NULl,
  type TEXT,
  noOfClass INTEGER,

  --CONSTRAINT
  CONSTRAINT OrganizationMember_fk_uId FOREIGN KEY (uId) REFERENCES User(id),
  CONSTRAINT OrganizationMember_fk_oId FOREIGN KEY (oId) REFERENCES Organization(id)
);

CREATE TABLE IF NOT EXISTS Package(
  id INTEGER PRIMARY KEY,
  noOfClass INTEGER,
  price INTEGER,
  descrition TEXT,
  type TEXT,
  classType TEXT,
  timeStamp INTEGER
);

CREATE TABLE IF NOT EXISTS SellPackage(
  id INTEGER PRIMARY KEY,
  oId INTEGER,
  uId INTEGER NOT NULL,
  packageId NOT NULL,
  type TEXT,
  timeStamp INTEGER NOT NULL,
  referenceCode TEXT NOT NULL,
  remarks TEXT,

  --CONSTRAINT
  CONSTRAINT SellPackage_fk_oId FOREIGN KEY (oId) REFERENCES Organization(id),
  CONSTRAINT SellPackage_fk_uId FOREIGN KEY (uId) REFERENCES User(id),
  CONSTRAINT SellPackage_fk_packageId FOREIGN KEY (packageId) REFERENCES Package(id)
);

CREATE TABLE IF NOT EXISTS PackageDescription(
  id INTEGER PRIMARY KEY,
  packageId INTEGER NOT NULL,
  oneToOneChat INTEGER,
  oneToOneCall INTEGER,
  groupChat INTEGER,
  groupCall INTEGER,
  screensharing INTEGER,
  callRecording INTEGER,
  noOfUserInclassRoom INTEGER,
  drawingBoard INTEGER,
  blogging INTEGER,
  reporting INTEGER,
  notificationOfAllClassActivity INTEGER,
  descrition TEXT,
  projectManagementTool INTEGER,
  classType TEXT,
  remarks TEXT,

  --CONSTRAINT
  CONSTRAINT PackageDescription_fk_packageId FOREIGN KEY (packageId) REFERENCES Package(id)
);

ALTER TABLE Board ADD COLUMN refCode TEXT;
ALTER TABLE Board Add COLUMN oId INTEGER;
-- Down
