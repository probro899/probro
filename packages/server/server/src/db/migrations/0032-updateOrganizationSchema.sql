--Up
ALTER TABLE Organization ADD COLUMN headLine TEXT;
ALTER TABLE Organization ADD COLUMN webSiteUrl TEXT;
ALTER TABLE Organization ADD COLUMN deleteStatus INTEGER;
ALTER TABLE Organization ADD COLUMN status TEXT;
ALTER TABLE Organization ADD COLUMN remarks TEXT;

ALTER TABLE OrganizationMember ADD COLUMN status TEXT;
ALTER TABLE OrganizationMember ADD COLUMN remarks TEXT;
ALTER TABLE OrganizationMember ADD COLUMN timeStamp INTEGER;
ALTER TABLE OrganizationMember ADD COLUMN deleteStatus INTEGER;

ALTER TABLE Blog ADD COLUMN deleteStatus INTEGER;

-- Down
