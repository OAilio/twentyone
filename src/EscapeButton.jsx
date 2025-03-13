import PropTypes from "prop-types";
import useGameLogic from "./hooks/useGameLogic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import "../styles/buttons.scss"

function EscapeButton({ state, dispatch }) {
  const { pressedKeys } = state;
  const { returnMainMenu } = useGameLogic(dispatch);

  return (
    <button onClick={() => returnMainMenu()} className={`escape-button ${pressedKeys.includes("Escape") ? "keydown" : ""}`}>
      <FontAwesomeIcon icon={faArrowRightToBracket} flip="horizontal" className="icon"/>
      <span>Esc</span>
    </button>	
  )
}

EscapeButton.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default EscapeButton