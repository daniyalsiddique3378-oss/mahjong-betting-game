// game-over.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../../core/services/game';
import { LeaderboardService } from '../../core/services/leaderboard';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-over.html',
  styleUrl: './game-over.css'
})
export class GameOverComponent {

  // Player name typed in input box
  playerName = '';

  // Track if score already saved
  scoreSaved = false;

  constructor(
    public  gameService: GameService,
    private lbService:   LeaderboardService,
    private router:      Router
  ) {}

  // Save score to leaderboard
  saveScore(): void {
    // Don't save if name is empty
    if (!this.playerName.trim()) {
      alert('Please enter your name!');
      return;
    }

    // Don't save twice
    if (this.scoreSaved) return;

    // Save to leaderboard service
    this.lbService.saveScore({
      name:  this.playerName.trim(),
      score: this.gameService.score(),
      hands: this.gameService.handsPlayed(),
      wins:  this.gameService.wins(),
      date:  new Date().toLocaleDateString()
    });

    // Mark as saved
    this.scoreSaved = true;
  }

  // Play again → start new game → go to game page
  playAgain(): void {
    this.gameService.startNewGame();
    this.router.navigate(['/game']);
  }

  // Go back to home/landing page
  goHome(): void {
    this.router.navigate(['/']);
  }
}