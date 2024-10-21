-------------------------------------------
-- Creating the Database
-------------------------------------------

CREATE DATABASE pokemon_game;

-------------------------------------------
-- Creating the pokemon_catches Table
-------------------------------------------

CREATE TABLE pokemon_catches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pokemon_name VARCHAR(255) NOT NULL,
    pokemon_species VARCHAR(255) NOT NULL,
    catch_count INT DEFAULT 1
);

-------------------------------------------
-- Querying the Catch Count of Each Pokémon
-------------------------------------------

SELECT pokemon_name, catch_count
FROM pokemon_catches
WHERE pokemon_name = 'Pikachu'

-------------------------------------------
-- Catch count table
-------------------------------------------
SELECT pokemon_name, catch_count
FROM pokemon_catches
ORDER BY catch_count DESC

-------------------------------------------
-- Querying the total Catch count
-------------------------------------------

SELECT SUM(catch_count) AS total_catches
FROM pokemon_catches

-------------------------------------------
-- Insert into database with sample data
-------------------------------------------

INSERT INTO pokemon_catches (pokemon_name, pokemon_species, catch_count)
VALUES ('Pikachu', 'Electric', 1);

-------------------------------------------
-- Update catch count for each pokemon when caught
-------------------------------------------

UPDATE pokemon_catches
SET catch_count = catch_count + 1
WHERE pokemon_name = 'Pikachu';

-------------------------------------------
-- Update catch count for each pokemon when released
-------------------------------------------

UPDATE pokemon_catches
SET catch_count = catch_count -1
WHERE pokemon_name = 'Pikachu' AND catch_count > 0

---------------------------------------------------
