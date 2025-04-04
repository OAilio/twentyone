import PropTypes from "prop-types";
import EscapeButton from "./EscapeButton";
import PrimaryButton from "./PrimaryButton";
import TableElements from "./TableElements";
import ChipButton from "./ChipButton"
import useGameLogic from "../hooks/useGameLogic";
import "../../styles/betting.scss"
import OutOfCash from "./OutOfCashPopUp";

function Betting({ state, dispatch }){
  const { placeChip, dealInitialHands } = useGameLogic(state, dispatch);
  const { gameState, pressedKeys, bankBalance, bet} = state;

  if (gameState !== "betting") {
    return null;
  }

  const betTotal = bet.reduce((total, chip) => total + chip.value, 0)

  return (
    <div className="game-container">
      <OutOfCash
        state={state}
        dispatch={dispatch}
        betTotal={betTotal}
      />
      <EscapeButton 
        state={state}
        dispatch={dispatch}
      />
      <div className="betting-content">
        <span className="info-text">
          Please place a bet.
        </span>
        {/* <h2></h2> */}
        <TableElements
          state={state}
          dispatch={dispatch}
          betTotal={betTotal}
        />
        <span className={`deal ${betTotal > 0 ? "visible" : ""}`}>
          <PrimaryButton
            action={dealInitialHands}
            pressedKeys={pressedKeys}
            buttonKey={"5"}
            content={"Deal"}
          />
        </span>
        <div className="chip-options">
          {bankBalance >= 25 && (
            <ChipButton
              action={() => placeChip(25)}
              pressedKeys={pressedKeys}
              buttonKey={"1"}
              content={"25"}
              color="white"
            />            
          )}
          {bankBalance >= 50 && (
            <ChipButton
              action={() => placeChip(50)}
              pressedKeys={pressedKeys}
              buttonKey={"2"}
              content={"50"}
              color="blue chip"
            />
          )}
          {bankBalance >= 100 && (
            <ChipButton
              action={() => placeChip(100)}
              pressedKeys={pressedKeys}
              buttonKey={"3"}
              content={"100"}
              color="red chip"
            />
          )}
          {bankBalance >= 200 && (
            <ChipButton
              action={() => placeChip(200)}
              pressedKeys={pressedKeys}
              buttonKey={"4"}
              content={"200"}
              color="green chip"
            />
          )}
        </div>
      </div>
    </div>
  )
};

Betting.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default Betting