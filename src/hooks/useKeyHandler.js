import { useEffect } from "react";
import useGameLogic from "./useGameLogic";

function useKeyHandler(gameState, setGameState, soundState, setSoundState, setPressedKeys, bankBalance, setBankBalance, bet, setBet){
  const { startGame, toggleSound, returnMainMenu, placeChip, openInstructions, dealInitialHands, removeLastChip } = useGameLogic(setGameState, soundState, setSoundState, bankBalance, setBankBalance, bet, setBet,);

  useEffect(() => {
    const handleKeyPress = (event) => {
      setPressedKeys((previousKeys) =>
        previousKeys.includes(event.key) ? previousKeys : [...previousKeys, event.key]
      )
    }

    const handleKeyRelease = (event) => {
      setPressedKeys((previousKeys) => 
        previousKeys.filter(key => key !== event.key)
      )

      if (event.key === "Escape" && gameState !== "menu") {
        returnMainMenu()
      }

      switch (gameState) {
      case "menu":
        switch (event.key) {
        case ("5"):
          startGame()
          break
        case ("7"):
          openInstructions()
          break
        case ("8"):
          toggleSound()
          break       
        default:
          break
        }
        break
      
      case "betting":
        switch (event.key) {
        case "1":
          if (bankBalance >= 25) placeChip(25)
          break
        case "2":
          if (bankBalance >= 50) placeChip(50)
          break
        case "3":
          if (bankBalance >= 100) placeChip(100)
          break
        case "4":
          if (bankBalance >= 200) placeChip(200)
          break
        case "5":
          if (bet.length > 0) dealInitialHands()
          break
        case "6":
          if (bet.length > 0) removeLastChip()
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    window.addEventListener("keyup", handleKeyRelease)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
      window.removeEventListener("keyup", handleKeyRelease)
    };
  },[gameState, setGameState, setPressedKeys, startGame, returnMainMenu, bet, placeChip, bankBalance, openInstructions, dealInitialHands, removeLastChip, toggleSound])
}

export default useKeyHandler;