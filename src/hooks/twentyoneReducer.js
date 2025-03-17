/* eslint-disable no-case-declarations */
import { shuffledDeck } from "../assets/CardDeck"
import getRandomPosition from "../assets/getRandomPosition"

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
        bet: [...state.bet, {value: action.payload, ...getRandomPosition()}],
        bankBalance: state.bankBalance - action.payload
      }

    case 'removeChip':
      if (state.bet.length === 0) return state;
      const lastChipValue = state.bet[state.bet.length-1].value

      return {
        ...state,
        bankBalance: state.bankBalance + lastChipValue,
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

    case 'doubleBet':
      const preDoubleBetTotal = state.bet.reduce((total, chip) => total + chip.value, 0)
      return {
        ...state, 
        bet: [...state.bet, ...state.bet], // Double existing bet array
        bankBalance: state.bankBalance - preDoubleBetTotal // Subtract existing bet again from total
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