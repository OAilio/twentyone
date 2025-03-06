import PropTypes from "prop-types";
import "../styles/game.scss"

function Game({ gameState, setGameState, bet }){
  if (gameState === "menu" || gameState === "instructions") {
    return null;
  }

  return (
    <div className="game-container">
      <h2>Lets play its game state</h2>
      <button onClick={() => setGameState("menu")}>Back to menu</button>
      <p>{bet}</p>
    </div>
  )
};

Game.propTypes = {
  gameState: PropTypes.string.isRequired,
  setGameState: PropTypes.func.isRequired,
  bet: PropTypes.number.isRequired
}

export default Game
