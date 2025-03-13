/* eslint-disable no-case-declarations */
import { shuffledDeck } from "../assets/CardDeck"

export const initialState = {
  gameState: "menu",
  soundState: true,
  pressedKeys: [],
  bankBalance: 1000,
  bet: [],
  dealerHand: [],
  playerHand: [],
  deck: shuffledDeck
}

export function reducer(state, action) {
  switch(action.type){
    case 'keyPress':
      return{
        ...state,
        pressedKeys: state.pressedKeys.includes(action.payload)
        ? state.pressedKeys : [...state.pressedKeys, action.payload]
      }

    case 'keyRelease':
      return{
        ...state,
        pressedKeys: state.pressedKeys.filter((key) => key !== action.payload)
      }
      
    case 'setGameState':
      return { ...state, gameState: action.payload }

    case 'toggleSound':
      return { ...state, soundState: !state.soundState }

    case 'placeChip':
      return {
        ...state, 
        bet: [...state.bet, action.payload],
        bankBalance: state.bankBalance-action.payload
      }

    case 'removeChip':
      return {
        ...state,
        bankBalance: state.bankBalance+state.bet[state.bet.length-1],
        bet: state.bet.slice(0,-1)
      }

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
        dealerHand: [...state.dealerHand, drawnCard]
      }

    case 'clearBet':
      return {...state, bet: []}

    case 'clearHands':
      return {...state, playerHand: [], dealerHand: []}

    case 'resetBankBalance':
      return {...state, bankBalance: 1000}
    
      default:
        return state
  }
}