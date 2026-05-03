//Saves and reads top 5 scores
//using local storage as browser storage



import { Injectable , signal} from '@angular/core';
import { LeaderboardEntry } from './models/tile.model';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  // Key used to save in browser storage
  private readonly KEY = 'mahjong_leaderboard_v1';

  // Signal holds current leaderboard
  entries = signal<LeaderboardEntry[]>([]);
/*
signal is Angular signal --Leaderboard entries hold an array
([]) is an empty array 
 where entries changes , anything using it automatically updates(like UI)
 */
  constructor() {
    // Load saved scores when service starts
    this.loadFromStorage();
  }
  private loadFromStorage(): void {
    try {
      const data = localStorage.getItem(this.KEY);
      const parsed = data ? JSON.parse(data) : [];
      this.entries.set(parsed);   //updates the entries with loaded data
    } catch {
      this.entries.set([]);   //eg corrupted data
    }
  }
  // saveScore()
  // Adds new score, keeps top 5
  saveScore(entry:LeaderboardEntry):void{   //Take new entry
    const current = this.entries();

    //Add new entry
    const updated = [...current,entry]
       .sort((a,b) =>b.score - a.score)
       .slice(0,5);

       //update signal -> UI auto updates!
       this.entries.set(updated);

       //saved to local storage
       localStorage.setItem(
      this.KEY,
      JSON.stringify(updated)
    );
  }
  // getEntries()
  // Returns current leaderboard
  // ─────────────────────────────────
  getEntries(): LeaderboardEntry[] {
    return this.entries();
  }
}
