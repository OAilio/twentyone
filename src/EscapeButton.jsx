import PropTypes from "prop-types";
import useGameLogic from "./hooks/useGameLogic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import "../styles/buttons.scss"

function EscapeButton({ pressedKeys, setGameState }) {
  const { returnMainMenu } = useGameLogic(setGameState);

  return (
    <button onClick={() => returnMainMenu()} className={`escape-button ${pressedKeys.includes("Escape") ? "keydown" : ""}`}>
      <FontAwesomeIcon icon={faArrowRightToBracket} flip="horizontal" className="icon"/>
      <span>Esc</span>
    </button>	
  )
}

EscapeButton.propTypes = {
  setGameState: PropTypes.func.isRequired,
  pressedKeys: PropTypes.array.isRequired,
}

export default EscapeButton