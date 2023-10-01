import { BURROW, GAIA_PNEUMA, FOREST, NURSERY, THICKET, MEADOW } from "./sites/constants"
import { CardModel } from "./models"

interface CardCount {
  count: number
  card: CardModel
}

function deckFromCardCounts(counts: CardCount[]): CardModel[] {
  return counts.flatMap(({count, card}) => new Array(count).fill(card))
}

export const DECK: CardModel[] = deckFromCardCounts([
  { count: 3, card: FOREST },
  { count: 3, card: BURROW },
  { count: 3, card: THICKET },
  { count: 3, card: MEADOW },
])

export const CARDS = [ FOREST, BURROW, GAIA_PNEUMA, NURSERY, THICKET ]