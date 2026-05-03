# MahjongTiles

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.9.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# 🀄 Mahjong Hand Betting Game

A web-based betting game built with Angular 21
using Mahjong tiles. Bet Higher or Lower on
hand totals to score points!



## 🎮 How to Play

1. A hand of 3 Mahjong tiles is dealt
2. See the total value of your hand
3. Bet if the NEXT hand will be HIGHER or LOWER
4. Win = +100 points
5. Game ends when:
   - A Dragon/Wind tile reaches value 0 or 10
   - Draw pile runs out 3 times


## 🚀 Setup Instructions

### Prerequisites
- Node.js v24.15.0
- npm v11.12.1
- Angular CLI v21

### Installation

# Clone the repository
git clone https://github.com/daniyalsiddique3378-oss/mahjong-betting-game.git

# Go into project folder
cd mahjong-betting-game

# Install dependencies
npm install

# Run the app
ng serve

# Open browser
# Go to: http://localhost:4200

---

## 📁 Project Structure

src/
└── app/
    ├── core/
    │   ├── models/
    │   │   └── tile.model.ts                 # Data interfaces
    │   └── services/
    │       ├── game.service.ts               # Game logic
    │       ├── deck.service.ts               # Tile management
    │       └── leaderboard.service.ts        # Score management
    │
    ├── features/
    │   ├── landing/
    │   │   ├── landing.component.ts
    │   │   ├── landing.component.html
    │   │   └── landing.component.css
    │   │
    │   ├── game/
    │   │   ├── game.component.ts
    │   │   ├── game.component.html
    │   │   └── game.component.css
    │   │
    │   └── game-over/
    │       ├── game-over.component.ts
    │       ├── game-over.component.html
    │       └── game-over.component.css
    │
    ├── app.component.ts
    ├── app.component.html
    ├── app.component.css
    └── app.routes.ts                         # Application routing


## 🛠️ Tech Stack


| Angular 21 | Main framework |
| TypeScript | Logic & models |
| CSS | Styling |
| Angular Signals | State management | Angular Computed
| Angular Router | Page navigation |
| LocalStorage | Leaderboard data |



## ✨ Features

- ✅ Landing page with leaderboard
- ✅ 34 Mahjong tiles (Numbers, Dragons, Winds)
- ✅ Dynamic tile value scaling
- ✅ Bet Higher or Lower mechanic
- ✅ Draw pile & discard pile tracking
- ✅ Automatic reshuffling (max 3 times)
- ✅ Hand history display
- ✅ Score tracking (+100 per win)
- ✅ Game over detection
- ✅ Score saving to leaderboard
- ✅ Smooth CSS animations
- ✅ Responsive design



## 🤖 AI vs Handwritten

### Handwritten by Me:
- Project architecture decisions
- Component structure planning
- Game logic understanding between Real game and this project
- Debugging and fixing errors
- CSS customization and tweaks
- Testing all game scenarios
- README documentation

### AI Assisted (Claude):
- code structure like first make model --> services --> componenet --> HTML --> CSS 
- CSS animation patterns
- Method like createDeck()
- Initial service method templates
- HTML template structure

> Note: some AI-generated code was reviewed,
> understood, and modified by me before use.
> I understand every line of code in this project.

---

## 🎯 Game Rules

### Tile Values
| Tile Type | Value |
| Number tiles (1-9) | Face value |
| Dragon tiles | Starts at 5 |
| Wind tiles | Starts at 5 |

### Dynamic Scaling
- Win with Dragon/Wind → value +1
- Lose with Dragon/Wind → value -1

### Game Over Conditions
1. Any tile reaches value 0 (too weak)
2. Any tile reaches value 10 (too powerful)  
3. Draw pile reshuffled 3 times

---

## 👤 Author

**Daniyal Siddique**
Assessment for Penny Software W.L.L.
