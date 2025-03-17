import PropTypes from "prop-types"
import "../styles/tableElements.scss"
import RenderChipStack from "./RenderChipStack"

function TableElements({ betTotal, state, dispatch }){
  const { gameState, } = state;
  return(
    <div className="table-elements">
      <span className="dealer-rules">Dealer must draw on 16 and stand on 17 </span>
      <hr className="table-line"></hr>
      <span className="table-circle">
        <RenderChipStack 
          state={state}
          dispatch={dispatch}
        />
      </span>
      {betTotal > 0 && gameState === "betting" && <span className="remove">Remove: click | 6</span>}
      <div className="bet-amount">
        <span className="text">Bet:</span> 
        <span className="amount">{betTotal}</span>
      </div>         
    </div>
  )
}

TableElements.propTypes = {
  betTotal: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default TableElements