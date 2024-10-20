import "../styles/Modal.scss"
export default function EndModal({handleClick}) {
    return (
       <dialog open className="Modal">
            <div className="modal-content">
            <iframe src="https://giphy.com/embed/SeysxkSfenHY4" className="giphy-embed" allowFullScreen></iframe>
                <p>You caught all the pokemons. Congrats!</p>
                <button onClick={handleClick}>Restart</button>
            </div>
       </dialog>
    )
}