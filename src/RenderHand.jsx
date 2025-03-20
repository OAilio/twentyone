import PropTypes from "prop-types"
import "../styles/cards.scss"

function RenderHand({ hand, owner, state }){
  const { playerTurn } = state
  // ${playerTurn && owner === "dealer" && index === 1 ? "backside" : ""}
  // ${!playerTurn && owner === "dealer" && index === 1 ? "visible" : ""}
  return (
    <div className={`hand ${owner}`}>
      {hand.map((card, index) => (
        <div 
        className={`card ${owner} 
          ${card.suit === '♥' || card.suit === '♦' ? "red" : ""}
          ${playerTurn && owner === "dealer" && index === 1 ? "backside" : ""}
          ${!playerTurn && owner === "dealer" && index === 1 ? "visible" : ""}
          `}
          key={`${card.suit}-${card.rank}`}>
            <div className="top-left-corner">
              <span className="rank">{card.rank}</span>
              <span className="suit">{card.suit}</span>
            </div>
            <span className="middle-suit">{card.suit}</span>
            <div className="bottom-right-corner">
              <span className="rank">{card.rank}</span>
              <span className="suit">{card.suit}</span>
            </div>            
          </div>        
      ))}
    </div>  
  )
}

RenderHand.propTypes = {
  hand: PropTypes.array.isRequired,
  owner: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired
}

export default RenderHand