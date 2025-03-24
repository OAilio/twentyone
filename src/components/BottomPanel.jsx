import PropTypes from "prop-types";
import "../../styles/bottomPanel.scss"

function BottomPanel({ state }){
  const { gameState, bankBalance} = state;
  
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
  state: PropTypes.object.isRequired
}

export default BottomPanel;