import { BURROW, GAIA_PNEUMA, FOREST, NURSERY, SiteCardType } from "../../cards/sites/constants";
import { HUNTER } from "../../cards/enemy/constants";
import { EnemyCardType } from "../../cards/enemy/models";

export type LaneItem = SiteCardType | EnemyCardType | null

export interface Lane {
  rows: LaneItem[]
}

export const STARTING_BOARD: Lane[] = [
    { rows: [ FOREST, null, null, HUNTER ] },
    { rows: [ GAIA_PNEUMA, null, null, null ] },
    { rows: [ NURSERY, null, null, null ] },
    { rows: [ BURROW, null, null, null ] },
]