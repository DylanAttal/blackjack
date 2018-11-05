let deck = []
let suits = ['spades', 'hearts', 'clubs', 'diamonds']
let cards = [
  { face: '2', value: 2 },
  { face: '3', value: 3 },
  { face: '4', value: 4 },
  { face: '5', value: 5 },
  { face: '6', value: 6 },
  { face: '7', value: 7 },
  { face: '8', value: 8 },
  { face: '9', value: 9 },
  { face: '10', value: 10 },
  { face: 'jack', value: 10 },
  { face: 'queen', value: 10 },
  { face: 'king', value: 10 },
  { face: 'ace', value: 11 }
]

for (let index = 0; index < suits.length; index++) {
  for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
    deck.push({
      face: cards[cardIndex].face,
      value: cards[cardIndex].value,
      suit: suits[index]
    })
  }
}

let playerHand = []
let dealerHand = []
let playerTotal = 0
let dealerTotal = 0
let playerTotalStay = 0
let dealerTotalStay = 0

const playerBusts = () => {
  document.querySelector('.player-display-total').textContent = 'Bust!'
  winnerDeclaration()
}

const dealerBusts = () => {
  document.querySelector('.dealer-display-total').textContent = 'Bust!'
  winnerDeclaration()
}

const winnerDeclaration = () => {
  if (playerTotalStay > 21) {
    document.querySelector('.results').textContent = 'Dealer Wins!'
  } else if (dealerTotalStay > 21) {
    document.querySelector('.results').textContent = 'Player Wins!'
  } else if (playerTotalStay > dealerTotalStay) {
    document.querySelector('.results').textContent = 'Player Wins!'
  } else if (dealerTotalStay > playerTotalStay) {
    document.querySelector('.results').textContent = 'Dealer Wins!'
  } else if (playerTotalStay === dealerTotalStay) {
    document.querySelector('.results').textContent = "It's a tie!"
  }
  document.querySelector('.hit-button').disabled = true
  document.querySelector('.stay-button').disabled = true
}

const dealCardToPlayer = () => {
  let playerHandList = document.querySelector('.player-hand')
  let card = deck.pop()
  playerHand.push(card.value)
  let newImage = document.createElement('img')
  newImage.src = `/images/cards/${card.face}_of_${card.suit}.svg`
  playerHandList.appendChild(newImage)
  let playerTotal = playerHand.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue
  }, 0)
  playerTotalStay = playerTotal
  if (playerTotal > 21) {
    playerBusts()
  } else {
    document.querySelector('.player-display-total').textContent = parseInt(
      playerTotal,
      10
    )
  }
}

const dealCardToDealer = () => {
  let dealerHandList = document.querySelector('.dealer-hand')
  let card = deck.pop()
  dealerHand.push(card.value)
  let newImage = document.createElement('img')
  newImage.src = `/images/cards/${card.face}_of_${card.suit}.svg`
  dealerHandList.appendChild(newImage)
  let dealerTotal = dealerHand.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue
  }, 0)
  dealerTotalStay = dealerTotal
  if (dealerTotal > 21) {
    dealerBusts()
  } else {
    document.querySelector('.dealer-display-total').textContent = parseInt(
      dealerTotal,
      10
    )
  }
}

const stay = () => {
  while (dealerTotalStay < 17) {
    let dealerHandList = document.querySelector('.dealer-hand')
    let card = deck.pop()
    dealerHand.push(card.value)
    let newImage = document.createElement('img')
    newImage.src = `/images/cards/${card.face}_of_${card.suit}.svg`
    dealerHandList.appendChild(newImage)
    let dealerTotal = dealerHand.reduce(function(accumulator, currentValue) {
      return accumulator + currentValue
    }, 0)
    dealerTotalStay = dealerTotal
    if (dealerTotal > 21) {
      dealerBusts()
    } else {
      document.querySelector('.dealer-display-total').textContent = parseInt(
        dealerTotal,
        10
      )
    }
  }
  if (dealerTotalStay >= 17) {
    winnerDeclaration()
  }
}

const reset = () => {
  document.location.reload(true)
}

const main = () => {
  // Uses [Fisher–Yates shuffle](https://en.wikipedia.org/wiki/Fisher–Yates_shuffle)
  for (let index = 52 - 1; index > 1; index -= 1) {
    let otherIndex = Math.floor(Math.random() * index)

    let firstCard = deck[index]
    let secondCard = deck[otherIndex]

    deck[index] = secondCard
    deck[otherIndex] = firstCard
  }

  for (let count = 0; count < 2; count++) {
    dealCardToPlayer()
  }

  for (let count = 0; count < 2; count++) {
    dealCardToDealer()
  }

  let hitButton = document.querySelector('.hit-button')
  hitButton.addEventListener('click', dealCardToPlayer)

  let stayButton = document.querySelector('.stay-button')
  stayButton.addEventListener('click', stay)

  let resetButton = document.querySelector('.reset-button')
  resetButton.addEventListener('click', reset)
}

document.addEventListener('DOMContentLoaded', main)
