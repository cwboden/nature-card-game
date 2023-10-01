import { Ctx, MoveMap } from "boardgame.io";
import { Amount, Coordinate, Resource } from "./types";
import { State } from "./game/models";
import { LaneItem } from "./game/board/models";

/**
 * Shamelessly cribbed from:
 * https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 * 
 * Shuffles array in place. ES6 version
 * @param {Array} items: An array containing the items.
 */
export function shuffle(items: any[]) {
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
}

export function emojify(resource: Resource): string {
    switch (resource) {
        case Resource.Animal:
            return "🐾";
        case Resource.Plant:
            return "🌱"
        case Resource.Soul:
            return "💖"
        case Resource.Destruction:
            return "🤛"
    }
}

export function stringify(amount: Amount | null): string | null {
    return amount && (amount.value + emojify(amount.resource))
}

export interface BoardGameProps {
    G: State
    ctx: Ctx
    moves: MoveMap
}

export function getSelectedSlot(G: State, coord: Coordinate): LaneItem {
  return G.lanes[coord.lane].rows[coord.row]
}

export function setSlot(G: State, coord: Coordinate, item: LaneItem) {
  G.lanes[coord.lane].rows[coord.row] = item
}
