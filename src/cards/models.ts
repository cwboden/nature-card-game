
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