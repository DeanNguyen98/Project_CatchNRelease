import "../styles/StartScreen.scss"
import { useState } from "react";
export default function StartScreen ({handleStartClick, setTrainerName}) {
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    function handleSubmit (e) {
        e.preventDefault();
        if (name === "") {
            setError("Trainer's name is required");
        } else {
            setError("");
            setTrainerName(name);
            handleStartClick();
        }
    }
    return (
        <>
        <div className="start-screen Modal">
            <div className="start-menu">
                <form className="form" onSubmit={handleSubmit}>     
                    <span>Enter your trainer name:</span>
                    <label htmlFor="name">
                    <input type="text" value={name} name="name" id="name" placeholder="Trainer's name" onChange={(e) => setName(e.target.value)}></input>
                    </label>
                    <button type="submit">START GAME</button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
            <div className="instructions">
            <p>Instruction: There are 20 randomly generated pokemons to catch. You can release the pokemons that you have caught. You have a 50% chance to catch one pokemon. Try your best, trainer. </p>
            <p>Let&apos;s catch them all!</p>
            </div>
        </div>
        </>
    )
}