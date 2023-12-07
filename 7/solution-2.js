const input = require('./input').trim();

// input = `
// 32T3K 765
// T55J5 684
// KK677 28
// KTJJT 220
// QQQJA 483
// `.trim();

const inputLines = input.trim().split('\n');

let cards = [
  'A', 'K', 'Q', 'T', 9, 8, 7, 6, 5, 4, 3, 2, 'J'
];

const cardsStrength = cards.reduce((map, card, i) => {
  map[card.toString()] = cards.length - i;

  return map;
}, {});

// console.log('cardsStrength', cardsStrength);

const getTypeStrength = (cards) => {
  const unique = Array.from(new Set(cards));
  const uniqueNoJ = unique.filter(u => u !== 'J');

  // Five of a kind
  const fiveOfAKind = unique.length === 1 || (unique.length === 2 && unique.includes('J'));
  if (fiveOfAKind) {
    console.log(cards.join(), 'five of a kind');
    return 7;
  }

  // Four of a kind
  const fourOfAKind =
    cards.some(card => cards.filter(c => [card, 'J'].includes(c)).length === 4)
  if (fourOfAKind) {
    console.log(cards.join(), 'four of a kind');
    return 6;
  }

  // Full house
  const fullHouse = !unique.includes('J')
    ? (
      (cards.filter(card => card === uniqueNoJ[0]).length === 3 && cards.filter(card => card === uniqueNoJ[1]).length === 2) ||
      (cards.filter(card => card === uniqueNoJ[0]).length === 2 && cards.filter(card => card === uniqueNoJ[1]).length === 3)
    )
    : uniqueNoJ.length === 2 && unique.length === 3;

  if (fullHouse) {
    console.log(cards.join(), 'full house');
    return 5;
  }

  // Three of a kind
  const threeOfAKind =
    cards.filter(card => [cards[0], 'J'].includes(card)).length === 3 ||
    cards.filter(card => [cards[1], 'J'].includes(card)).length === 3 ||
    cards.filter(card => [cards[2], 'J'].includes(card)).length === 3 ||
    cards.filter(card => [cards[3], 'J'].includes(card)).length === 3 ||
    cards.filter(card => [cards[4], 'J'].includes(card)).length === 3
  if (threeOfAKind) {
    console.log(cards.join(), 'three of a kind');
    return 4;
  }

  // Two pair (do not consider J at all as it will always advance itself to three of a kind)
  const twoPair =
    (cards.filter(card => card === uniqueNoJ[0]).length === 2 && cards.filter(card => card === uniqueNoJ[1]).length === 2) ||
    (cards.filter(card => card === uniqueNoJ[0]).length === 2 && cards.filter(card => card === uniqueNoJ[2]).length === 2) ||
    (cards.filter(card => card === uniqueNoJ[1]).length === 2 && cards.filter(card => card === uniqueNoJ[2]).length === 2);
  if (twoPair) {
    console.log(cards.join(), 'two pairs');
    return 3;
  }

  // One pair
  const onePair = unique.some(u => cards.filter(c => c === u).length === 2) || uniqueNoJ.length === 4;
  if (onePair) {
    return 2;
  }

  // High card
  const highCard = uniqueNoJ.length === 5;
  if (highCard) {
    console.log(cards.join(), 'high card');
    return 1;
  }

  return 0;
}

// console.log('7', getTypeStrength('AAAAA'.split('')));
// console.log('6', getTypeStrength('AA8AA'.split('')));
// console.log('6', getTypeStrength('QQQJA'.split('')));
// console.log('5', getTypeStrength('23332'.split('')));
// console.log('5', getTypeStrength('2233J'.split('')));
// console.log('5', getTypeStrength('233J2'.split('')));
// console.log('5', getTypeStrength('J3232'.split('')));
// console.log('4', getTypeStrength('TTJ98'.split('')));
// console.log('4', getTypeStrength('JTJ98'.split('')));
// console.log('3', getTypeStrength('23432'.split('')));
// console.log('2', getTypeStrength('A23A4'.split('')));
// console.log('2', getTypeStrength('A23J4'.split('')));
// console.log('2', getTypeStrength('J23A4'.split('')));
// console.log('1', getTypeStrength('23456'.split('')));

const hands = inputLines.reduce((total, hand) => {
  const [cards, bid] = hand.split(' ').filter(e => !!e.trim())

  total.push({
    cards: cards.split(''),
    bid,
  });

  return total;
}, []);

const getStrongerGibberish = (hand1, hand2) => {
  for (let i = 0; i < hand1.cards.length; i++) {
    const hand1card = hand1.cards[i];
    const hand2card = hand2.cards[i];

    if (cardsStrength[hand1card] > cardsStrength[hand2card]) {
      return -1;
    }
    if (cardsStrength[hand1card] < cardsStrength[hand2card]) {
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

// console.log('orderedHands', orderedHands.map(o => o.cards.join('')));

const result = orderedHands.reduce((sum, hand, i) => {
  const rank = orderedHands.length - i;

  return sum + (rank * hand.bid);
}, 0)

console.log('result', result);
// console.log(result === 5905);

// KTJJT
// QQQJA
// T55J5
// KK677
// 32T3K
