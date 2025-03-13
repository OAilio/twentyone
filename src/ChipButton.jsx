import PropTypes from "prop-types";
import "../styles/buttons.scss"

function ChipButton({ action, pressedKeys, buttonKey, content, color }) {
  return (
    <div className="chip-button-container">
      <span className="key">{buttonKey}</span>
      <button onClick={action} className={`chip-button ${color} ${pressedKeys.includes(buttonKey) ? "keydown" : ""}`}>
        <span className="icon">{content}</span>
      </button>
    </div>    
  )
}

ChipButton.propTypes = {
  action: PropTypes.func.isRequired,
  pressedKeys: PropTypes.array.isRequired,
  buttonKey: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired
}

export default ChipButton;