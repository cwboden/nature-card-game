import { State } from "../../game/models";
import { Amount, Resource } from "../../types";
import { CardModel, CardType } from "../models";
import { SiteId, SiteModel } from "./models";
import { emojify } from "../../utils"

export interface SiteCardType extends SiteModel, CardModel { }

export const JUNGLE: SiteCardType = {
    id: SiteId.Jungle,
    cardType: CardType.Site,
    title: "Jungle",
    description: `+1${emojify(Resource.Plant)}`,
    strength: { value: 3, resource: Resource.Plant },

    amountToProduce: { value: 1, resource: Resource.Plant }
}

export const DEN: SiteCardType = {
    id: SiteId.Den,
    cardType: CardType.Site,
    title: "Den",
    description: `+1${emojify(Resource.Animal)}`,
    strength: { value: 3, resource: Resource.Animal },

    amountToProduce: { value: 1, resource: Resource.Animal }
}

export const GAIA_PNEUMA: SiteCardType = {
    id: SiteId.GaiaPneuma,
    cardType: CardType.Site,
    title: "Gaia Pneuma",
    description: "(your hand)",
    strength: { value: 4, resource: Resource.Soul },

    amountToProduce: null
}

export const NURSERY: SiteCardType = {
    id: SiteId.Nursery,
    cardType: CardType.Site,
    title: "Nursery",
    description: "(your deck)",
    strength: { value: 4, resource: Resource.Soul },

    amountToProduce: null
}

export const THICKET: SiteCardType = {
    id: SiteId.Thicket,
    cardType: CardType.Site,
    title: "Thicket",
    description: "",
    strength: { value: 4, resource: Resource.Plant },

    amountToProduce: null
}