import { Amount, Resource } from "../../types";
import { CardModel, Describable } from "../models";
import {DEN, GAIA_PNEUMA, JUNGLE, NURSERY, THICKET} from "./constants"

export enum SiteId {
    Jungle,
    Den,
    GaiaPneuma,
    Nursery,
    Thicket,
}

export interface SiteModel extends Describable {
    id: SiteId
    title: string
    description: string
    strength: Amount
}

export function getSiteById(id: SiteId) {
    switch (id) {
        case SiteId.Jungle:
            return JUNGLE
        case SiteId.Den:
            return DEN
        case SiteId.GaiaPneuma:
            return GAIA_PNEUMA
        case SiteId.Nursery:
            return NURSERY
        case SiteId.Thicket:
            return THICKET
    }
}
