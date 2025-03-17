import PropTypes from "prop-types"
import useGameLogic from "./hooks/useGameLogic";
import "../styles/chips.scss"

const RenderChipStack = ({ state, dispatch }) => {
  const { bet, gameState } = state;
  const { removeLastChip } = useGameLogic(dispatch);
  const chipColours = {25: "white", 50: "blue", 100: "red", 200: "green"}

  return (
    <div className="chip-stack" onClick={removeLastChip}>
      {bet.map((chip, index) => {
        return (
          <button key={index} className={`chip ${chipColours[chip.value]}
            ${gameState === "betting" ? "animate" : ""}`} // Disable animation after betting state
            style={{transform: `translate(${chip.x}rem, ${chip.y}rem)`, zIndex: index}}
          >
            {chip.value}
          </button>
        );
      })}
    </div>
  );
};

RenderChipStack.propTypes = {
  betTotal: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default RenderChipStack