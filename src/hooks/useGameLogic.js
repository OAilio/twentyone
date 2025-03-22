import handTotal from "../assets/handTotal"
import { debounce } from "lodash"

function useGameLogic(state, dispatch){
  // Start game from main menu
  function startGame() {
    dispatch({ type: "setGameState", payload: "betting" })
  }

  // Toggle sound on|off
  function toggleSound(){
    dispatch({ type: "toggleSound" })
  }

  // Open intructions page
  function openInstructions(){
    dispatch({ type: "setGameState", payload: "instructions"})
  }

  // Return to main menu, resetting everything
  // TODO confirmation module?
  function returnMainMenu(){
    dispatch({ type: "resetAll"})
  }

  // Placing a chip in betting
  function placeChip(chipValue){
    //Chip value cannot exceed bankBalance
    if (state.bankBalance >= chipValue) {
      dispatch({ type: "placeChip", payload: chipValue})
    } else {
      console.log("Insufficient funds!")
    }
  }
  // Draw one card to the target hand
  const drawCard = debounce((targetHand) => {
    // Local deck copy to keep track independent of state updates
    const localDeck = [...state.deck]

    // Add the card to local deck
    const drawnCard = localDeck.pop()

    // Calculate hand total
    let totalAfterDraw = handTotal([...state.playerHand, drawnCard])
    console.log("total:",totalAfterDraw)

    // update state (also "play animation")
    dispatch({ type: "drawCard", payload: targetHand })
    
    // If exceeds 21, trigger round over
    if (totalAfterDraw > 21 && state.playerTurn) {
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
      setTimeout(() => {
        dispatch({ type: "drawCard", payload: "dealer" })
      },400)
      setTimeout(() => {
        dispatch({ type: "drawCard", payload: "player" })
      },600)

      console.log("Specific drawn cards:", localPlayerHand)
      console.log("Dealer has initial hand:", localDealerHand)
      let player21 = false
      let dealer21 = false
      console.log("local deck:",localDeck)

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
    const localDeck = [...state.deck]
    const drawnCard = localDeck.pop()
    console.log("Local deck no longer has", drawnCard)

    dispatch({ type: "doubleBet"})
    dispatch({ type: "drawCard", payload: "player" })
    dispatch({ type: "changeTurn", payload: false})

    let totalAfterDraw = handTotal([...state.playerHand, drawnCard])

    if (totalAfterDraw > 21 && state.playerTurn) {
      roundOverLogic(totalAfterDraw)
    } else {
      setTimeout(() => dealerTurn(localDeck), 1000);
    }    
  }

  function removeLastChip(){
    if (state.bet.length > 0 && state.gameState === "betting"){
      dispatch({ type: "removeChip"})
    } else{
      console.log("Bet empty or round in progress")
    }  
  }

  function stand() {
    const localDeck = [...state.deck]
    console.log("Player stands.")
    dispatch({ type: "changeTurn", payload: false }) // End player's turn
    setTimeout(() => dealerTurn(localDeck), 500); // Start dealer's turn after a short delay
  }

  async function dealerTurn(localDeck, localPlayerHand, localDealerHand, player21, dealer21) {
    console.log("state total for dealer:",handTotal(state.dealerHand))
    console.log("local total for dealer:",handTotal(localDealerHand))
    // Initial dealer's total
    let preTurnDealerHand = state.dealerHand.length > 0 ? state.dealerHand : localDealerHand
    let dealerTotal = handTotal(state.dealerHand) || handTotal(localDealerHand)

    let drawnCards = [] // Array to keep track of drawn cards
    console.log("Starting dealer turn, dealer's total:", dealerTotal)
  
    // Dealer must draw cards at 16 (or less)
    while (dealerTotal < 17) {
      console.log("-------------Loop starts--------")
      console.log("Dealer's total is less than 17. Drawing card...");
      const drawnCard = localDeck.pop() // Draw the card locally
      drawnCards.push(drawnCard) // Add the card to drawnCards

      // Send the action to reducer
      dispatch({ type: "drawCard", payload: "dealer" })
  
      // Wait for the animation to run
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Re-calculate dealer's total
      console.log(preTurnDealerHand)
      dealerTotal = handTotal([...preTurnDealerHand, ...drawnCards])
      console.log("Dealer's new total:", dealerTotal)
      console.log("Drawn cards:", drawnCards.length)
    }

    // Log the end result
    console.log("Dealer stands at total:", dealerTotal);

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

    //TODO blackjackit

    if (player21 && dealer21) {
      console.log("Double blackjack")
      dispatch({ type: "setResult", payload: "push" })
      dispatch({ type: "returnBet" })
    } else if (dealer21 && playerTotal === 21){
      dispatch({ type: "setResult", payload: "dealer21" })
    } else if (player21){
      dispatch({ type: "setResult", payload: "player21" })
      dispatch({ type: "payOutWins" })
    } else if (playerTotal > 21) {
      dispatch({ type: "setResult", payload: "playerBust" })
    } else if (dealerTotal > 21){
      dispatch({ type: "setResult", payload: "dealerBust" })
    } else if (playerTotal > dealerTotal){
      dispatch({ type: "setResult", payload: "playerWin" })
      dispatch({ type: "payOutWins" })
    } else if (playerTotal === dealerTotal){
      dispatch({ type: "setResult", payload: "push" })
      dispatch({ type: "returnBet" })
    } else {
      dispatch({ type: "setResult", payload: "dealerWin" })
    }
  }

  function dismissResult(){
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
};

export default useGameLogic