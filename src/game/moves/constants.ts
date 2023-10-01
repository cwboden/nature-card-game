import { Amount, Coordinate, Resource } from "../../types";
import { State} from "../models";
import { Ctx, FnContext, MoveFn } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core"
import { performBattles, tryProduceIncome } from "../actions/systems";
import { EventsAPI } from "boardgame.io/dist/types/src/plugins/plugin-events";
import { WAVES } from "../../cards/enemy/constants";
import { shuffle } from "../../utils";
import { EnemyCardType } from "../../cards/enemy/models";
import { THICKET } from "../../cards/sites/constants";
import { CardType } from "../../cards/models";
import { setSlot, getSelectedSlot } from "../../utils"

export const Phases = {
    PLAYER: 'player',
    INVADERS: 'invaders',
}

export function drawCardFromDeck({ G }: FnContext<State>): ReturnType<MoveFn> {
    // Must be a card to draw
    // Must be space in your hand
    // TODO: Avoid magic number '5' for Hand Size
    if (G.deck.length === 0 || G.hand.length === 5) {
        return INVALID_MOVE
    }

    G.hand.push(G.deck.pop()!!)
}

function tryPayFor(G: State, amount: Amount | null): boolean {
    if (amount === null) {
        return true
    }

    let currentAmount = G.resources.find((a) => a.resource === amount.resource)
    if (currentAmount && amount.value <= currentAmount?.value) {
        G.resources.find((a) => a.resource === amount.resource)!!.value -= amount.value
        return true
    }

    return false
}

export function playCard({ G }: FnContext<State>, coord: Coordinate, handId: number): ReturnType<MoveFn> {
    let slot = getSelectedSlot(G, coord)

    // (For now) cannot play a card where something exists
    if (slot !== null) {
        return INVALID_MOVE
    }

    let cost = G.hand[handId].strength
    if (!tryPayFor(G, cost)) {
        return INVALID_MOVE
    }

    let playedCard = G.hand.splice(handId, 1)[0]
    console.log(`Playing ${playedCard.title} to (${coord.lane}, ${coord.row})`)
    setSlot(G, coord, playedCard)
}

export function produceIncome({ G }: FnContext<State>): ReturnType<MoveFn> {
    G.lanes.map((lane) => {
        lane.rows.map((item) => {
            // Hacky type-checking
            // TypeScript `satisfies` didn't work here, sadly
            if (item && "amountToProduce" in item) {
                console.log(`Producing for: ${JSON.stringify(item)}`)
                tryProduceIncome(G, item.amountToProduce)
            }
        })
    })
}

export function advanceEnemies({ G }: FnContext<State>): ReturnType<MoveFn> {
    performBattles(G)

    G.lanes.map((lane, l) => {
        lane.rows.map((item, r) => {
            if (item && item.cardType === CardType.Enemy) {
                console.log(`Advancing Enemy: ${JSON.stringify(item)} at (${l}, ${r})`)
                if (r === 0) {
                    console.log("TODO: You lose?")
                } else if (lane.rows[r - 1] === null) {
                    // Swap the elements, for ease of management
                    lane.rows.splice(r - 1, 0, lane.rows.splice(r, 1)[0])
                }
            }
        })
    })

    let wave = WAVES[G.wave] ?? []
    console.log(`Upcoming Wave: ${JSON.stringify(wave)}`)
    shuffle(wave).map((enemy, index) => {
        if (enemy) {
            console.log(`Enemy: ${JSON.stringify(enemy)} created in Lane ${index}`)
            setSlot(G, { lane: index, row: 3}, enemy)
        }
    })
    G.wave++
}

export function attackEnemy({G}: FnContext<State>, coord: Coordinate | null): ReturnType<MoveFn> {
    if (coord === null) {
        return INVALID_MOVE
    }

    let target = getSelectedSlot(G, coord)
    if (target === null || (target.cardType !== CardType.Enemy)) {
        return INVALID_MOVE
    }

    const COST: Amount = { value: 4, resource: Resource.Animal }
    if (!tryPayFor(G, COST)) {
        return INVALID_MOVE
    }

    setSlot(G, coord, null)
}

export function createBlockade({G}: FnContext<State>, coord: Coordinate | null): ReturnType<MoveFn> {
    if (coord === null) {
        return INVALID_MOVE
    }

    let target = getSelectedSlot(G, coord)
    if (target !== null) {
        return INVALID_MOVE
    }

    const COST: Amount = { value: 4, resource: Resource.Plant }
    if (!tryPayFor(G, COST)) {
        return INVALID_MOVE
    }

    setSlot(G, coord, THICKET)
}