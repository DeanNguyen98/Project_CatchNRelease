import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchData } from './components/PokeAPI';
import GameScreen from './components/Gamescreen';
import StartScreen from './components/StartScreen';
import LoadingScreen from './components/LoadingScreen';
import EndModal from './components/EndModal';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [CaughtPokemons, setCaughtPokemons] = useState([]);
  const [flip, setAllFlip] = useState(false);
  const [isFlipping, setIsFlip] = useState(false);
  const [statement, setStatement] = useState('');
  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trainerName, setTrainerName] = useState("");
  const [endCondition, setEndCondition] = useState(true);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const LOAD_TIME = 3000;
  useEffect(() => {
    if (start) {
      async function getPokemonData () {
        try {
          const data = fetchData();
          setLoading(true);
  
          await sleep(LOAD_TIME);
  
          setPokemonData(await data);
  
          setLoading(false);
          setAllFlip(true);
          setTimeout(() => setAllFlip(false), 1000);
        } catch(error) {
          console.error('Failed to get data', error);
        }
      }
      setStatement(
        <>
          Good luck, <span className="trainer-name">{trainerName}</span>!
        </>
      )
      getPokemonData();
    }

  }, [start]);

  useEffect(() => {
    if (CaughtPokemons.length === 20) {
      setEndCondition(true);
    }
  }, [CaughtPokemons]);

  function StartGame() {
    setStart(true);
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
    setStatement(
      <>
        Nice! <span className="trainer-name">{trainerName}</span> caught a pokemon!
      </>
    )
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
    const isSuccessful = true;
    if (!isSuccessful) {
      setStatement("You couldn't catch it. Try again!");
      //add a vibrate animation when clicking is unsuccessful
      const card = document.getElementById(`${id}`);
      if (card) {
        card.classList.add('vibrate');
        setTimeout(() => {
          card.classList.remove('vibrate'); // Remove class after the animation completes
        }, 500);
      }
      return;
    }
    catchPokemon(id);
  }

  function GameRestart() {
    setStart(false);
    setEndCondition(false);
    setCaughtPokemons([]);
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
    <StartScreen 
    handleStartClick={StartGame}
    setTrainerName={setTrainerName} /> 
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
  {endCondition && (
    <EndModal handleClick={GameRestart} />
  )}
    </>
  )
}

export default App
