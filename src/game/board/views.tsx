import React, { useEffect, useState } from 'react';
import { BoardProps } from 'boardgame.io/react';
import { GameOverState, State } from '../models';
import { Coordinate, Resource } from '../../types';
import { LaneItem } from './models';
import { Hand } from '../hand/views';
import { ResourceTracker } from '../resource-tracker/views';
import { CardType } from '../../cards/models';
import { HighlightableButton } from '../../components';
import { SiteModel } from '../../cards/sites/models';
import { emojify, stringify } from '../../utils';
import { SiteCardType } from '../../cards/sites/constants';
import { EnemyCardType } from '../../cards/enemy/models';
import { Enemy } from '../../cards/enemy/views';
import { Phases } from '../moves/constants';

export interface LaneSlotElementProps {
  title: string
  description: string
}

const LaneSlotElement: React.FC<LaneSlotElementProps> = ({ title, description }) => {
  return (
    <div className='flex flex-row'>
      <div className='flex flex-col'>
        <span className="text-center">{title}</span>
        <span className="text-center">{description}</span>
      </div>
    </div>
  )
}

export interface LaneSlotProps {
  onSelectSlot: () => void
  laneItem: LaneItem
  isHighlighted: boolean
}

const LaneSlot: React.FC<LaneSlotProps> = ({ onSelectSlot, laneItem, isHighlighted }) => {
  return (
    <div className="flex">
      <HighlightableButton isHighlighted={isHighlighted} onClick={onSelectSlot}>
        {
          laneItem &&
          <LaneSlotElement title={laneItem.title} description={laneItem.description} />
        }
      </HighlightableButton>
    </div>
  )
}

export interface CardOnBoardProps {
  onSelectSlot: () => void
  card: SiteModel
  isHighlighted: boolean
}

const CardOnBoard: React.FC<CardOnBoardProps> = ({ onSelectSlot, card, isHighlighted }) => {
  return (
    <div className="flex w-64 content-center">
      <HighlightableButton isHighlighted={isHighlighted} onClick={onSelectSlot}>
        <div className="flex flex-row divide-x divide-gray-500 divide-solid columns-3">
          <div className="text-center align-middle">{stringify(card.strength)}</div>
          <div className="flex flex-col">
            <div>{card.title}</div>
            <div>{card.description}</div>
          </div>
        </div>
      </HighlightableButton>
    </div>
  )
}

interface Props extends BoardProps<State> { }

export const Board = ({ G, ctx, moves, undo, redo }: Props) => {
  const [selectedCoordinate, setSelectedCoordinate] = useState<Coordinate | null>(null)
  const [selectedHandId, setSelectedHandId] = useState<number | null>(null)
  const [canTryPlayCard, setCanTryPlayCard] = useState<boolean>(false)

  useEffect(() => {
    setCanTryPlayCard(selectedCoordinate !== null && selectedHandId !== null)
  }, [selectedCoordinate, selectedHandId])

  let isInvaderPhase = ctx.phase === Phases.INVADERS

  return (
    <main>
      <div className="grid gap-6">
        <h1 className="text-3xl font-bold">
          Nature Card Game
        </h1>

        <div
          className={`h-auto font-bold text-9xl px-10 py-10 rounded-lg ${G.gameOverState === GameOverState.YouLose ? "bg-red-800" : "bg-green-800"}`}
          hidden={ctx.gameover === undefined}>
          {G.gameOverState === GameOverState.YouLose ? "GAME OVER" : "YOU WIN!"}
        </div>

        <div className="grid grid-cols-4 gap-2">
          {
            G.lanes.map((lane, l) =>
              lane.rows.map((item, r) => {
                let coordinate: Coordinate = { lane: l, row: r }
                let isSelected = selectedCoordinate?.lane == coordinate.lane
                  && selectedCoordinate?.row == coordinate.row
                let onSelectSlot = () => {
                  // Toggle / Untoggle
                  if (isSelected) {
                    setSelectedCoordinate(null)
                  } else {
                    setSelectedCoordinate(coordinate)
                  }
                }

                if (item) {
                  switch (item.cardType) {
                    case CardType.Site:
                      return (
                        <CardOnBoard onSelectSlot={onSelectSlot} card={item as SiteCardType} isHighlighted={isSelected} />
                      )
                    case CardType.Enemy:
                      return (
                        <Enemy onSelectSlot={onSelectSlot} card={item as EnemyCardType} isHighlighted={isSelected} />
                      )
                  }
                } else {
                  return (
                    <LaneSlot onSelectSlot={onSelectSlot} laneItem={item} isHighlighted={isSelected} />
                  )
                }
              })
            )
          }
        </div>

        <Hand selectedId={selectedHandId} cards={G.hand} onSelectCard={(id) => {
          // Toggle / Untoggle
          if (selectedHandId === id) {
            setSelectedHandId(null)
          } else {
            setSelectedHandId(id)
          }
        }} />

        <button
          className="bg-blue-800"
          hidden={!canTryPlayCard}
          onClick={() => {
            moves.playCard(selectedCoordinate, selectedHandId)
            setSelectedCoordinate(null)
            setSelectedHandId(null)
          }}
        >
          Confirm
        </button>

        <ResourceTracker resources={G.resources} year={ctx.turn} numCardsInDeck={G.deck.length} numActionsRemaining={ctx.numMoves ?? 0} />

        <div className='flex flex-row gap-2'>
          <button
            className={isInvaderPhase ? 'opacity-50' : ''}
            disabled={isInvaderPhase}
            onClick={() => moves.produceIncome()}>
            Take Income
          </button>
          <button
            className={isInvaderPhase ? 'opacity-50' : ''}
            disabled={isInvaderPhase}
            onClick={() => moves.drawCardFromDeck()}>
            Draw Card
          </button>
          <button
            className={(selectedCoordinate === null || isInvaderPhase) ? 'opacity-50' : ''}
            disabled={(selectedCoordinate === null || isInvaderPhase)}
            title={(selectedCoordinate === null) ? "Select an Enemy first" : undefined}
            onClick={() => {
              moves.attackEnemy(selectedCoordinate)
              setSelectedCoordinate(null)
            }}>
            Unleash the Wild [4{emojify(Resource.Animal)}]
          </button>
          <button
            hidden={!isInvaderPhase}
            className="bg-red-800" onClick={() => moves.advanceEnemies()}>
            Advance Invaders
          </button>
        </div>
        <div className='flex flex-row gap-2'>
          <button onClick={() => undo()} >
            Undo
          </button>
          <button onClick={() => redo()} >
            Redo
          </button>
          <a href="https://github.com/cwboden/nature-card-game/#readme" >
            <button>How to Play</button>
          </a>
        </div>
      </div>
    </main>
  );
};
