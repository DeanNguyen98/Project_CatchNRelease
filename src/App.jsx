import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchData } from './components/PokeAPI';
import GameScreen from './components/Gamescreen';
import StartScreen from './components/StartScreen';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [CaughtPokemons, setCaughtPokemons] = useState([]);
  const [flip, setAllFlip] = useState(false);
  const [isFlipping, setIsFlip] = useState(false);
  const [statement, setStatement] = useState('');
  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(false);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const LOAD_TIME = 3000;
  useEffect(() => {
    async function getPokemonData () {
      try {
        const data = fetchData();
        setLoading(true);

        await sleep(LOAD_TIME);

        setPokemonData(await data);

        setLoading(false);
        setAllFlip(true);
        setTimeout(setAllFlip, 1000);
        console.log(flip);
      } catch(error) {
        console.error('Failed to get data', error);
      }
    }
    getPokemonData();
  }, [start]);

  function StartGame() {
    setStart(true);
    console.log(pokemonData)
  }
  
  //Add caught pokemon to array 
  function addCaughtPokemon (pokemon) {
    setCaughtPokemons(prevPokemonData => [
      ...prevPokemonData, pokemon
    ])
  }

  //Remove pokemon from caught list
  function releasePokemon (id) {
    const releasedPokemon = CaughtPokemons.filter(pokemon => pokemon.id === id)[0];
    setCaughtPokemons(prevCaughtPokemon => {
      return prevCaughtPokemon.filter(pokemon => pokemon.id !== id);
    })
    setPokemonData(prevPokemonData => [
      ...prevPokemonData, releasedPokemon
    ])
  }

    //Shuffle Card function 
    function shuffleCard(data) {
      const availableCards = [...data];
      const shuffledPokemons = [];
      while (availableCards.length) {
        const index = Math.floor(Math.random() * availableCards.length);
        const card = availableCards[index];
        shuffledPokemons.push(card);
        availableCards.splice(index, 1);
      }
      setPokemonData(shuffledPokemons);
    }

  //Catch pokemon function when a card is clicked
  function catchPokemon (id) {
    const cardIndex = pokemonData.findIndex(pokemon => pokemon.id === id);
    const newPokemonData = [...pokemonData];
    const CaughtPokemon = newPokemonData[cardIndex];
    newPokemonData.splice(cardIndex, 1);
    setPokemonData(newPokemonData);
    addCaughtPokemon(CaughtPokemon);
    setStatement('Nice! You caught the pokemon!')
    //pass in new pokemon Data to trigger re render of the updated lists
    setAllFlip(true);
    setIsFlip(true);
    setTimeout(() => {
      shuffleCard(newPokemonData);
      setTimeout(() => {
        setAllFlip(false);
        setIsFlip(false);
      },500)
    }, 1000);
  }

  function randomizeCatch(id) {
    const isSuccessful = Math.random() < 0.5;
    if (!isSuccessful) {
      setStatement("You couldn't catch it. Try again!")
      return;
    }
    catchPokemon(id);
  }

  return (
    <>
      <header>
      <img src="../pokeball.png" alt="pokeball-image" className="">     
      </img>
      <h2>Catch <span>And</span> Release</h2>
      <p>Hint: Click on a pokemon to (try to) catch it</p>
    </header>
   {!start ? (
    <StartScreen handleStartClick={StartGame} /> 
   ) : loading ? (
    <LoadingScreen/>
   ) : (
    <GameScreen 
    pokemonData = {pokemonData}
    statement = {statement}
    flip={flip}
    handleClick={isFlipping? true : randomizeCatch}
    handleRelease={releasePokemon}
    caughtPokemons={CaughtPokemons}
    />
   )
  
  }
    </>
  )
}

export default App
