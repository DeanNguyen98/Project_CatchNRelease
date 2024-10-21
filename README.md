## SQL database

SQL SCHEMA: 

An .sql schema can be viewed in /SQL/SQLschema.sql . File contains necessary query to interact with SQL database to be used in the codebase if neccessary

DBSERVICE.js

Mock javascript code to retrieve data from database and use within the application. Mock database interaction code can be seen in App.jsx (used in releasePokemon() and catchPokemon())


## Main Flow (App.jsx):

The app starts with a StartScreen where players enter their trainer name

Once started, it fetches 20 random Pokemon from PokeAPI

Shows a loading screen while fetching data.

Maintains two main states:

pokemonData: Available Pokemon to catch
CaughtPokemons: Pokemon that have been caught




## Core Game Mechanics:

Players have a 50% chance to catch a Pokemon when clicking (randomizeCatch function)

Successful catches:

Move Pokemon from pokemonData to CaughtPokemons

Trigger card flip animations

Shuffle remaining Pokemon

Players can release caught Pokemon back to the wild

Game ends when 20 Pokemon are caught


## Component Structure:


GameScreen.jsx:

Renders two sections: "Wild Pokemons" and "Pokemon Acquired"

Maps through both Pokemon arrays to create card grids


PokemonCard.jsx:

Individual card component with flip animation

Shows Pokemon image and name on front

Has a card back design


## API Integration (PokeAPI.jsx):


Fetches from PokeAPI with a limit of 150 Pokemon

Randomly selects 20 Pokemon

Retrieves detailed data for each selected Pokemon

Creates objects with name, image, unique ID, and species