import { Resource } from "../../types"
import { emojify } from "../../utils"
import { CardType } from "../models"
import { EnemyCardType, EnemyId } from "./models"

export const LUMBERJACK: EnemyCardType = {
    id: EnemyId.Lumberjack,
    cardType: CardType.Enemy,
    title: "Lumberjack",
    description: `+1 vs. ${emojify(Resource.Plant)}`,

    strength: { value: 2, resource: Resource.Destruction },
    bonus: { value: 1, resource: Resource.Plant}
}

export const HUNTER: EnemyCardType = {
    id: EnemyId.Hunter,
    cardType: CardType.Enemy,
    title: "Hunter",
    description: `+1 vs. ${emojify(Resource.Animal)}`,

    strength: { value: 2, resource: Resource.Destruction },
    bonus: { value: 1, resource: Resource.Animal}
}

export const TRAPPER: EnemyCardType = {
    id: EnemyId.Trapper,
    cardType: CardType.Enemy,
    title: "Trapper",
    description: `-1${emojify(Resource.Animal)}`,

    strength: { value: 2, resource: Resource.Destruction },
    bonus: null
}

export const ENEMIES = [LUMBERJACK, HUNTER]

export const WAVES = [
    [null, null, null, null],
    [null, null, null, LUMBERJACK],
    [null, null, null, HUNTER],
    [null, null, null, LUMBERJACK],
    [null, null, HUNTER, LUMBERJACK],
    [null, null, HUNTER, LUMBERJACK],
    [null, LUMBERJACK, HUNTER, LUMBERJACK],
    [null, HUNTER, HUNTER, LUMBERJACK],
    [null, LUMBERJACK, LUMBERJACK, LUMBERJACK],
    [null, HUNTER, HUNTER, HUNTER],
    [HUNTER, LUMBERJACK, HUNTER, LUMBERJACK],
    [LUMBERJACK, HUNTER, HUNTER, LUMBERJACK],
    [HUNTER, HUNTER, HUNTER, HUNTER],
    [LUMBERJACK, LUMBERJACK, LUMBERJACK, LUMBERJACK],
]