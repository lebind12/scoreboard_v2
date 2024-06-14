export interface MatchDetail {
  away: string;
  home: string;
  sofascoredid: number;
  id: number;
  naverid: number;
  starttime: Date;
}

export interface StatusDetail {
  name: string;
  home: string;
  away: string;
  compareCode: number;
  statisticsType: string;
  valueType: string;
  homeValue: number;
  awayValue: number;
  renderType: number;
  key: string;
}
