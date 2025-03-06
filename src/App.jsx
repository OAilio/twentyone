import { useState } from "react";
import useKeyHandler from "./hooks/useKeyHandler";
import useGameLogic from "./hooks/useGameLogic";
import BottomPanel from "./BottomPanel";
import MainMenu from "./MainMenu";
import Instructions from "./Instructions";
import Game from "./Game";
import "../styles/_shared.scss"

function App() {
  const [gameState, setGameState] = useState("menu")
  const [pressedKeys, setPressedKeys] = useState([])
  const [bankBalance, setBankBalance] = useState(1000)
  const [bet, setBet] = useState([])
  const [dealerHand, setDealerHand] = useState({})
  const [playerHand, setPlayerHand] = useState({})

  // Use key press hook
  useKeyHandler(gameState, setGameState, setPressedKeys, bankBalance, setBankBalance, bet, setBet, dealerHand, setDealerHand, playerHand, setPlayerHand)
  // console.log("Pressed keys:",pressedKeys)
  console.log("Gamestate:",gameState)

  useGameLogic(gameState, setGameState, bankBalance, setBankBalance, bet, setBet, dealerHand, setDealerHand, playerHand, setPlayerHand)
  return (
    <>
      <MainMenu
        gameState={gameState}
        setGameState={setGameState}
        pressedKeys={pressedKeys}
      />
      <Instructions 
        gameState={gameState}
        setGameState={setGameState}
      />
      <Game 
        gameState={gameState}
        setGameState={setGameState}
        bet={bet}
      />
      <BottomPanel
        gameState={gameState}
        bankBalance={bankBalance}
      />
    </>
  )
}

export default App;