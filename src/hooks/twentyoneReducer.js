/* eslint-disable no-case-declarations */
import { shuffledDeck } from "../assets/CardDeck"
import getRandomPosition from "../assets/getRandomPosition"

export const initialState = {
  gameState: "menu",
  playerTurn: true,
  soundState: true,
  pressedKeys: [],
  bankBalance: 1000,
  bet: [],
  dealerHand: [],
  playerHand: [],
  deck: shuffledDeck(),
  result: null
}

export function reducer(state, action) {
  switch(action.type){

    // Add key to pressed keys
    case 'keyPress':
      return{
        ...state,
        pressedKeys: state.pressedKeys.includes(action.payload)
        ? state.pressedKeys : [...state.pressedKeys, action.payload]
      }
    
    // Remmove key from pressed keys
    case 'keyRelease':
      return{
        ...state,
        pressedKeys: state.pressedKeys.filter((key) => key !== action.payload)
      }

    // Switch gameState
    case 'setGameState':
      return { ...state, gameState: action.payload }
    
    // Toggle sound on|off
    case 'toggleSound':
      return { ...state, soundState: !state.soundState }
    
    // Bet a chip of given value and give it coordinates to set in the bet circle
    case 'placeChip':
      return {
        ...state, 
        bet: [...state.bet, {value: action.payload, ...getRandomPosition()}],
        bankBalance: state.bankBalance - action.payload
      }
    
    // Remove chip from bet stack
    case 'removeChip':
      const lastChipValue = state.bet[state.bet.length-1].value

      return {
        ...state,
        bankBalance: state.bankBalance + lastChipValue,
        bet: state.bet.slice(0,-1)
      }
    
    // Draw card
    case 'drawCard':
      const newDeck = [...state.deck]
      const drawnCard = newDeck.pop()

      return action.payload === "player"
      ? {
        ...state,
        deck: newDeck,
        playerHand: [...state.playerHand, drawnCard]
      }
      : {
        ...state,
        deck: newDeck,
        dealerHand: [...state.dealerHand, drawnCard],
      }
    
    // Double-action
    case 'doubleBet':
      const preDoubleBetTotal = state.bet.reduce((total, chip) => total + chip.value, 0)
      return {
        ...state, 
        bet: [...state.bet, ...state.bet], // Double existing bet array
        bankBalance: state.bankBalance - preDoubleBetTotal // Subtract existing bet again from total
      }
    
    // Set the round result for pop-up
    case "setResult":
      return {...state, result: action.payload}
    
    // Pay player possible winnings
    case 'payOutWins':
      const betDoubled = state.bet.reduce((total, chip) => total + chip.value, 0)*2
      return {...state, bankBalance: state.bankBalance + betDoubled}
    
    // Return bet as it is (push)
    case 'returnBet':
      const betTotal = state.bet.reduce((total, chip) => total + chip.value, 0)
      return {...state, bankBalance: state.bankBalance+betTotal}
    
    // Disable player options
    case 'changeTurn':
      return {...state, playerTurn: action.payload}
    
    // Reset bank balance to keep playing
    case 'resetBankBalance':
      return {...state, bankBalance: 1000}
    
    // Start new round
    case 'resetRound':
      return {...initialState, soundState: state.soundState, bankBalance: state.bankBalance, gameState: "betting", deck: shuffledDeck()}
    
    // Menu exit
    case 'resetAll':
      return {...initialState, soundState: state.soundState, deck: shuffledDeck()} // Still reshuffle deck tho

    default:
      return state
  }
}