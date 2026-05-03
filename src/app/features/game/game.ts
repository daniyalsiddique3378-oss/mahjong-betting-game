// game.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameService } from '../../core/services/game';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.html',
  styleUrl: './game.css'
})
export class GameComponent implements OnInit {

  constructor(
    public  gameService: GameService,
    public  router: Router
  ) {}

  // When game page loads
  // Check if game was already started
  ngOnInit(): void {
    // If no hand dealt yet → start new game
    if (this.gameService.currentHand().length === 0) {
      this.gameService.startNewGame();
    }
  }

  // Bet Higher button clicked
  onBetHigher(): void {
    this.gameService.placeBet('higher');
  }

  // Bet Lower button clicked
  onBetLower(): void {
    this.gameService.placeBet('lower');
  }

  // Exit to home
  onExit(): void {
    if (confirm('Exit? Your progress will be lost!')) {
      this.router.navigate(['/']);
    }
  }

  // Go to game over page
  onGoToResults(): void {
    this.router.navigate(['/game-over']);
  }
}