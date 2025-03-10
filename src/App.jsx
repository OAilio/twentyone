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
  const [soundState, setSoundState] = useState(true)
  const [pressedKeys, setPressedKeys] = useState([])
  const [bankBalance, setBankBalance] = useState(1000)
  const [bet, setBet] = useState([])
  const [dealerHand, setDealerHand] = useState({})
  const [playerHand, setPlayerHand] = useState({})

  // Use key press hook
  useKeyHandler(gameState, setGameState, soundState, setSoundState, setPressedKeys, bankBalance, setBankBalance, bet, setBet, dealerHand, setDealerHand, playerHand, setPlayerHand)
  // console.log("Pressed keys:",pressedKeys)
  // console.log("Gamestate:",gameState)

  useGameLogic(gameState, setGameState, soundState, setSoundState, bankBalance, setBankBalance, bet, setBet, dealerHand, setDealerHand, playerHand, setPlayerHand)
  return (
    <>
      <MainMenu
        gameState={gameState}
        setGameState={setGameState}
        soundState={soundState}
        setSoundState={setSoundState}
        pressedKeys={pressedKeys}
      />
      <Instructions 
        gameState={gameState}
        setGameState={setGameState}
        pressedKeys={pressedKeys}
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