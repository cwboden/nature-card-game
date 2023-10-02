# Nature Card Game
Developed for Ludum Dare #54, following the theme, "Limited Space".

In *Nature Card Game*, your goal is to defend the lands from invaders over the
course of thirty 'years' (15 rounds).

## How to Play
Enemies will spawn from the right side and advance down the `Lane` until
reaching your `Site`s, at which point, they will attack.

Sites are played from your hand by paying its cost of the corresponding
resource. As a bonus, you may subtract the strength of an existing `Site` to
play another `Site` over it.

Attacking is resolved as follows:
1. Enemy strength (denoted by 🤛) is subtracted from the defending `Site`.
1. Any remaining strength at the `Site` is subtracted from the attacker.

**Special Action:** You can `Unleash the Wild` on enemies to destroy them,
paying four 🐾.

If an enemy reaches the left-most column or the `Gaia Pneuma` or `Nursery` are
destroyed, then the invaders win.

## Development
This project leverages a few technologies, including React, Vite, and
`boardgame.io`. You can develop in the project by cloning the repository and
running:

```bash
npm install
npm run dev
```