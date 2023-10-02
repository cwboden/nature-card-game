import { EnemyCardType } from "../../cards/enemy/models";
import { CardType } from "../../cards/models";
import { DamagedCallback, DamagedCallbackId, SiteCardType } from "../../cards/sites/constants";
import { Amount, Coordinate } from "../../types";
import { Lane } from "../board/models";
import { State } from "../models";

export function tryProduceIncome(G: State, amount: Amount | null) {
    if (amount !== null) {
        let index = G.resources.findIndex((currentAmount) => currentAmount.resource === amount.resource)
        G.resources[index].value += amount.value
    }
}

function hasDamagedCallback(friendly: SiteCardType) {
    // Hacky type-checking. Use descriminator if needed
    return "damagedCallbackId" in friendly
        && (friendly as unknown as DamagedCallback).damagedCallbackId
}

function removeRandomElementFrom<T>(arr: T[]) {
    let index = Math.floor(Math.random() * arr.length)
    arr.splice(index, 1)
}

function executeDamagedCallback(G: State, callbackId: DamagedCallbackId, enemy: EnemyCardType) {
    switch (callbackId) {
        case DamagedCallbackId.DealOneDamage:
            enemy.strength.value -= 1
        case DamagedCallbackId.LoseCardFromDeck:
            removeRandomElementFrom(G.deck)
        case DamagedCallbackId.LoseCardFromHand:
            removeRandomElementFrom(G.hand)
    }
}

function performBattleInLane(G: State, lane: Lane) {
    let enemyIndex = lane.rows.findIndex((item) => item && item.cardType === CardType.Enemy)

    if (enemyIndex) {
        let friendlyIndex = enemyIndex - 1
        let enemy = lane.rows[enemyIndex] as EnemyCardType
        let friendly = lane.rows[friendlyIndex] as SiteCardType
        if (friendly && friendly.cardType === CardType.Site) {
            console.log(`BATTLE: ${JSON.stringify(enemy)} attacks ${JSON.stringify(friendly)}`)

            friendly.strength.value -= enemy.strength.value
            if (friendly.strength.resource === enemy.bonus?.resource) {
                friendly.strength.value -= enemy.bonus.value
            }
            if (friendly.strength.value >= 0) {
                enemy.strength.value -= friendly.strength.value
            }
            if (hasDamagedCallback(friendly)) {
                executeDamagedCallback(G, (friendly as unknown as DamagedCallback).damagedCallbackId!!, enemy)
            }
        }
    }
}

export function performBattles(G: State) {
    G.lanes.forEach((lane) => performBattleInLane(G, lane))
}