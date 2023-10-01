import React from "react"

export interface HighlightableButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  isHighlighted: boolean
  onClick: () => void
}

export const HighlightableButton: React.FC<HighlightableButtonProps> = ({ isHighlighted, onClick, children, ...rest }) => {
  return (
    <button className={`w-full h-24 ${isHighlighted ? "bg-green-900" : ""}`} onClick={onClick}>
      {children}
    </button>
  )
}