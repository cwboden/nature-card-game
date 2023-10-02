import { Amount, Resource } from "../../types";
import { CardModel, CardType } from "../models";
import { SiteId, SiteModel } from "./models";
import { emojify } from "../../utils"

export interface SiteCardType extends ProductionCallback, DamagedCallback, SiteModel, CardModel { }

export enum DamagedCallbackId {
    LoseCardFromHand,
    LoseCardFromDeck,
    DealOneDamage,
}

export enum ProductionCallbackId {
    Amount,
    Draw,
    Produce,
}

export interface DamagedCallback {
    damagedCallbackId: DamagedCallbackId | null
}

export interface ProductionCallback {
    productionCallbackId: ProductionCallbackId | null
    productionCallbackProps: Amount | null
}

export const FOREST: SiteCardType = {
    id: SiteId.Forest,
    cardType: CardType.Site,
    title: "Forest",
    description: `+1${emojify(Resource.Plant)}`,
    strength: { value: 3, resource: Resource.Plant },

    damagedCallbackId: null,

    productionCallbackId: ProductionCallbackId.Amount,
    productionCallbackProps: { value: 1, resource: Resource.Plant }
}

export const JUNGLE: SiteCardType = {
    id: SiteId.Jungle,
    cardType: CardType.Site,
    title: "Jungle",
    description: `+2${emojify(Resource.Plant)}`,
    strength: { value: 6, resource: Resource.Plant },

    damagedCallbackId: null,

    productionCallbackId: ProductionCallbackId.Amount,
    productionCallbackProps: { value: 2, resource: Resource.Plant }
}

export const BURROW: SiteCardType = {
    id: SiteId.Burrow,
    cardType: CardType.Site,
    title: "Burrow",
    description: `+1${emojify(Resource.Animal)}`,
    strength: { value: 3, resource: Resource.Animal },

    damagedCallbackId: null,

    productionCallbackId: ProductionCallbackId.Amount,
    productionCallbackProps: { value: 1, resource: Resource.Animal }
}

export const DEN: SiteCardType = {
    id: SiteId.Den,
    cardType: CardType.Site,
    title: "Den",
    description: `+2${emojify(Resource.Animal)}`,
    strength: { value: 6, resource: Resource.Animal },

    damagedCallbackId: null,

    productionCallbackId: ProductionCallbackId.Amount,
    productionCallbackProps: { value: 2, resource: Resource.Animal }
}

export const GAIA_PNEUMA: SiteCardType = {
    id: SiteId.GaiaPneuma,
    cardType: CardType.Site,
    title: "Gaia Pneuma",
    description: "(your hand)",
    strength: { value: 4, resource: Resource.Soul },

    damagedCallbackId: DamagedCallbackId.LoseCardFromHand,

    productionCallbackId: null,
    productionCallbackProps: null
}

export const NURSERY: SiteCardType = {
    id: SiteId.Nursery,
    cardType: CardType.Site,
    title: "Nursery",
    description: "(your deck)",
    strength: { value: 4, resource: Resource.Soul },

    damagedCallbackId: DamagedCallbackId.LoseCardFromDeck,

    productionCallbackId: null,
    productionCallbackProps: null
}

export const THICKET: SiteCardType = {
    id: SiteId.Thicket,
    cardType: CardType.Site,
    title: "Thicket",
    description: `+1 vs. ${emojify(Resource.Destruction)}`,
    strength: { value: 4, resource: Resource.Plant },

    damagedCallbackId: DamagedCallbackId.DealOneDamage,

    productionCallbackId: null,
    productionCallbackProps: null
}

export const MEADOW: SiteCardType = {
    id: SiteId.Thicket,
    cardType: CardType.Site,
    title: "Meadow",
    description: `-2${emojify(Resource.Plant)} here: Take Income`,
    strength: { value: 4, resource: Resource.Plant },

    damagedCallbackId: null,

    productionCallbackId: ProductionCallbackId.Produce,
    productionCallbackProps: { value: 2, resource: Resource.Plant }
}