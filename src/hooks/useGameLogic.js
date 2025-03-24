import handTotal from "../assets/handTotal"
import click from "../assets/click.wav"
import chip from "../assets/chip.wav"
import chipRemove from "../assets/chipRemove.wav"
import cardDeal from "../assets/cardDeal.wav"
import roundWin from "../assets/roundWin.wav"
import roundLoss from "../assets/roundLoss.wav"
import roundTie from "../assets/roundTie.wav"
import { debounce } from "lodash"

function useGameLogic(state, dispatch){
  // Start game from main menu
  function startGame() {
    playSound(click)
    dispatch({ type: "setGameState", payload: "betting" })
  }

  // Toggle sound on|off
  function toggleSound(){
    dispatch({ type: "toggleSound" })

    // play a sample sound when sound is turned on
    // (If sound was off when function started execution)
    if (!state.soundState) {
      new Audio(chip).play()
    }
  }

  function playSound(sound) {
    if (state.soundState) {
      new Audio(sound).play()
    }
}

  // Open intructions page
  function openInstructions(){
    playSound(click)
    dispatch({ type: "setGameState", payload: "instructions"})
  }

  // Return to main menu, resetting everything
  // TODO confirmation module?
  function returnMainMenu(){
    playSound(click)
    dispatch({ type: "resetAll"})
  }

  // Placing a chip in betting
  function placeChip(chipValue){
    //Chip value cannot exceed bankBalance
    if (state.bankBalance >= chipValue) {
      dispatch({ type: "placeChip", payload: chipValue})
      playSound(chip)
    } else {
      console.log("Insufficient funds!")
    }
  }

  // Draw one card to the target hand
  // This was meant to be a re-usable function
  // for all drawCard operations but
  // JS is being JS so it has become tricky
  const drawCard = debounce((targetHand) => {
    // Local deck copy to keep track independent of state updates
    const localDeck = [...state.deck]

    // Add the card to local deck
    const drawnCard = localDeck.pop()

    // Calculate players hand total
    let totalAfterDraw = handTotal([...state.playerHand, drawnCard])
    console.log("total:",totalAfterDraw)

    // update state (also "play animation")
    dispatch({ type: "drawCard", payload: targetHand })
    playSound(cardDeal)
    
    // If player exceeds 21, trigger round over
    if (totalAfterDraw > 21 && state.playerTurn) {
      console.log("Player bust.")
      roundOverLogic(totalAfterDraw)
    }

  }, 300) // Debounce 300ms to stop card spam

  // Deal two cards each
  function dealInitialHands(){
    // Block operation if no bet
    if (state.bet.length <= 0) { console.log("Bet is missing!") }

    else {
      // Local deck copy to keep track independent of state updates
      const localDeck = [...state.deck]
      const localPlayerHand = []
      const localDealerHand = []

      localDealerHand.push(localDeck.pop())
      localPlayerHand.push(localDeck.pop())
      localDealerHand.push(localDeck.pop())
      localPlayerHand.push(localDeck.pop())

      dispatch({ type: "setGameState", payload: "cardplay"})
      // Dealer first because of visual outlook.
      dispatch({ type: "drawCard", payload: "dealer" })
      dispatch({ type: "drawCard", payload: "player" })
      playSound(cardDeal)
      setTimeout(() => {
        playSound(cardDeal)
      },300)  
      setTimeout(() => {
        dispatch({ type: "drawCard", payload: "dealer" })
        playSound(cardDeal)
      },600)
      setTimeout(() => {
        dispatch({ type: "drawCard", payload: "player" })
        playSound(cardDeal)
      },900)

      console.log("Player's initial hand:", localPlayerHand)
      // console.log("Dealer's initial hand:", localDealerHand)
      let player21 = false
      let dealer21 = false

      setTimeout(() => {
        if (handTotal(localDealerHand) === 21){
          dealer21 = true
        }
        if (handTotal(localPlayerHand) === 21){
          player21 = true
          dispatch({ type: "changeTurn", payload: false })
          setTimeout(() => dealerTurn(localDeck, localPlayerHand, localDealerHand, player21, dealer21), 1000)
        }        
      }, 2000)
    }
  }

  function takeDouble(){
    if (state.playerHand.length > 2){
      console.log("Double can be only done with the initial two cards.")
      return null
    }
    const localDeck = [...state.deck]
    const drawnCard = localDeck.pop()
    console.log("Local deck no longer has", drawnCard)

    dispatch({ type: "doubleBet"})
    playSound(chip)
    setTimeout(() => {
      dispatch({ type: "drawCard", payload: "player" })
      playSound(cardDeal)
    },300)
    setTimeout(() => {
      dispatch({ type: "changeTurn", payload: false})
    },300)

    let totalAfterDraw = handTotal([...state.playerHand, drawnCard])

    if (totalAfterDraw > 21 && state.playerTurn) {
      roundOverLogic(totalAfterDraw)
    } else {
      setTimeout(() => dealerTurn(localDeck), 1000)
    }    
  }

  function removeLastChip(){
    if (state.bet.length > 0 && state.gameState === "betting"){
      dispatch({ type: "removeChip"})
      playSound(chipRemove)
    } else{
      console.log("Bet empty or round in progress")
    }  
  }

  function stand() {
    const localDeck = [...state.deck]
    console.log("Player stands.")
    playSound(cardDeal)
    dispatch({ type: "changeTurn", payload: false }) // End player's turn
    setTimeout(() => dealerTurn(localDeck), 500) // Start dealer's turn after a short delay
  }

  async function dealerTurn(localDeck, localPlayerHand, localDealerHand, player21, dealer21) {
    console.log("state total for dealer:",handTotal(state.dealerHand))
    console.log("local total for dealer:",handTotal(localDealerHand))
    // Initial dealer's total
    let preTurnDealerHand = state.dealerHand.length > 0 ? state.dealerHand : localDealerHand
    let dealerTotal = handTotal(state.dealerHand) || handTotal(localDealerHand)

    let drawnCards = [] // Array to keep track of drawn cards
    console.log("Starting dealer turn, dealer's total:", dealerTotal)

    // Wait for the card flip animation to run
    await new Promise(resolve => setTimeout(resolve, 1000))

    console.log("Existing dealer hand:",preTurnDealerHand)
  
    // Dealer must draw cards at 16 (or less)
    while (dealerTotal < 17) {
      console.log("---Dealer loop starts-------------")
      console.log("Dealer's total is less than 17 at:", dealerTotal,"Drawing card...")
      const drawnCard = localDeck.pop() // Draw the card locally
      drawnCards.push(drawnCard) // Add the card to drawnCards

      // Send the action to reducer
      // Re-using the drawCard became tricky for some reason
      dispatch({ type: "drawCard", payload: "dealer" })
      playSound(cardDeal)
  
      // Wait for the card-appear animation to run
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Re-calculate dealer's total
      console.log("New card to total:",drawnCards[drawnCards.length - 1])
      dealerTotal = handTotal([...preTurnDealerHand, ...drawnCards])
      console.log("Dealer's new total:", dealerTotal)
      console.log("Drawn cards:", drawnCards.length)
    }

    // Log the end result
    console.log("Dealer stands at total:", dealerTotal)

    // Initial dealer's total if not given as an argument
    let playerTotal = handTotal(state.playerHand) || handTotal(localPlayerHand)

    console.log("Player21",player21)
    console.log("Dealer21",dealer21)

    // Hand results to round over logic
    roundOverLogic(playerTotal, dealerTotal, player21, dealer21)
  }

  async function roundOverLogic(playerTotal, dealerTotal, player21, dealer21){
    dispatch({ type: "changeTurn", payload: false })

    // Wait for the animation to run
    await new Promise(resolve => setTimeout(resolve, 1500))

    console.log("Player final total:",playerTotal)
    console.log("Dealer final total:",dealerTotal)

    let result
    let payout = false
    
    // Determine round result
    if (player21 && dealer21) {
      result = "push"
      console.log("Double blackjack")
      dispatch({ type: "returnBet" })
      playSound(roundTie)

    } else if (dealer21 && playerTotal === 21){
      result = "dealer21"
      playSound(roundLoss)

    } else if (player21){
      result = "player21"
      payout = true
      playSound(roundWin)

    } else if (playerTotal > 21) {
      result = "playerBust"
      playSound(roundLoss)

    } else if (dealerTotal > 21){
      result = "dealerBust"
      payout = true
      playSound(roundWin)

    } else if (playerTotal > dealerTotal){
      result = "playerWin"
      payout = true
      playSound(roundWin)

    } else if (playerTotal === dealerTotal){
      result = "push"
      dispatch({ type: "returnBet" })
      playSound(roundTie)

    } else {
      result = "dealerWin"
      playSound(roundLoss)
    }

    dispatch({ type: "setResult", payload: result })

    if (payout) {
      dispatch({ type: "payOutWins" })
    }
  }

  function dismissResult(){
    // playSound(click)
    dispatch({ type: "resetRound" })
    // TODO pankki tyhjä
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
    dealerTurn,
    roundOverLogic,
    dismissResult
  })
}

export default useGameLogic