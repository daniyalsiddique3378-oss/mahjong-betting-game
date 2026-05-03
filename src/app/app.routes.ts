import { Routes } from '@angular/router';
import { Landing } from './features/landing/landing';
import { GameComponent } from './features/game/game';
import { GameOverComponent } from './features/game-over/game-over';
export const routes: Routes = [
    // localhost:4200/ → Landing page
  { path: '',          component: Landing  },
  // localhost:4200/game → Game page
  { path: 'game',      component:  GameComponent    },
  // localhost:4200/game-over → Game over page
  { path: 'game-over', component: GameOverComponent },
  // Unknown URL → go home
  { path: '**',        redirectTo: ''               }
];
