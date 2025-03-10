import PropTypes from "prop-types";
// import useGameLogic from "./hooks/useGameLogic";
import EscapeButton from "./EscapeButton";
import "../styles/mainMenu.scss"

function Instructions({ gameState, setGameState, pressedKeys }){
  // const { returnMainMenu } = useGameLogic(setGameState);

  if (gameState !== "instructions"){
    return null
  }

  return(
    <>
      <div className="menu-container">
        <EscapeButton 
          pressedKeys={pressedKeys}
          setGameState={setGameState}
        />
        <h1>Instructions lol</h1>      
      </div>
    </>
  )
}

Instructions.propTypes = {
  gameState: PropTypes.string.isRequired,
  setGameState: PropTypes.func.isRequired,
  pressedKeys: PropTypes.array.isRequired
}

export default Instructions