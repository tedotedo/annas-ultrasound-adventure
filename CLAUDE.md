# CLAUDE.md - Anna's Ultrasound Adventure

## Project Overview

**Anna's Ultrasound Adventure** (https://annas-ultrasound-adventure.app) is a React-based interactive companion app to the children's picture book by Dr Moira McCarty. It helps children prepare for an ultrasound scan through exploration, checklists, and a printable certificate of bravery. Part of the SUVIMA ecosystem of medical education apps.

## Tech Stack

- **Framework:** React 19.2.0 (JavaScript, not TypeScript)
- **Build Tool:** Vite 7.x
- **Routing:** React Router DOM 7.13.0
- **Styling:** Tailwind CSS 4.x (via @tailwindcss/postcss)
- **Extras:** html2canvas (certificate generation), react-confetti (celebration effects)
- **Data Persistence:** localStorage (no backend)
- **Speech:** Web Speech API (useSpeech hook)

## Commands

```bash
npm run dev      # Start development server
npm run build    # Vite build
npm run lint     # ESLint
npm run preview  # Preview production build
```

## Project Structure

```
src/
├── App.jsx                 # Main router configuration
├── main.jsx                # Entry point
├── index.css               # Global styles + Tailwind imports
├── assets/
│   └── react.svg
├── components/             # Shared components (currently empty)
├── data/
│   ├── characters.js       # Character data for the ultrasound team
│   ├── checklistItems.js   # Pre-scan preparation checklist items
│   └── hotspots.js         # Interactive exploration hotspots
├── hooks/
│   ├── useLocalStorage.js  # Custom hook for persisted state
│   └── useSpeech.js        # Web Speech API text-to-speech hook
└── pages/
    ├── Home.jsx            # Landing page
    ├── About.jsx           # About the app and book
    ├── Team.jsx            # Meet the ultrasound team
    ├── Explore.jsx         # Interactive ultrasound room exploration
    ├── Checklist.jsx       # Pre-scan preparation checklist
    ├── Book.jsx            # Link to the picture book
    └── Certificate.jsx     # Printable certificate of bravery
```

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | Landing page |
| `/about` | About | About the app and the book |
| `/team` | Team | Meet the ultrasound team characters |
| `/explore` | Explore | Interactive ultrasound room with hotspots |
| `/checklist` | Checklist | Pre-scan preparation checklist |
| `/book` | Book | Link to the Canva picture book |
| `/certificate` | Certificate | Printable bravery certificate (html2canvas) |

## Key Files for Common Tasks

| Task | Files to Edit |
|------|---------------|
| Add new page | `src/pages/NewPage.jsx`, `src/App.jsx` (add route) |
| Edit ultrasound team | `src/data/characters.js` |
| Edit exploration hotspots | `src/data/hotspots.js` |
| Edit checklist items | `src/data/checklistItems.js` |
| Modify text-to-speech | `src/hooks/useSpeech.js` |

## Related Projects

- [[suvima - index]] - SUVIMA medical education hub
- [[warp-transition-helper - index]] - Transition Ready
- [[epilepsyhelper - index]] - EpilepsyHelper
