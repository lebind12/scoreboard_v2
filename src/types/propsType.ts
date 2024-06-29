import {
  DefenderStatistics,
  ForwardStatistics,
  GoalkeeperStatistics,
  MidfielderStatistics,
} from "./apiReturnType";

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
  score: number;
  isHome: boolean;
}

export interface CommentComponentProps {
  homeId: number;
  awayId: number;
  matchId: number;
  naverId: string;
  homeName: string;
  awayName: string;
  id: number;
}

export interface BottomLayoutProps {
  homeName: string;
  awayName: string;
  matchId: number;
  homeId: number;
  awayId: number;
  naverId: string;
  id: number;
}

export interface ScreenLayoutProps {
  matchId: number;
  naverId: string;
  homeId: number;
  awayId: number;
  home: string;
  away: string;
  id: number;
  homeCode: string;
  awayCode: string;
}

export interface StatusComponentProps {
  homeId: number;
  awayId: number;
  home: string;
  away: string;
  matchId: number;
}

export interface StatusGraphComponentProps {
  homeStatGrade: number;
  homeStat: string | undefined;
  statName: string;
  awayStat: string | undefined;
  awayStatGrade: number;
}

export interface FormationScreenComponentProps {
  home: string;
  away: string;
  homeId: number;
  awayId: number;
  homeLineup: Array<any>;
  awayLineup: Array<any>;
  homeFormation: string;
  awayFormation: string;
  homeTextColor: string;
  awayTextColor: string;
  homeGoalkeeperTextColor: string;
  awayGoalkeeperTextColor: string;
  homeCode: string;
  awayCode: string;
  matchId: number;
}

export interface TeamFormationComponentProps {
  teamName: string;
  matchId: number;
  teamId: number;
  teamFormation: string;
  teamLineup: Array<any>;
  teamTextColor: string;
  isHome: boolean;
  goalkeeperTextColor: string;
}

export interface PlayerComponentProps {
  teamId: number;
  playerId: number;
  isHome: boolean;
  matchId: number;
  playerNumber: number;
  isGoaley: string;
  playerTextColor: string;
  goalkeeperTextColor: string;
  positionNumber: number;
}

export interface LineupDetail {
  jerseyNumber: string;
  player: PlayerDetail;
  position: string;
  shirtNumber: number;
  statistics: any;
  substitute: boolean;
  positionNumber: string;
}

export interface PlayerDetail {
  country: any;
  dateOfBirthTimestamp: number;
  fieldTranslations: any;
  id: number;
  jerseyNumber: string;
  marketValueCurrency: string;
  name: string;
  position: string;
  shortName: string;
  slug: string;
  userCount: number;
}

export interface PlayerStatusComponentProps {
  matchId: number;
}
export interface StatisticsComponentProps {
  position: string;
  statistics: any;
}

export interface PlayerStatisticDetailComponentProps {
  name: string;
  value: string | unknown;
}
