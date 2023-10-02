import { Amount } from "../../types";
import { Describable } from "../models";
import {BURROW, GAIA_PNEUMA, FOREST, NURSERY, THICKET, JUNGLE} from "./constants"

export enum SiteId {
    Forest,
    Jungle,
    Burrow,
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
        case SiteId.Forest:
            return FOREST
        case SiteId.Jungle:
            return JUNGLE
        case SiteId.Burrow:
            return BURROW
        case SiteId.GaiaPneuma:
            return GAIA_PNEUMA
        case SiteId.Nursery:
            return NURSERY
        case SiteId.Thicket:
            return THICKET
    }
}
