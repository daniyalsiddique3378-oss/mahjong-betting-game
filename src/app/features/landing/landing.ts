import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameService } from '../../core/services/game';
import { LeaderboardService } from '../../core/services/leaderboard';

@Component({
  selector: 'app-landing',
  imports: [CommonModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  constructor(
    private router:       Router,
    public  gameService:  GameService,
    public  lbService:    LeaderboardService
  ) {}

   startGame(): void {
    this.gameService.startNewGame();
    this.router.navigate(['/game']);
  }

}
