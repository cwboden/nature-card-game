import { MoveFn } from "boardgame.io"

export enum Resource {
    Animal,
    Plant,
    Soul,
    Destruction,
}

export interface Amount {
    value: number
    resource: Resource
}

export interface Coordinate {
    lane: number
    row: number
}
