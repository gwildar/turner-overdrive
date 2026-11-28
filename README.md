# Old World Tracker

A turn tracker and phase reference tool for Warhammer: The Old World. Import your army list from [Old World Builder](https://old-world-builder.com), then step through each game phase with contextual reminders for special rules, magic items, spells, charge ranges, and shooting profiles.

## Features
 
- Import army lists from [Old World Builder](https://old-world-builder.com) (`.owb.json`) or [Old World Rankings](https://oldworldrankings.com/) (`.ob.json`)
- Step-by-step phase and sub-phase tracking with rules reminders
- Contextual display of special rules, magic items, and spells per phase
- Declarable charge ranges with Fly, Swiftstride, and virtue modifiers
- Shooting profiles with weapon stats per unit
- Combat cards showing per-model stats (T/W/AS/MR/Ward/Regen) and weapon lines
- Assign characters to units — charge modifiers, combat rules, and stat rows merge into the host unit's card
- Spell selection and per-phase caster reminders
- Works offline — all data stored in localStorage

## Setup

Requires [Node.js](https://nodejs.org/) (v18+).

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check (JSDoc types, see src/types.d.ts)
npm run typecheck
```

The app is plain JavaScript. `src/types.d.ts` describes the data and army shapes, and `tsc` checks the JSDoc-annotated files listed in `tsconfig.json` (all app code under `src/`; tests are not checked). Nothing is compiled. A pre-commit hook (`.githooks/pre-commit`, installed by `npm install`) runs the same checks as CI before each commit — prettier, lint, type check and tests (about 10 seconds); skip it once with `git commit --no-verify`.

## Rules data

Unit profiles, rules, spells and items are hand-maintained in `src/data/`. To check them against [tow.whfb.app](https://tow.whfb.app):

```bash
npm run crawl:rules     # snapshot the site to ~/tow-rules (about 50 minutes, 1 request/second)
npm run compare:rules   # compare with the app's data (a few seconds)
```

`compare:rules` writes `~/tow-rules/comparison.md`: stat, troop type, armour value and equipment differences per unit, units missing from the app, spell, weapon and item-points differences, and special rules that are new, recently edited, or used by units but unknown to the app. Use `-- --since YYYY-MM-DD` to set the date for "recently edited". The snapshot is not committed.

## Tech stack

- Vanilla JavaScript (no framework)
- [Vite](https://vite.dev/) for bundling
- [Tailwind CSS](https://tailwindcss.com/) v4 for styling

## Usage

1. Export your army list from [Old World Builder](https://old-world-builder.com) as a `.owb.json` file
2. Open the app and upload the file (or drag and drop it onto the upload area)
3. Select spells for your casters if applicable
4. Optionally assign characters to units on the placement screen
5. Choose who takes the first turn, then step through each phase

## Disclaimer

This web site is completely unofficial and in no way endorsed by Games Workshop Limited.

Warhammer: the Old World, Citadel, Forge World, Games Workshop, GW, Warhammer, the 'winged-hammer' Warhammer logo, the Chaos devices, the Chaos logo, Citadel Device, the Double-Headed/Imperial Eagle device, 'Eavy Metal, Games Workshop logo, Golden Demon, Great Unclean One, the Hammer of Sigmar logo, Horned Rat logo, Keeper of Secrets, Khemri, Khorne, Lord of Change, Nurgle, Skaven, the Skaven symbol devices, Slaanesh, Tomb Kings, Trio of Warriors, Twin Tailed Comet Logo, Tzeentch, Warhammer Online, Warhammer World logo, White Dwarf, the White Dwarf logo, and all associated logos, marks, names, races, race insignia, characters, vehicles, locations, units, illustrations and images from the Warhammer world are either (R), TM and/or (C) Copyright Games Workshop Ltd 2000-2024, variably registered in the UK and other countries around the world. Used without permission. No challenge to their status intended. All Rights Reserved to their respective owners.

## Licence

This project is licensed under the [MIT Licence](LICENCE).
