import { CARDS } from "../../cards/constants";
import { ENEMIES } from "../../cards/enemy/constants";
import { EnemyCardType } from "../../cards/enemy/models";
import { CardType } from "../../cards/models";
import { SiteCardType } from "../../cards/sites/constants";
import { Amount, Coordinate } from "../../types";
import { Lane } from "../board/models";
import { State } from "../models";

export function tryProduceIncome(G: State, amount: Amount | null) {
    if (amount !== null) {
        let index = G.resources.findIndex((currentAmount) => currentAmount.resource === amount.resource)
        G.resources[index].value += amount.value
    }
}

function performBattleInLane(lane: Lane) {
    let enemyIndex = lane.rows.findIndex((item) => item && item.cardType === CardType.Enemy)

    if (enemyIndex) {
        let friendlyIndex = enemyIndex - 1
        let enemy = lane.rows[enemyIndex] as EnemyCardType
        let friendly = lane.rows[friendlyIndex] as SiteCardType
        if (friendly && friendly.cardType === CardType.Site) {
            console.log(`BATTLE: ${JSON.stringify(enemy)} attacks ${JSON.stringify(friendly)}`)

            friendly.strength.value -= enemy.strength
            if (friendly.strength.resource === enemy.bonus.resource) {
                friendly.strength.value -= enemy.bonus.value
            }
            enemy.strength -= friendly.strength.value

            if (friendly.strength.value <= 0) {
                lane.rows[friendlyIndex] = null
            }
            if (enemy.strength <= 0) {
                lane.rows[enemyIndex] = null
            }
        }
    }
}

export function performBattles(G: State) {
    G.lanes.forEach(performBattleInLane)
}