
export type TileType = 'number' | 'dragon' | 'wind';
//TileType can be either of them

export interface Tile{
   key: string;    // unique ID
   type:TileType;  // number | dragon | winds
   symbol:string;  // emoji '🀄'
   name:string;    // Display name
   value:number;   // current value is 5
   suit:string;   //  for number tiles
   dragon:string; //  for dragon tiles
   wind:string;   //  for dragon tiles
}
// Tile interface = details of tiles

export interface Hand{
    tiles:Tile[];    //3 tiles will be given
    total:number;    // sum of all 3 tiles per turn
    result?: 'Win' | 'Lose' // result after bet
}
//Hand = group of three tiles

export interface LeaderboardEntry {
  name:   string; // player name
  score:  number; // final score
  hands:  number; // how many hands played
  wins:   number; // how many wins
  date:   string; // date played
}