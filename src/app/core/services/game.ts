import { Injectable , signal , computed } from '@angular/core';
import { Tile , Hand } from './models/tile.model'
import { DeckService } from './deck';

@Injectable({
  providedIn: 'root',
})
export class GameService {

  // ALL GAME STATE AS SIGNALS
  // When these change → UI auto updates!

  // Current 3 tiles showing on screen
  currentHand  = signal<Tile[]>([]);

  // Tiles waiting to be drawn
  drawPile     = signal<Tile[]>([]);

  // Tiles already played
  discardPile  = signal<Tile[]>([]);

  // Player score (starts at 0)
  score        = signal(0);

  // How many reshuffles happened (max 3)
  reshuffleCount = signal(0);

  // Previous hands for history
  history      = signal<Hand[]>([]);

  // Is the game finished?
  isGameOver   = signal(false);

  // Why did game end?
  gameOverReason = signal('');

  // Result of last bet
  betResult    = signal<'win' | 'lose' | null>(null);

  // Is bet locked (during animation)?
  betLocked    = signal(false);

  // Stats
  handsPlayed  = signal(0);
  wins         = signal(0);
  losses       = signal(0);

  // Tracks dragon/wind values
  // e.g. { 'drag-red': 6, 'wind-east': 4 }
  private tileValues: Record<string, number> = {};

  // COMPUTED VALUES
  // Auto-calculated — same as

  // Total value of current hand
  handTotal = computed(() =>
    this.currentHand().reduce(
      (sum, tile) => sum + tile.value, 0
    )
  );

  // Is draw pile running low?
  isDrawPileLow = computed(() =>
    this.drawPile().length < 6
  );

  // INJECT DECK SERVICE
  // We need DeckService to create tiles!

  constructor(private deckService: DeckService) {}

  // startNewGame()
  // Like reset() 
  // Resets everything and deals first hand
 
  startNewGame(): void {
    // Reset all signals to initial values
    this.score.set(0);
    this.reshuffleCount.set(0);
    this.history.set([]);
    this.isGameOver.set(false);
    this.gameOverReason.set('');
    this.betResult.set(null);
    this.betLocked.set(false);
    this.handsPlayed.set(0);
    this.wins.set(0);
    this.losses.set(0);
    this.tileValues = {};

    // Create and shuffle fresh deck
    const deck = this.deckService.shuffle(
      this.deckService.createDeck()
    );

    // Deal first 3 tiles
    const { drawn, remaining } = this.deckService.drawTiles(deck, 3);

    // Save dragon/wind starting values
    drawn.forEach(tile => {
      if (tile.type !== 'number') {
        this.tileValues[tile.key] = tile.value;
      }
    });

    // Update signals → UI auto updates!
    this.currentHand.set(drawn);
    this.drawPile.set(remaining);
    this.discardPile.set([]);
  }

  // placeBet()
  // This is the MAIN game action!
  // Called when player clicks
  // "Bet Higher" or "Bet Lower"

  placeBet(bet: 'higher' | 'lower'): void {

    // Stop if game over or already processing
    if (this.isGameOver() || this.betLocked()) return;

    // Lock buttons during animation
    this.betLocked.set(true);

    // Get current values
    let drawPile    = this.drawPile();
    let discardPile = this.discardPile();
    let reshuffleCount = this.reshuffleCount();

    // ── Check if reshuffle needed ──
    if (drawPile.length < 3) {
      reshuffleCount++;
      this.reshuffleCount.set(reshuffleCount);

      // Game over on 3rd reshuffle!
      if (reshuffleCount >= 3) {
        setTimeout(() => {
          this.triggerGameOver(
            'Draw Pile ran out 3 times!'
          );
        }, 500);
        return;
      }

      // Reshuffle: fresh deck + discard pile
      const freshDeck = this.deckService.createDeck(
        this.tileValues // preserve dragon/wind values!
      );
      drawPile = this.deckService.shuffle([
        ...freshDeck,
        ...discardPile
      ]);
      discardPile = [];
    }

    // ── Draw next 3 tiles ──
    const { drawn: nextTiles, remaining } =
      this.deckService.drawTiles(drawPile, 3);

    // ── Compare totals ──
    const currentTotal = this.handTotal();
    const nextTotal = this.deckService.calcTotal(nextTiles);

    // ── Win or Lose? ──
    const isWin = bet === 'higher'
      ? nextTotal > currentTotal
      : nextTotal < currentTotal;

    // ── Update dragon/wind tile values ──
    // WIN  → value +1
    // LOSE → value -1
    nextTiles.forEach(tile => {
      if (tile.type !== 'number') {
        const current = this.tileValues[tile.key] ?? 5;
        const newVal  = isWin ? current + 1 : current - 1;
        this.tileValues[tile.key] = newVal;
        tile.value = newVal;
      }
    });

    // ── Update state ──
    this.drawPile.set(remaining);
    this.discardPile.set([
      ...discardPile,
      ...this.currentHand()
    ]);
    this.betResult.set(isWin ? 'win' : 'lose');
    this.handsPlayed.update(h => h + 1);

    if (isWin) {
      this.score.update(s => s + 100);
      this.wins.update(w => w + 1);
    } else {
      this.losses.update(l => l + 1);
    }

    // ── Add to history ──
    const handSnapshot: Hand = {
      tiles:  [...this.currentHand()],
      total:  currentTotal,
      result: isWin ? 'Win' : 'Lose'
    };
    this.history.update(h =>
      [handSnapshot, ...h].slice(0, 6)
    );

    // ── After animation: update hand ──
    setTimeout(() => {
      this.currentHand.set(nextTiles);

      // Check: any tile hit 0 or 10?
      const limitTile = nextTiles.find(tile =>
        tile.type !== 'number' &&
        (tile.value <= 0 || tile.value >= 10)
      );

      if (limitTile) {
        const dir = limitTile.value <= 0
          ? 'minimum (0)'
          : 'maximum (10)';
        this.triggerGameOver(
          `"${limitTile.name}" reached ${dir}!`
        );
        return;
      }

      // Unlock buttons
      this.betLocked.set(false);
    }, 900);
  }


  // triggerGameOver()
  // Ends the game

  triggerGameOver(reason: string): void {
    this.isGameOver.set(true);
    this.gameOverReason.set(reason);
    this.betLocked.set(false);
  }
}
