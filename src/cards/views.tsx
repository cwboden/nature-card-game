import React from "react"
import { stringify } from "../utils"
import { SiteModel } from "./sites/models"

export interface CardInHandProps {
    site: SiteModel
}

export const CardInHand: React.FC<CardInHandProps> = ({ site }) => {
    return (
        <div className="grid">
            <div className="col-span-1">{stringify(site.strength)}</div>
            <div className="col-span-1">{site.title}</div>
            <div className="col-span-1">{site.description}</div>
        </div>
    )
}
