import PropTypes from "prop-types";
import EscapeButton from "./EscapeButton";
import "../styles/mainMenu.scss"

function Instructions({ state, dispatch }){
  const { gameState } = state;

  if (gameState !== "instructions"){
    return null
  }

  return(
    <>
      <div className="menu-container">
        <EscapeButton 
          state={state}
          dispatch={dispatch}
        />
        <h1>Instructions lol</h1>      
      </div>
    </>
  )
}

Instructions.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default Instructions