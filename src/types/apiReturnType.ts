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

export interface GoalkeeperStatistics {
  totalPass: number;
  accuratePass: number;
  totalLongBalls: number;
  accurateLongBalls: number;
  aerialWon: number;
  duelWon: number;
  totalClearance: number;
  savedShotsFromInsideTheBox: number;
  saves: number;
  punches: number;
  minutesPlayed: number;
  touches: number;
  rating: number;
  possessionLostCtrl: number;
  ratingVersions: {
    original: number;
    alternative: number;
  };
  goalsPrevented: number;
}
export interface ForwardStatistics {
  totalPass: number;
  accuratePass: number;
  totalLongBalls: number;
  duelLost: number;
  duelWon: number;
  challengeLost: number;
  dispossessed: number;
  totalContest: number;
  wonContest: number;
  totalTackle: number;
  wasFouled: number;
  totalOffside: number;
  minutesPlayed: number;
  touches: number;
  rating: number;
  possessionLostCtrl: number;
  keyPass: number;
  ratingVersions: {
    original: number;
    alternative: number;
  };
  expectedAssists: number;
}

export interface MidfielderStatistics {
  totalPass: number;
  accuratePass: number;
  totalLongBalls: number;
  aerialLost: number;
  aerialWon: number;
  duelLost: number;
  duelWon: number;
  blockedScoringAttempt: number;
  totalClearance: number;
  totalTackle: number;
  wasFouled: number;
  minutesPlayed: number;
  touches: number;
  rating: number;
  possessionLostCtrl: number;
  expectedGoals: number;
  ratingVersions: {
    original: number;
    alternative: number;
  };
  expectedAssists: number;
}

export interface DefenderStatistics {
  totalPass: number;
  accuratePass: number;
  totalLongBalls: number;
  accurateLongBalls: number;
  totalClearance: number;
  outfielderBlock: number;
  minutesPlayed: number;
  touches: number;
  rating: number;
  possessionLostCtrl: number;
  ratingVersions: {
    original: number;
    alternative: number;
  };
}

export interface TextRelay {
  no: number;
  eventType: string;
  flag: string;
  homeOrAway: string;
  time: string;
  normalTime: string;
  addedTime: string;
  homeScore: number;
  awayScore: number;
  ptHomeScore: number;
  ptAwayScore: number;
  homeScorePlayer: string | null;
  awayScorePlayer: string | null;
  half: string;
  playerId: string;
  playerName: string;
  videoMasterId: number | null;
  text: string;
  statusCode: number;
  statusInfo: string;
  eventName: string;
  eventText: string;
  eventClassName: string;
}
