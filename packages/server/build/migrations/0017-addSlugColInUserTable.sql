--Up
ALTER TABLE User ADD COLUMN slug TEXT;

 -- Creating user by default....
INSERT OR REPLACE INTO User (id, firstName, lastName, password, middleName, email, verify, type, slug) VALUES
(1, "Proper", "Class", "$2b$10$NZZ1NYqBeT9DBR1gkloR9.0D1kdolRXTDjPFjSb4pj9Vkl1/yDXze", "", "probro899@gmail.com", "1", 'admin', 'proper-class-1584176347602');

-- Down
