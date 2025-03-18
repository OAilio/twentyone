import { useEffect } from "react";
import useGameLogic from "./useGameLogic";

function useKeyHandler(state, dispatch){
  const { gameState, bankBalance, bet} = state
  const { 
    startGame, 
    toggleSound, 
    returnMainMenu, 
    placeChip, 
    openInstructions, 
    dealInitialHands, 
    removeLastChip, 
    drawCard,
    takeDouble,
    stand
  } = useGameLogic(state, dispatch);

  useEffect(() => {
    const handleKeyPress = (event) => {
      dispatch({ type: "keyPress", payload: event.key})
    }

    const handleKeyRelease = (event) => {
      dispatch({ type: "keyRelease", payload: event.key})

      if (event.key === "Escape" && gameState !== "menu") {
        returnMainMenu()
      }

      switch (gameState) {
        // Menu actions
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
        
        // Betting actions
        case "betting":
          switch (event.key) {
            case "1":
              placeChip(25)
              break
            case "2":
              placeChip(50)
              break
            case "3":
              placeChip(100)
              break
            case "4":
              placeChip(200)
              break
            case "5":
              dealInitialHands()
              break
            case "6":
              removeLastChip()
              break
            }
            break

        // Gameplay actions
        case "cardplay":
          switch (event.key) {
            // 1 for split but not implemented
            case "2":
              takeDouble()
              break
            case "3":
              stand()
              break
            case "4":
              drawCard("player")
              break
          }
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    window.addEventListener("keyup", handleKeyRelease)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
      window.removeEventListener("keyup", handleKeyRelease)
    };
  },[gameState, startGame, returnMainMenu, bet, placeChip, bankBalance, openInstructions, dealInitialHands, removeLastChip, toggleSound, drawCard, dispatch, takeDouble, stand])
}

export default useKeyHandler;