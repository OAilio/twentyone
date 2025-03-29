import PropTypes from "prop-types";
import EscapeButton from "./EscapeButton";
import "../../styles/instructions.scss"

function Instructions({ state, dispatch }){
  const { gameState } = state;

  if (gameState !== "instructions"){
    return null
  }

  // Game instructions are AI generated
  return(
    <>
      <div className="instructions-container">
        <EscapeButton 
          state={state}
          dispatch={dispatch}
        />
        <div className="instructions-content">
          <h2 className="header">Game Rules</h2>
          <div className="ins-text">
            <p>
              The game can be played by tapping
              or with the visible keybinds (1-8 + Esc)
              <br></br><br></br>
              The goal is to reach 21 
              points or have a higher score than the dealer 
              without exceeding 21.
              <br></br><br></br>
              Place your bet and press DEAL to start.
              <br></br><br></br>
              Choose to HIT to take another card or STAND
              if you&apos;re satisfied with your total.
              <br></br><br></br>
              If your total exceeds 21, your hand is BUST, and the dealer wins.
              <br></br><br></br>
              You can also DOUBLE your bet to receive only one more 
              card if you&apos;re confident in winning.
              <br></br><br></br>
              Try to beat the dealer and win big!
              <br></br><br></br>
              <span className="end-note">NB! Insurance or splitting not implemented.</span>
            </p>
          </div> 
        </div>
      </div>
    </>
  )
}

Instructions.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default Instructions