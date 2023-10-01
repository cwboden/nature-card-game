import React from "react"
import { EnemyModel } from "./models"
import { HighlightableButton } from "../../components"
import { stringify } from "../../utils"

export interface EnemyProps {
  onSelectSlot: () => void
  card: EnemyModel
  isHighlighted: boolean
}

export const Enemy: React.FC<EnemyProps> = ({ onSelectSlot, card, isHighlighted }) => {
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
