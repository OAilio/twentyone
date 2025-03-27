import { useEffect } from "react";
import PropTypes from "prop-types";
import useGameLogic from "../hooks/useGameLogic";
import "../../styles/outOfCash.scss"

function OutOfCash({ state, dispatch }){
  const { gameState, bankBalance, bet} = state
  const { resetBankBalance } = useGameLogic(state, dispatch);

  // If player runs out of cash, this pop up will reset the bank balance 
  useEffect(() => {
    if (gameState === "betting" && bankBalance === 0 && bet.length === 0) {
      setTimeout(() => resetBankBalance(), 2500)
    }
  }, [bankBalance, bet, gameState, resetBankBalance])

  if (gameState !== "betting" || bankBalance !== 0 || bet.length !== 0) {
    return null
  }

  return (
    <div className="out-of-cash-container">
      <span className="phew">Luckily, it&apos;s only a game!</span>
      <span className="handout">Here, have another 1000.</span>
    </div>
  )
}

OutOfCash.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default OutOfCash