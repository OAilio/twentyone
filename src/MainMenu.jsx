import PropTypes from "prop-types";
import useGameLogic from "./hooks/useGameLogic";
import "../styles/mainMenu.scss"

function MainMenu({ gameState, setGameState, pressedKeys }){
  const { startGame, openInstructions } = useGameLogic(setGameState);
  if (gameState !== "menu"){
    return null
  }
  return (
    <>
      <div className="menu-container">
        <h1>Logo</h1>
        <h1>This is Main menu</h1>
        <button onClick={() => startGame()} className={`${pressedKeys.includes("5") ? "keydown" : ""}`}>
          <span className="key">5</span>
          <span>Play</span>
        </button>
        <button onClick={() => openInstructions()} className={`${pressedKeys.includes("7") ? "keydown" : ""}`}>
          <span className="key">7</span>
          <span>instructions</span>
        </button>
      </div>
    </>
  )
}

MainMenu.propTypes = {
  gameState: PropTypes.string.isRequired,
  setGameState: PropTypes.func.isRequired,
  pressedKeys: PropTypes.array.isRequired
}

export default MainMenu