const input = require('./input').trim();

// const input = `
// 32T3K 765
// T55J5 684
// KK677 28
// KTJJT 220
// QQQJA 483
// `.trim();

const inputLines = input.trim().split('\n');

let cards = [
  'A', 'K', 'Q', 'J', 'T', 9, 8, 7, 6, 5, 4, 3, 2
];
// cards = cards.map((card, i) => ({
//   card: card.toString(),
//   strength: cards.length - i
// }));
const cardsStrength = cards.reduce((map, card, i) => {
  map[card.toString()] = cards.length - i;

  return map;
}, {});

// console.log('cardsStrength', cardsStrength);

const getTypeStrength = (cards) => {
  const unique = Array.from(new Set(cards));
  // console.log('unique', unique);

  // Five of a kind
  const fiveOfAKind = unique.length === 1;
  if (fiveOfAKind) {
    return 7;
  }

  // Four of a kind
  const fourOfAKind =
    cards.filter(card => card === cards[0]).length === 4 ||
    cards.filter(card => card === cards[1]).length === 4;
  if (fourOfAKind) {
    return 6;
  }

  // Full house
  const fullHouse =
    (cards.filter(card => card === unique[0]).length === 3 && cards.filter(card => card === unique[1]).length === 2) ||
    (cards.filter(card => card === unique[0]).length === 2 && cards.filter(card => card === unique[1]).length === 3);
  if (fullHouse) {
    return 5;
  }

  // Three of a kind
  const threeOfAKind =
    cards.filter(card => card === cards[0]).length === 3 ||
    cards.filter(card => card === cards[1]).length === 3 ||
    cards.filter(card => card === cards[2]).length === 3;
  if (threeOfAKind) {
    return 4;
  }

  // Two pair
  const twoPair = unique.length === 3 &&
    (cards.filter(card => card === unique[0]).length === 2 && cards.filter(card => card === unique[1]).length === 2) ||
    (cards.filter(card => card === unique[0]).length === 2 && cards.filter(card => card === unique[2]).length === 2) ||
    (cards.filter(card => card === unique[1]).length === 2 && cards.filter(card => card === unique[2]).length === 2);
  if (twoPair) {
    return 3;
  }

  // One pair
  const onePair = unique.some(u => cards.filter(c => c === u).length === 2);
  if (onePair) {
    return 2;
  }

  // High card
  const highCard = unique.length === 5;
  if (highCard) {
    return 1;
  }

  return 0;
}

// console.log('7', getTypeStrength('AAAAA'.split('')));
// console.log('6', getTypeStrength('AA8AA'.split('')));
// console.log('5', getTypeStrength('23332'.split('')));
// console.log('4', getTypeStrength('TTT98'.split('')));
// console.log('3', getTypeStrength('23432'.split('')));
// console.log('2', getTypeStrength('A23A4'.split('')));
// console.log('1', getTypeStrength('23456'.split('')));

const hands = inputLines.reduce((total, hand) => {
  const [cards, bid] = hand.split(' ').filter(e => !!e.trim())

  total.push({
    cards: cards.split(''),
    bid,
  });

  return total;
}, []);

// console.log('hands', hands);

const getStrongerGibberish = (hand1, hand2) => {
  for (let i = 0; i < hand1.cards.length; i++) {
    const hand1card = hand1.cards[i];
    const hand2card = hand2.cards[i];

    // console.log('???', hand1card, hand2card, cardsStrength[hand1card], cardsStrength[hand2card]);

    if (cardsStrength[hand1card] > cardsStrength[hand2card]) {
      // console.log(hand1card, hand2card, cardsStrength[hand1card], '>', cardsStrength[hand2card]);
      return -1;
    }
    if (cardsStrength[hand1card] < cardsStrength[hand2card]) {
      // console.log(hand1card, hand2card, cardsStrength[hand1card], '<', cardsStrength[hand2card]);
      return 1;
    }
  }

  return 0;
}

const orderedHands = hands.sort((hand1, hand2) => {
  if (getTypeStrength(hand1.cards) > getTypeStrength(hand2.cards)) {
    return -1;
  }
  if (getTypeStrength(hand1.cards) < getTypeStrength(hand2.cards)) {
    return 1;
  }

  return getStrongerGibberish(hand1, hand2);
});

console.log('orderedHands', orderedHands.map(o => o.cards.join('')));
console.log('orderedHands', );

const result = orderedHands.reduce((sum, hand, i) => {
  const rank = orderedHands.length - i;

  return sum + (rank * hand.bid);
}, 0)

console.log('result', result);

// QQQJA
// T55J5
// KK677
// KTJJT
// 32T3K
