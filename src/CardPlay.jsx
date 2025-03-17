import PropTypes from "prop-types";
import EscapeButton from "./EscapeButton";
import TableElements from "./TableElements";
import ChipButton from "./ChipButton"
import RenderHand from "./RenderHand";
import useGameLogic from "./hooks/useGameLogic";
import "../styles/cardplay.scss"

function CardPlay({ state, dispatch }){
  const { gameState, pressedKeys, bet, dealerHand, playerHand, bankBalance} = state;
  const { drawCard, takeDouble } = useGameLogic(dispatch);

  if (gameState !== "cardplay") {
    return null;
  }

  const betTotal = bet.reduce((total, chip) => total + chip.value, 0)

  return (
    <div className="game-container">
      <EscapeButton 
        state={state}
        dispatch={dispatch}
      />
      <div className="cardplay-content">
        <RenderHand 
          hand={dealerHand}
        />
        <span className="dealer-score">17</span>
        <TableElements
          state={state}
          dispatch={dispatch}
          betTotal={betTotal}
          gameState={gameState}
        />
        <RenderHand 
          hand={playerHand}
        />
        <span className="player-score">17</span>
        <div className="chip-options">
          {/* SPLIT IS OUT OF SCOPE FOR NOW */}
          {/* {gameState === "cardplay" && (
            <ChipButton
              action={() => drawCard("player")}
              pressedKeys={pressedKeys}
              buttonKey={"1"}
              content={"SPLIT"}
              color="blue"
            />            
          )} */}
          {bankBalance >= betTotal && (
            <ChipButton
              action={() => takeDouble()}
              pressedKeys={pressedKeys}
              buttonKey={"2"}
              content={"DOUBLE"}
              color="purple"
            />            
          )}
          {gameState === "cardplay" && (
            <ChipButton
              action={() => drawCard("player")}
              pressedKeys={pressedKeys}
              buttonKey={"3"}
              content={"STAND"}
              color="red"
            />            
          )}
          {gameState === "cardplay" && (
            <ChipButton
              action={() => drawCard("player")}
              pressedKeys={pressedKeys}
              buttonKey={"4"}
              content={"HIT"}
              color="green"
            />            
          )} 
        </div>
      </div>
    </div>
  )
};

CardPlay.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default CardPlay