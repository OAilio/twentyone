import PropTypes from "prop-types";

function Instructions({ gameState, setGameState }){
  if (gameState !== "instructions"){
    return null
  }

  return(
    <>
      <h1>Instructions lol</h1>
      <button onClick={() => setGameState("menu")}>Back to menu</button>
    </>
  )
}

Instructions.propTypes = {
  gameState: PropTypes.string.isRequired,
  setGameState: PropTypes.func.isRequired,
}

export default Instructions