function RoundResults({ state, dispatch, result }){
  const { bet } = state
  const resultOptions = {"dealerBust": "Dealer bust!", "playerBust": "Bust!", "dealerWin": "Dealer wins!", "playerWin": "You win!", "push": "Push!"}
  if (!result){return null}

  return (
    <div className={`result-container ${result}`} onClick={null}>
      <span>{resultHeader}</span>
      <span>You won {betTotal}</span>
      <span>Click anywhere / any key to continue</span>
    </div>
  )
}

export default RoundResults