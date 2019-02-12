export interface Player {
  name: string;
  gamesLost: number;
  gamesPlayed: number;
  gamesWon: number;
  gamesTied: number;
  playersBeaten: any[];
  playersLostTo: any[];
  score: number;
  selected: boolean;
}
