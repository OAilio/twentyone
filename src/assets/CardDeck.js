const suits = {
  hearts: '/heart.webp',
  clubs: '/club.webp',
  diamonds: '/diamond.webp',
  spades: '/spade.webp',
};

// const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10','J','Q', 'K', 'A']
// TURN THIS ^^^ ON
// small values for debugging
const ranks = ['2', '3', '4', '5', '6', '7']
// const ranks = ['K', 'A']

const combinations = Object.entries(suits).flatMap(([suit, image]) =>
  ranks.map((rank) => ({ suit, rank, image }))
)

const shuffledDeck = () => {
  const deck = combinations
  for (let i = 0; i < deck.length; i++) {
    // picks the random number between 0 and length of the deck
    let shuffle = Math.floor(Math.random() * (deck.length));
    
    // swap the current with a random position
    [deck[i], deck[shuffle]] = [deck[shuffle], deck[i]];
  }

  return deck
}

export { shuffledDeck }