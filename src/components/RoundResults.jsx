import PropTypes from "prop-types";
import useGameLogic from "../hooks/useGameLogic";
import "../../styles/resultsPopUp.scss"

function RoundResults({ state, dispatch, betTotal }){
  const { result } = state
  const { dismissResult } = useGameLogic(state, dispatch)
  const resultOptions = 
    {
      "dealerBust": ["Dealer bust!", `You win ${betTotal*2}`, "win"],
      "playerBust": ["Bust!", `You lost ${betTotal}`, "loss"],
      "player21": ["Twentyone!", `You win ${betTotal*2}`, "win"],
      "dealer21": ["Dealer 21!", `You lost ${betTotal}`, "loss"],
      "dealerWin": ["Dealer wins!", `You lost ${betTotal}`, "loss"],
      "playerWin": ["You win!",`You win ${betTotal*2}`, "win"],
      "push": ["Push!", "Bet is returned.", ""]
    }

  if (result === null){return null}

  return (
    <div className="full-width-bg" onClick={() => dismissResult()}>
      <div className={`result-container ${resultOptions[result][2]}`}> 
        <span className="result-header">{resultOptions[result][0]}</span>
        <span className="result-bet">{resultOptions[result][1]}</span>
        <span className="result-continue">Click anywhere / any key to continue</span>
      </div>
    </div>

  )
}

RoundResults.propTypes = {
  betTotal: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default RoundResults