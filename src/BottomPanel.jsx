import PropTypes from "prop-types";
import "../styles/bottomPanel.scss"

function BottomPanel({ gameState, bankBalance }){
  return (
    <div className="panel-bg">
      <div className="content">
        {gameState === "menu" || gameState === "instructions" ?
          (<p>Made by Okko Ailio</p>) : (<p>Bank: {bankBalance}</p>)
        }                
      </div>
    </div>
  )
}

BottomPanel.propTypes = {
  gameState: PropTypes.string.isRequired,
  bankBalance: PropTypes.number.isRequired
}

export default BottomPanel;