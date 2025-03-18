// import { useState } from "react"
// import handTotal from "../assets/handTotal"

import handTotal from "../assets/handTotal"

function useGameLogic(state, dispatch){
  function startGame() {
    dispatch({ type: "setGameState", payload: "betting" })
  }

  function toggleSound(){
    dispatch({ type: "toggleSound" })
  }

  function openInstructions(){
    dispatch({ type: "setGameState", payload: "instructions"})
  }

  function returnMainMenu(){
    dispatch({ type: "resetAll"})
    // dispatch({ type: "clearHands"})
    // dispatch({ type: "clearBet"})
    // dispatch({ type: "resetBankBalance"})
    // dispatch({ type: "changeTurn", payload: true})
    // dispatch({ type: "resetDeck"})
  }

  function placeChip(chipValue){
    if (state.bankBalance >= chipValue) {
      dispatch({ type: "placeChip", payload: chipValue})
    } else {
      console.log("Insufficient funds!")
    }
  }

  function drawCard(targetHand){
    dispatch({ type: "drawCard", payload: targetHand })
  }

  function dealInitialHands(){
    if (state.bet.length > 0){
      dispatch({ type: "setGameState", payload: "cardplay"})
      dispatch({ type: "drawCard", payload: "dealer" }) 
      setTimeout(() => {
        dispatch({ type: "drawCard", payload: "player" })
      },200)   
      setTimeout(() => {
        dispatch({ type: "drawCard", payload: "dealer" })
      },400)
      setTimeout(() => {
        dispatch({ type: "drawCard", payload: "player" })
      },600)
    } else {
      console.log("Bet is missing!")
    }
  }

  function takeDouble(){
    dispatch({ type: "doubleBet"})
    dispatch({ type: "drawCard", payload: "player" })
    dispatch({ type: "changeTurn", payload: false})
  }

  function removeLastChip(){
    if (state.bet.length > 0 && state.gameState === "betting"){
      dispatch({ type: "removeChip"})
    } else{
      console.log("Bet empty or round in progress")
    }  
  }

  function stand() {
    console.log("Player stands.")
    dispatch({ type: "changeTurn", payload: false }) // End player's turn
    setTimeout(() => dealerTurn(), 500); // Start dealer's turn after a short delay
  }

  // TÄÄ TOIMII
  async function dealerTurn() {
    let dealerTotal = handTotal(state.dealerHand) // Initial dealer's total
    let deckCopy = [...state.deck] // Create a copy of the deck
    let drawnCards = [] // Array to keep track of drawn cards
    console.log("Starting dealer turn, dealer's total:", dealerTotal)
  
    // Dealer must draw cards at 16 (or less)
    while (dealerTotal < 17) {
      console.log("Dealer's total is less than 17. Drawing card...");
      const drawnCard = deckCopy.pop() // Draw the card locally
      drawnCards.push(drawnCard) // Add the card to drawnCards

      // Send the action to reducer
      dispatch({ type: "drawCard", payload: "dealer" })
  
      // Wait for the animation to run
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Re-calculate dealer's total
      dealerTotal = handTotal([...state.dealerHand, ...drawnCards])
      console.log("Dealer's new total:", dealerTotal)
      console.log("Drawn cards:", drawnCards)
    }

    // Log the end result
    console.log("Dealer stands at total:", dealerTotal);
    //TODO roundOver
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
    stand,
    dealerTurn
  })
};

export default useGameLogic