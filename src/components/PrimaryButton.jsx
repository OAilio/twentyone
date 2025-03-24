import PropTypes from "prop-types";
import "../../styles/buttons.scss"

function PrimaryButton({ action, pressedKeys, buttonKey, content }) {
  return (
    <button onClick={action} className={`primary-button ${pressedKeys.includes(buttonKey) ? "keydown" : ""}`}>
      <span className="key">{buttonKey}</span>
      <span>{content}</span>
    </button>		
  )
}

PrimaryButton.propTypes = {
  action: PropTypes.func.isRequired,
  pressedKeys: PropTypes.array.isRequired,
  buttonKey: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
}

export default PrimaryButton