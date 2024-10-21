// Mock Javascript code to update mySQL database
import {Pool} from 'pg';

const pool = new Pool({
  user: 'username',
  host: 'localhost',
  database: 'pokemon_game',
  password: 'password',
  port: 8888,
});

export const dbService = {
  // Record a Pokemon catch
    async catchPokemon(pokemonName, pokemonSpecies) {

    // update existing record
    const updateResult = await pool.query(
      'UPDATE pokemon_catches SET catch_count = catch_count + 1 WHERE pokemon_name = $1',
      [pokemonName]
    );
    
    // If no record exists, create new one
    if (updateResult.rowCount === 0) {
      await pool.query(
        'INSERT INTO pokemon_catches (pokemon_name, pokemon_species) VALUES ($1, $2)',
        [pokemonName, pokemonSpecies]
        );
        }
    },

  // Decrease catch count when releasing a Pokemon
  
    async releasePokemon(pokemonName) {
        await pool.query(
                `UPDATE pokemon_catches SET catch_count = catch_count + 1 WHERE pokemon_name = $1`,
                [pokemonName]
            );
        
    // Clean up entries with 0 catch_count
   
    await pool.query(
      'DELETE FROM pokemon_catches WHERE catch_count = 0'
    );
  },

  // Get each pokemon catch counts
 
    async getEachCatchCounts() {
        const result = await pool.query(
            'SELECT pokemon_name, catch_count FROM pokemon_catches ORDER BY catch_count DESC',
        )
        return result;
    },

    // Get total catch counts
    async getTotalCount () {
        await pool.query(
            'SELECT SUM(catch_count) AS total_catches FROM pokemon_catches' 
        )
    }
};

