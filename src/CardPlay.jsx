import PropTypes from "prop-types";
import EscapeButton from "./EscapeButton";
import TableElements from "./TableElements";
import ChipButton from "./ChipButton"
import RenderHand from "./RenderHand";
import useGameLogic from "./hooks/useGameLogic";
import handTotal from "./assets/handTotal";
import "../styles/cardplay.scss"
import RoundResults from "./RoundResults";

function CardPlay({ state, dispatch }){
  const { gameState, pressedKeys, bet, dealerHand, playerHand, bankBalance, playerTurn} = state;
  const { drawCard, stand, takeDouble } = useGameLogic(state, dispatch);

  const playerTotal = handTotal(state.playerHand)
  const dealerTotal = handTotal(state.dealerHand)
  const betTotal = bet.reduce((total, chip) => total + chip.value, 0)

  if (gameState !== "cardplay" && gameState !== "results") {
    return null;
  }

  return (
    <div className="game-container">
      <EscapeButton 
        state={state}
        dispatch={dispatch}
      />
      <div className="cardplay-content">
        <div className="hand-content">
            <RenderHand 
              hand={dealerHand}
              owner="dealer"
              state={state}
            />
            <span className={`dealer-score ${playerTurn ? "hidden" : ""}`}>{dealerTotal}</span>
          </div>
        <TableElements
          state={state}
          dispatch={dispatch}
          betTotal={betTotal}
          gameState={gameState}
        />
        <div className="hand-content">
          <RenderHand 
            hand={playerHand}
            owner="player"
            state={state}
          />
          <span className="player-score">{playerTotal}</span>          
        </div>
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
          {bankBalance >= betTotal && playerTurn && (
            <ChipButton
              action={() => takeDouble()}
              pressedKeys={pressedKeys}
              buttonKey={"2"}
              content={"DOUBLE"}
              color="purple"
            />            
          )}
          {playerTurn && (
            <ChipButton
              action={() => stand()}
              pressedKeys={pressedKeys}
              buttonKey={"3"}
              content={"STAND"}
              color="red"
            />            
          )}
          {playerTurn && (
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
      <RoundResults 
        state={state}
        dispatch={dispatch}
        betTotal={betTotal}
      />
    </div>
  )
};

CardPlay.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default CardPlay