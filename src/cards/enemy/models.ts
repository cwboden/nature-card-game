import { LaneSlotElementProps } from "../../game/board/views"
import { Amount } from "../../types"
import { CardModel, Describable, Descriminated } from "../models"
import { HUNTER, LUMBERJACK } from "./constants"

export enum EnemyId {
    Lumberjack,
    Hunter
}

export interface EnemyCardType extends Descriminated, EnemyModel { }

export interface EnemyModel extends Describable {
    id: EnemyId
    title: string
    description: string
    strength: number
    bonus: Amount
}

export function getEnemyById(id: EnemyId) {
    switch (id) {
        case EnemyId.Lumberjack:
            return LUMBERJACK
        case EnemyId.Hunter:
            return HUNTER
    }
}