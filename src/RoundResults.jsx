function RoundResults({ result }){
  if (!result){return null}
  return (
    <div className={`result-container ${type}`}>
      <span>Player wins!</span>
      <span>You won {betTotal}</span>
      <span>Click anywhere / any key to continue</span>
    </div>
  )
}