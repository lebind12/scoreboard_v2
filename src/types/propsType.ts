export interface SelectProps {
  selected: boolean;
}

export interface ScoreComponentProps {
  homeName: string;
  awayName: string;
  matchId: number;
  homeId: number;
  awayId: number;
}

export interface TeamComponentProps {
  teamName: string;
  matchId: number;
  teamId: number;
}

export interface CommentComponentProps {
  nationId: number;
}
