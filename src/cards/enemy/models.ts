import { Amount } from "../../types"
import { Describable, Descriminated } from "../models"
import { HUNTER, LUMBERJACK } from "./constants"

export enum EnemyId {
    Lumberjack,
    Hunter,
    Trapper
}

export interface EnemyCardType extends Descriminated, EnemyModel { }

export interface EnemyModel extends Describable {
    id: EnemyId
    title: string
    description: string
    strength: Amount
    bonus: Amount | null
}

export function getEnemyById(id: EnemyId) {
    switch (id) {
        case EnemyId.Lumberjack:
            return LUMBERJACK
        case EnemyId.Hunter:
            return HUNTER
    }
}