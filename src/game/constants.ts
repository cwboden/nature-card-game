import { Amount, Resource } from "../types";
import { State as BoardGameState, Ctx, Game } from 'boardgame.io'
import { GameOverState, State } from "./models";
import { STARTING_BOARD } from "./board/models";
import { DECK } from "../cards/constants";
import { FOREST, BURROW } from "../cards/sites/constants";
import { shuffle } from "../utils";
import { drawCardFromDeck, produceIncome, playCard, attackEnemy, createBlockade, advanceEnemies, Phases } from "./moves/constants";
import { CardType } from "../cards/models";
import { SiteId } from "../cards/sites/models";

export interface BgState extends BoardGameState<State> { }

export const STARTING_RESOURCES: Amount[] = [
    { resource: Resource.Animal, value: 1 },
    { resource: Resource.Plant, value: 1 }
]

const loseCondition = (G: State, ctx: Ctx) => {
    return (
        ctx.phase === Phases.INVADERS
        && G.lanes.some((lane) => lane.rows[0]?.cardType === CardType.Enemy)
    ) || (
            !G.lanes.some((lane) => lane.rows.some((item) => item?.id === SiteId.GaiaPneuma))
            || !G.lanes.some((lane) => lane.rows.some((item) => item?.id === SiteId.Nursery))
        )
}

const winCondition = (ctx: Ctx) => {
    const TURNS_TO_WIN = 30
    return ctx.turn === TURNS_TO_WIN
}

export const NatureCardGame: Game<State> = {
    minPlayers: 1,
    maxPlayers: 1,

    setup: () => ({
        hand: [FOREST, BURROW],
        lanes: STARTING_BOARD,
        deck: shuffle([...DECK]),

        resources: STARTING_RESOURCES,
        wave: 0,

        gameOverState: null
    }),

    phases: {
        player: {
            start: true,
            onBegin: (context) => { 
                drawCardFromDeck(context)
                produceIncome(context) 
            },
            moves: { produceIncome, playCard, drawCardFromDeck, attackEnemy, createBlockade },
            turn: {
                maxMoves: 3,
            },
            endIf: ({ ctx }) => ctx.numMoves === 3,
            next: 'invaders'
        },
        invaders: {
            moves: { advanceEnemies },
            turn: { maxMoves: 1 },
            endIf: ({ ctx }) => ctx.numMoves === 1,
            next: 'player'
        },
    },

    endIf: ({ G, ctx }) => {
        return loseCondition(G, ctx) || winCondition(ctx)
    },

    onEnd: ({ G, ctx }) => {
        if (winCondition(ctx)) {
            G.gameOverState = GameOverState.YouWin
        } else {
            G.gameOverState = GameOverState.YouLose
        }
    }
};