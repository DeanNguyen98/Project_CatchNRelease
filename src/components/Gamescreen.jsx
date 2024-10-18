import Card from "./PokemonCard";
import "../styles/Gamescreen.scss";
export default function GameScreen(props) {
    const {pokemonData, flip} = props;
    // Pass in Card components to GameScreen
    return (
        <div className="MainGame-ctn">
            <div className="card-ctn">
                {pokemonData.length > 0 && pokemonData.map(card => {
                return <Card key={card.id} 
                pokemon={card}
                flip={flip}/>
            })}
        </div>
        </div>
    )
}