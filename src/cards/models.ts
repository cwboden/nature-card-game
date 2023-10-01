import { State } from "../game/models"
import { Amount } from "../types"

export enum CardType {
    Site,
    Enemy,
}

export interface Descriminated {
    cardType: CardType
}

export interface Describable {
  title: string
  description: string
}

export interface CardModel extends Descriminated, Describable { }