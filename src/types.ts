import { MoveFn } from "boardgame.io"

export enum Resource {
    Animal,
    Plant,
    Soul
}

export interface Amount {
    value: number
    resource: Resource
}

export interface Coordinate {
    lane: number
    row: number
}
