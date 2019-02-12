export interface Player {
  name: string;
  gamesLost: number;
  gamesPlayed: number;
  gamesWon: number;
  gamesTied: number;
  playersBeaten: object[];
  playersLostTo: object[];
  score: number;
  selected: boolean;
}
