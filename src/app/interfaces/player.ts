export interface Player {
  name: string;
  gamesLost: number;
  gamesPlayed: number;
  gamesWon: number;
  gamesTied: number;
  playersBeaten: string[];
  playersLostTo: string[];
  score: number;
  selected: boolean;
}
