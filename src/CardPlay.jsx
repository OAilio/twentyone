import PropTypes from "prop-types";
import EscapeButton from "./EscapeButton";
import TableElements from "./TableElements";
import ChipButton from "./ChipButton"
import RenderHand from "./Cards";
import useGameLogic from "./hooks/useGameLogic";
import "../styles/cardplay.scss"

function CardPlay({ state, dispatch }){
  const { gameState, pressedKeys, bet, dealerHand, playerHand} = state;
  const { drawCard } = useGameLogic(dispatch);

  if (gameState !== "cardplay") {
    return null;
  }

  const betTotal = bet.reduce((total, chip) => total + chip, 0)

  return (
    <div className="game-container">
      <EscapeButton 
        state={state}
        dispatch={dispatch}
      />
      <div className="cardplay-content">
        <TableElements 
          betTotal={betTotal}
          gameState={gameState}
        />
        <RenderHand 
          hand={dealerHand}
        />
        <RenderHand 
          hand={playerHand}
        />
        <div className="chip-options">
          {/* {gameState === "cardplay" && (
            <ChipButton
              action={() => getCard(setPlayerHand)}
              pressedKeys={pressedKeys}
              buttonKey={"1"}
              content={"SPLIT"}
              color="blue"
            />            
          )} */}
          {/* {gameState === "cardplay" && (
            <ChipButton
              action={() => getCard(setPlayerHand)}
              pressedKeys={pressedKeys}
              buttonKey={"2"}
              content={"DOUBLE"}
              color="purple"
            />            
          )}
          {gameState === "cardplay" && (
            <ChipButton
              action={() => getCard(setPlayerHand)}
              pressedKeys={pressedKeys}
              buttonKey={"3"}
              content={"STAND"}
              color="red"
            />            
          )}*/}
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