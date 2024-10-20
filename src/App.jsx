import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchData } from './components/PokeAPI';
import GameScreen from './components/Gamescreen';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [CaughtPokemons, setCaughtPokemons] = useState([]);
  const [flip, setAllFlip] = useState(true);
  useEffect(() => {
    async function getPokemonData () {
      try {
        const data = fetchData();
        setPokemonData(await data);
      } catch(error) {
        console.error('Failed to get data', error);
      }
    }
    getPokemonData();
    setTimeout(setAllFlip, 1000);
  }, []);

  //Shuffle Card function 
  function shuffleCard(pokemonData) {
    const availableCards = [...pokemonData];
    const shuffledPokemons = [];
    while (availableCards.length) {
      const index = Math.floor(Math.random() * availableCards.length);
      const card = availableCards[index];
      shuffledPokemons.push(card);
      availableCards.splice(index, 1);
    }
    setPokemonData(shuffledPokemons);
  }
  //Add caught pokemon to array 
  function addCaughtPokemon (pokemon) {
    setCaughtPokemons(prevPokemonData => [
      ...prevPokemonData, pokemon
    ])
  }
  //Catch pokemon function when a card is clicked
  function catchPokemon (id) {
    const cardIndex = pokemonData.findIndex(pokemon => pokemon.id === id);
    const newPokemonData = [...pokemonData];
    const CaughtPokemon = newPokemonData[cardIndex];
    newPokemonData.splice(cardIndex, 1);
    setPokemonData(newPokemonData);
    addCaughtPokemon(CaughtPokemon);
    //pass in new pokemon Data to trigger re render of the updated lists
    setAllFlip(true);
    setTimeout(() => {
      shuffleCard(newPokemonData);
      setTimeout(() => {
        setAllFlip(false);
      },500)
    }, 1000);
  }

  return (
    <>
      <header>
      <img src="../pokeball.png" alt="pokeball-image" className="">     
      </img>
      <h2>Catch <span>And</span> Release</h2>
      <p>Hint: Click on a pokemon to (try to) catch it</p>
    </header>
    <GameScreen 
    pokemonData = {pokemonData}
    flip={flip}
    handleClick={catchPokemon}
    caughtPokemons={CaughtPokemons}
    />
    </>
  )
}

export default App
