import React from 'react';
import { CardInHand } from '../../cards/views';
import { SiteCardType } from '../../cards/sites/constants';
import { HighlightableButton } from '../../components';

interface HandProps {
  selectedId: number | null
  cards: SiteCardType[]
  onSelectCard: (id: number) => void
}

export const Hand: React.FC<HandProps> = ({ selectedId, cards, onSelectCard }) =>
  <div className="grid grid-cols-5 gap-2">
    {
      cards.map((card, id) => {
        let isSelected = selectedId === id
        return (
          <HighlightableButton isHighlighted={isSelected} onClick={() => onSelectCard(id)}>
            <CardInHand site={card} />
          </HighlightableButton>
        )
      })
    }
  </div>
