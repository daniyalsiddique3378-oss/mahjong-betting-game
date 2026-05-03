//deck.service.ts
//Handles creating , shuffling
//Deck service will have createdeck() , shuffle ()


import { Injectable, numberAttribute } from '@angular/core';
import { Tile } from './models/tile.model';

interface TileDef {
  type:    'number' | 'dragon' | 'wind';
  symbol:  string;
  name:    string;
  suit?:   string;
  dragon?: string;
  wind?:   string;
  num?:    number;
}


@Injectable({
  providedIn: 'root',
})
// All 34 Tiles Definitions
//This is Our data

export class DeckService {
  private readonly TILE_DEFINITIONS: Record<string, TileDef   > = {

    // Number tiles — Characters (1-9)
    'char-1': { type: 'number', suit: 'characters', symbol: '🀇', name: '1 Man' },
    'char-2': { type: 'number', suit: 'characters', symbol: '🀈', name: '2 Man' },
    'char-3': { type: 'number', suit: 'characters', symbol: '🀉', name: '3 Man' },
    'char-4': { type: 'number', suit: 'characters', symbol: '🀊', name: '4 Man' },
    'char-5': { type: 'number', suit: 'characters', symbol: '🀋', name: '5 Man' },
    'char-6': { type: 'number', suit: 'characters', symbol: '🀌', name: '6 Man' },
    'char-7': { type: 'number', suit: 'characters', symbol: '🀍', name: '7 Man' },
    'char-8': { type: 'number', suit: 'characters', symbol: '🀎', name: '8 Man' },
    'char-9': { type: 'number', suit: 'characters', symbol: '🀏', name: '9 Man' },

    // Number tiles — Bamboo (1-9)
    'bam-1': { type: 'number', suit: 'bamboo', symbol: '🀐', name: '1 Bam' },
    'bam-2': { type: 'number', suit: 'bamboo', symbol: '🀑', name: '2 Bam' },
    'bam-3': { type: 'number', suit: 'bamboo', symbol: '🀒', name: '3 Bam' },
    'bam-4': { type: 'number', suit: 'bamboo', symbol: '🀓', name: '4 Bam' },
    'bam-5': { type: 'number', suit: 'bamboo', symbol: '🀔', name: '5 Bam' },
    'bam-6': { type: 'number', suit: 'bamboo', symbol: '🀕', name: '6 Bam' },
    'bam-7': { type: 'number', suit: 'bamboo', symbol: '🀖', name: '7 Bam' },
    'bam-8': { type: 'number', suit: 'bamboo', symbol: '🀗', name: '8 Bam' },
    'bam-9': { type: 'number', suit: 'bamboo', symbol: '🀘', name: '9 Bam' },

    // Number tiles — Circles (1-9)
    'cir-1': { type: 'number', suit: 'circles', symbol: '🀙', name: '1 Cir' },
    'cir-2': { type: 'number', suit: 'circles', symbol: '🀚', name: '2 Cir' },
    'cir-3': { type: 'number', suit: 'circles', symbol: '🀛', name: '3 Cir' },
    'cir-4': { type: 'number', suit: 'circles', symbol: '🀜', name: '4 Cir' },
    'cir-5': { type: 'number', suit: 'circles', symbol: '🀝', name: '5 Cir' },
    'cir-6': { type: 'number', suit: 'circles', symbol: '🀞', name: '6 Cir' },
    'cir-7': { type: 'number', suit: 'circles', symbol: '🀟', name: '7 Cir' },
    'cir-8': { type: 'number', suit: 'circles', symbol: '🀠', name: '8 Cir' },
    'cir-9': { type: 'number', suit: 'circles', symbol: '🀡', name: '9 Cir' },

    // Dragon tiles (3) — start at value 5
    'drag-red': { type: 'dragon', dragon: 'red', symbol: '🀄', name: 'Red Dragon' },
    'drag-green': { type: 'dragon', dragon: 'green', symbol: '🀅', name: 'Grn Dragon' },
    'drag-white': { type: 'dragon', dragon: 'white', symbol: '🀆', name: 'Wht Dragon' },

    // Wind tiles (4) — start at value 5
    'wind-east': { type: 'wind', wind: 'east', symbol: '🀀', name: 'East Wind' },
    'wind-west': { type: 'wind', wind: 'west', symbol: '🀁', name: 'West Wind' },
    'wind-north': { type: 'wind', wind: 'north', symbol: '🀂', name: 'North Wind' },
    'wind-south': { type: 'wind', wind: 'south', symbol: '🀃', name: 'South Wind' },
  };
  //createdeck()
  //create 34 fresh tile
  createDeck(tilevalues: Record<string, number> = {}): Tile[] {
    return Object.entries(this.TILE_DEFINITIONS).map(([key, def]) => {
      //Number tile value = face numberAttribute
      //dragon/wind value = starts at 5
      const num = parseInt(key.split('-')[1]);
      const value = def.type === 'number'
        ? num
        : (tilevalues[key] ?? 5); 
      return { key, ...def, value } as Tile;
    });
  }
  //shuffle()
  //randomize tile order
  //Like real deck shuffling
  shuffle(tiles: Tile[]): Tile[] {
    const arr = [...tiles];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
    return arr;
  }

  drawTiles(pile: Tile[], count: number): {
    drawn: Tile[];
    remaining: Tile[];
  } {
    return {
      drawn: pile.slice(0, count), // first N
      remaining: pile.slice(count)
    };
  }
  // 

  calcTotal(tiles: Tile[]): number {
    return tiles.reduce(
      (sum, tile) => sum + tile.value, 0
    );
  }
}
