function useGameLogic(dispatch){
  function startGame() {
    dispatch({ type: "setGameState", payload: "betting" });
  }

  function toggleSound(){
    dispatch({ type: "toggleSound" })
  }

  function openInstructions(){
    dispatch({ type: "setGameState", payload: "instructions"})
    console.log("Open instructions")
  }

  function returnMainMenu(){
    dispatch({ type: "setGameState", payload: "menu"})
    dispatch({ type: "clearHands"})
    dispatch({ type: "clearBet"})
    dispatch({ type: "resetBankBalance"})
    dispatch({ type: "changeTurn", payload: true})
    // Reset deck
  }

  function placeChip(chipValue){
    dispatch({ type: "placeChip", payload: chipValue})
  }

  function drawCard(targetHand){
    dispatch({ type: "drawCard", payload: targetHand });
  }

  function dealInitialHands(){
    dispatch({ type: "setGameState", payload: "cardplay"})
    dispatch({ type: "drawCard", payload: "dealer" }); 
    setTimeout(() => {
      dispatch({ type: "drawCard", payload: "player" });
    },200)   
    setTimeout(() => {
      dispatch({ type: "drawCard", payload: "dealer" });
    },400)
    setTimeout(() => {
      dispatch({ type: "drawCard", payload: "player" });
    },600)
  }

  function takeDouble(){
    dispatch({ type: "doubleBet"})
    dispatch({ type: "drawCard", payload: "player" });
    dispatch({ type: "changeTurn", payload: false})
  }

  function stand(){
    dispatch({ type: "changeTurn", payload: false})
  }
    
  function removeLastChip(){
    dispatch({ type: "removeChip"})
  }
  
  return ({ 
    startGame,
    toggleSound,
    openInstructions,
    returnMainMenu,
    placeChip,
    removeLastChip,
    dealInitialHands,
    drawCard,
    takeDouble,
    stand
  })
};

export default useGameLogic