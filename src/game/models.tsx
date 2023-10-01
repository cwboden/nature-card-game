import { Game } from 'boardgame.io';
import { Lane, LaneItem, STARTING_BOARD } from './board/models'
import { shuffle } from '../utils';
import { DEN, JUNGLE, SiteCardType, } from '../cards/sites/constants';
import { DECK } from '../cards/constants'
import { Amount, Coordinate } from '../types';
import { attackEnemy, advanceEnemies, drawCardFromDeck, playCard, produceIncome, createBlockade } from './moves/constants';
import { STARTING_RESOURCES } from './constants';

export enum GameOverState {
  YouLose,
  YouWin
}

export interface State {
  hand: SiteCardType[]
  deck: SiteCardType[]
  lanes: Lane[]

  resources: Amount[]
  wave: number

  gameOverState: GameOverState | null
}
