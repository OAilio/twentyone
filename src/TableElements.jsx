import PropTypes from "prop-types"
import "../styles/tableElements.scss"

function TableElements({ betTotal, gameState }){
  return(
    <div className="table-elements">
      <span className="dealer-rules">Dealer must draw on 16 and stand on 17 </span>
      <hr className="table-line"></hr>
      <span className="table-circle"></span>
      <span className={`remove ${betTotal <= 0 || gameState !== "betting" ? "" : "visible"}`}>Remove: click | 6</span>
      <div className="bet-amount">
        <span className="text">Bet:</span> 
        <span className="amount">{betTotal}</span>
      </div>         
    </div>
  )
}

TableElements.propTypes = {
  betTotal: PropTypes.number.isRequired,
  gameState: PropTypes.string.isRequired
}

export default TableElements