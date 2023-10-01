import { Amount, Coordinate, Resource } from "../../types";
import { State } from "../models";
import { FnContext, MoveFn } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core"
import { performBattles, tryProduceIncome } from "../actions/systems";
import { WAVES } from "../../cards/enemy/constants";
import { shuffle } from "../../utils";
import { ProductionCallback, ProductionCallbackId, SiteCardType, THICKET } from "../../cards/sites/constants";
import { CardType } from "../../cards/models";
import { setSlot, getSelectedSlot } from "../../utils"
import { LaneItem } from "../board/models";

export const Phases = {
    PLAYER: 'player',
    INVADERS: 'invaders',
}

function tryDrawCardFromDeck(G: State): boolean {
    // Must be a card to draw
    // Must be space in your hand
    // TODO: Avoid magic number '5' for Hand Size
    if (G.deck.length === 0 || G.hand.length === 5) {
        return false
    }

    G.hand.push(G.deck.pop()!!)
    return true
}

export function drawCardFromDeck({ G }: FnContext<State>): ReturnType<MoveFn> {
    if (!tryDrawCardFromDeck(G)) {
        return INVALID_MOVE
    }
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

    // Cost reduced by existing structure
    let cost = { ...G.hand[handId].strength }
    if (slot !== null
        && slot.cardType === CardType.Site
        && slot.strength.resource === cost.resource) {
        cost.value -= slot.strength.value
    }

    if (!tryPayFor(G, cost)) {
        return INVALID_MOVE
    }

    let playedCard = G.hand.splice(handId, 1)[0]
    console.log(`Playing ${playedCard.title} to (${coord.lane}, ${coord.row})`)
    setSlot(G, coord, playedCard)
}

function hasProductionCallback(item: LaneItem) {
    // Hacky type-checking. Use descriminator if needed
    return item && "productionCallbackId" in item
        && (item as unknown as ProductionCallback).productionCallbackId !== null
}

function cleanUpDeadCards(G: State) {
    G.lanes.forEach(
        (lane, l) => lane.rows.filter(
            (item) => item && item.strength.value === 0
        ).forEach(
            (_, r) => G.lanes[l].rows[r] = null
        )
    )
}

export function produceIncome({ G }: FnContext<State>): ReturnType<MoveFn> {
    let callbacks = G.lanes.flatMap(
        (lane) => lane.rows.filter(
            (item) => item && hasProductionCallback(item)
        ).map(
            (item) => item as ProductionCallback)
    )
    callbacks.map((callback) => {
        console.log(`Producing for: ${JSON.stringify(callback)}`)
        switch (callback.productionCallbackId) {
            case ProductionCallbackId.Amount:
                tryProduceIncome(G, callback.productionCallbackProps)
                break
            case ProductionCallbackId.Draw:
                tryDrawCardFromDeck(G)
                break
            case ProductionCallbackId.Produce:
                let site = callback as SiteCardType
                if (callback.productionCallbackProps 
                    && site.strength.value >= callback.productionCallbackProps.value) {
                    site.strength.value -= callback.productionCallbackProps.value

                    callbacks.filter(
                        (c) => c.productionCallbackId === ProductionCallbackId.Amount
                    ).map(
                        (c) => tryProduceIncome(G, c.productionCallbackProps)
                    )
                }
                break
        }
    })

    cleanUpDeadCards(G)
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

    cleanUpDeadCards(G)

    let wave = WAVES[G.wave] ?? []
    console.log(`Upcoming Wave: ${JSON.stringify(wave)}`)
    shuffle(wave).map((enemy, index) => {
        if (enemy) {
            console.log(`Enemy: ${JSON.stringify(enemy)} created in Lane ${index}`)
            setSlot(G, { lane: index, row: 3 }, enemy)
        }
    })
    G.wave++
}

export function attackEnemy({ G }: FnContext<State>, coord: Coordinate | null): ReturnType<MoveFn> {
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

export function createBlockade({ G }: FnContext<State>, coord: Coordinate | null): ReturnType<MoveFn> {
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