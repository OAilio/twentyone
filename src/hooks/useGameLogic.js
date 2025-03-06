/* eslint-disable no-unused-vars */
function useGameLogic(setGameState, bankBalance, setBankBalance, bet, setBet, dealerHand, setDealerHand, playerHand, setPlayerHand){
  function startGame(){
    setGameState("betting")
    console.log("Starting new game")
  }

  function openInstructions(){
    setGameState("instructions")
    console.log("Open instructions")
  }

  function startNewRound(){
    setGameState("betting")
    setDealerHand({})
    setPlayerHand({})
    setBet({})
    console.log("Starting new game")
  }

  function returnMainMenu(){
    console.log("Returning to main menu")
    console.log("Bet array:",bet)
    setGameState("menu")
    console.log("Returning to main menu")
    console.log("Bet array:",bet)
  }

  function placeChip(chipValue){
    setBet((currentBet) => [...currentBet, chipValue])
    setBankBalance(bankBalance-chipValue)
    console.log("Placed bet:", chipValue)
    console.log("Current bet:", bet.reduce((total, chip) => total + chip, 0))
    console.log("Bet array:",bet)
  }

  function dealInitialHands(){
    console.log("Hands dealt!")
  }

  function removeLastChip(){
    setBankBalance(bankBalance+bet[bet.length-1])
    setBet((currentBet) => currentBet.slice(0,-1))
  }
  return ({ startGame, openInstructions, returnMainMenu, placeChip, dealInitialHands, removeLastChip })
};

export default useGameLogic