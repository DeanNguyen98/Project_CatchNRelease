import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchData } from './components/PokeAPI';
import GameScreen from './components/Gamescreen';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
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
  return (
    <>
      <header>
      <img src="../pokeball.png" alt="pokeball-image" className="">     
      </img>
      <h2>Catch <span>And</span> Release</h2>
    </header>
    <GameScreen 
    pokemonData = {pokemonData}
    flip={flip}/>
    </>
  )
}

export default App
