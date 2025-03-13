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
  }

  function placeChip(chipValue){
    dispatch({ type: "placeChip", payload: chipValue})
  }

  function drawCard(targetHand){
    dispatch({ type: "drawCard", payload: targetHand });
  }

  function dealInitialHands(){
    dispatch({ type: "setGameState", payload: "cardplay"})
    dispatch({ type: "drawCard", payload: "player" });
    dispatch({ type: "drawCard", payload: "dealer" });
    dispatch({ type: "drawCard", payload: "player" });
    dispatch({ type: "drawCard", payload: "dealer" });
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
    drawCard
  })
};

export default useGameLogic