import { Client } from 'boardgame.io/react';
import './App.css'
import { Board } from './game/board/views';
import { NatureCardGame } from './game/constants';

export default Client({ game: NatureCardGame, board: Board, numPlayers: 1 });
