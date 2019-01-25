export interface Player {
  name: string;
  gamesLost: number;
  gamesPlayed: number;
  gamesWon: number;
  playersBeaten: string[];
  playersLostTo: string[];
  score: number;
}
