import { Lane } from './board/models'
import { SiteCardType, } from '../cards/sites/constants';
import { Amount } from '../types';

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
