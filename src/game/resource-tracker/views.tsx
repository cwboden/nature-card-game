import React from 'react';
import { Amount } from '../../types';
import { stringify } from '../../utils';

interface ResourceTrackerProps {
  resources: Amount[]
  year: number
  numCardsInDeck: number
  numActionsRemaining: number
}

export const ResourceTracker: React.FC<ResourceTrackerProps> = ({ resources, year, numCardsInDeck, numActionsRemaining }) =>
  <div className="flex flex-row gap-2 font-medium align-middle">
    {
      resources.map((amount) => {
        return (
          <span className="inline-block rounded-sm px-5 text-center bg-primary-400 ">
            {stringify(amount)}
          </span>
        )
      })
    }
    <span className='inline-block rounded-sm px-5 text-center'>Year {year}</span>
    <span className='inline-block rounded-sm px-5 text-center'>Cards in Deck: {numCardsInDeck}</span>
    <span className='inline-block rounded-sm px-5 text-center'>Actions Remaining: {3 - numActionsRemaining}</span>
  </div>
