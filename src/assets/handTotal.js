export default function handTotal(hand){
  let value = 0
  let aceCount = 0
  const tenRanks = ['J', 'Q', 'K']

  hand.forEach(card => {
    if (tenRanks.includes(card.rank)){
      value += 10
    } else if (card.rank === 'A') {
      value += 11
      aceCount += 1
    } else {
      value += parseInt(card.rank)
    }
  });

  while (value > 21 && aceCount > 0){
    value -= 10
    aceCount -= 1
  }

  return value
}