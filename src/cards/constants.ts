import { BURROW, FOREST, THICKET, MEADOW, JUNGLE, DEN } from "./sites/constants"
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
  { count: 2, card: JUNGLE },
  { count: 2, card: DEN },
])