-- Up
CREATE TABLE IF NOT EXISTS NotificationReadStatus(
  id INTEGER PRIMARY KEY,
  notifId INTEGER NOT NULL,
  status INTEGER,
  userId INTEGER NOT NULL,
  timeStamp INTEGER,

   --CONSTRAINT
   CONSTRAINT NotificationReadStatus_fk_notifId FOREIGN KEY (notifId) REFERENCES Notification(id)
);
-- Down
