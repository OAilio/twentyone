import PropTypes from "prop-types"
import "../styles/cards.scss"

function RenderHand({ hand }){
  console.log("Rendering hand:",hand)

  return (
    <div className="hand">
      {hand.map((card) => (
        <div className={`card-face-up ${card.suit === '♥' || card.suit === '♦' ? "red" : ""}`} key={`${card.suit}-${card.rank}`}>
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
  hand: PropTypes.array.isRequired
}

export default RenderHand