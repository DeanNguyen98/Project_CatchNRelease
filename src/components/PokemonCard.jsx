export default function Card({ pokemon, handleClick, flip, id }) {
    return (
      <>
        <div id = {id} className={`card ${flip ? "flip" : ""}`} onClick={handleClick}>
          {/* card-front */}
          <div className="card-front">
              <img src={pokemon.image} alt={pokemon.name} className="card-image"></img>
              <p className="card-name">{pokemon.name}</p>
          </div>
          {/*card-back*/}
          <div className="card-back">
            <img src="/cardBack.jpg"></img>
          </div>
        </div>
      </>
    )
}