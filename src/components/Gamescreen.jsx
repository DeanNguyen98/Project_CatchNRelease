import Card from "./PokemonCard";
import "../styles/Gamescreen.scss";
export default function GameScreen(props) {
    const {pokemonData, flip} = props;
    // Pass in Card components to GameScreen
    return (
        <div className="MainGame-ctn">
            <div className="Wildpkm-ctn poke-ctn">
                <h1>Wild Pokemons</h1>
                    <div className="card-ctn">
                    {pokemonData.length > 0 && pokemonData.map(card => {
                    return <Card key={card.id} 
                    pokemon={card}
                    flip={flip}/>
                    })}
                    </div>
            </div>
            <div className="Caughtpkm-ctn poke-ctn">
                    <h1>Pokemon Acquired</h1>
                    <div className="card-ctn">
                        
                    </div>
            </div>
        </div>
    )
}