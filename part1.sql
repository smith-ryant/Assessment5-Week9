CREATE TABLE Species (
  SpeciesID INT PRIMARY KEY,
  SpeciesName VARCHAR(255) NOT NULL
);
CREATE TABLE Animals (
  AnimalID INT PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Age INT,
  HealthStatus VARCHAR(255),
  SpeciesID INT,
  FOREIGN KEY (SpeciesID) REFERENCES Species(SpeciesID)
);
CREATE TABLE Adopters (
  AdopterID INT PRIMARY KEY,
  FullName VARCHAR(255) NOT NULL,
  Address VARCHAR(255),
  Phone VARCHAR(20)
);
CREATE TABLE Adoptions (
  AdoptionID INT PRIMARY KEY,
  AnimalID INT,
  AdopterID INT,
  AdoptionDate DATE,
  FOREIGN KEY (AnimalID) REFERENCES Animals(AnimalID),
  FOREIGN KEY (AdopterID) REFERENCES Adopters(AdopterID)
);