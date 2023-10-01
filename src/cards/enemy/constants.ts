import { Resource } from "../../types"
import { emojify } from "../../utils"
import { CardType } from "../models"
import { EnemyCardType, EnemyId } from "./models"

export const LUMBERJACK: EnemyCardType = {
    id: EnemyId.Lumberjack,
    cardType: CardType.Enemy,
    title: "Lumberjack",
    description: `+1 vs. ${emojify(Resource.Plant)}`,

    strength: 2,
    bonus: { value: 1, resource: Resource.Animal}
}

export const HUNTER: EnemyCardType = {
    id: EnemyId.Hunter,
    cardType: CardType.Enemy,
    title: "Hunter",
    description: `+1 vs. ${emojify(Resource.Animal)}`,

    strength: 2,
    bonus: { value: 1, resource: Resource.Animal}
}

export const ENEMIES = [LUMBERJACK, HUNTER]

export const WAVES = [
    [null, null, null, null],
    [null, null, null, LUMBERJACK],
    [null, null, null, HUNTER],
    [null, null, null, LUMBERJACK],
    [null, null, HUNTER, LUMBERJACK],
    [null, null, HUNTER, LUMBERJACK],
]