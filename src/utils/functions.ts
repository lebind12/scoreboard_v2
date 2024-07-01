interface PlayerDetailContext {
  [key: string]: string;
}

interface APIPlayerProps {
  name: string;
  slug: string;
  shortName: string;
  position: string;
  jerseyNumber: string;
  userCount: number;
  id: number;
  marketValueCurrency: string;
  dateOfBirthTimestamp: number;
}

interface PlayerStatus {
  id: number;
  name: string;
  player: any;
  jerseyNumber: number;
  goalCount: number;
  isWarned: boolean;
  isBanned: boolean;
  substitution: boolean;
  position: string;
}

interface PositionObject {
  [key: number]: PlayerStatus[];
}

export const changePlayer = async (
  currentPlayer: APIPlayerProps,
  newPlayer: APIPlayerProps,
  isHome: boolean,
  homeLineup: PlayerDetailContext,
  awayLineup: PlayerDetailContext,
  addHomePosition: (positionNumber: number, player: PlayerStatus) => void,
  addAwayPosition: (positionNumber: number, player: PlayerStatus) => void,
  setChangeCount: () => void
) => {
  try {
    let elem = document.getElementById(currentPlayer.id.toString());
    if (typeof elem !== "undefined") {
      if (isHome) {
        let positionNumber = getPositionNumber(currentPlayer, isHome);
        if (typeof positionNumber !== "undefined") {
          addHomePosition(parseInt(positionNumber), {
            id: newPlayer.id,
            name: getPlayerName(newPlayer.id, homeLineup, awayLineup, isHome),
            player: newPlayer,
            jerseyNumber: parseInt(newPlayer["jerseyNumber"]),
            goalCount: 0,
            isWarned: false,
            isBanned: false,
            substitution: true,
            position: positionNumber.toString(),
          });
        }

        if (elem) elem.id = newPlayer.id.toString();
      } else {
        let positionNumber = getPositionNumber(currentPlayer, isHome);
        if (typeof positionNumber !== "undefined")
          addAwayPosition(parseInt(positionNumber), {
            id: newPlayer.id,
            name: getPlayerName(newPlayer.id, homeLineup, awayLineup, isHome),
            player: newPlayer,
            jerseyNumber: parseInt(newPlayer["jerseyNumber"]),
            goalCount: 0,
            isWarned: false,
            isBanned: false,
            substitution: true,
            position: positionNumber.toString(),
          });
        if (elem) elem.id = newPlayer.id.toString();
      }
      setChangeCount();
    }
  } catch (err) {
    console.error(err);
  }
  return;
};

export const getPositionNumber = (player: APIPlayerProps, isHome: boolean) => {
  try {
    let elem = document.getElementById(player.id.toString());
    if (isHome) {
      if (elem) {
        for (let data of elem.classList.value.split(" ")) {
          if (data.includes("home_sub")) {
            return data.split("_")[2];
          }
        }
      }
    } else {
      if (elem) {
        for (let data of elem.classList.value.split(" ")) {
          if (data.includes("away_sub")) {
            return data.split("_")[2];
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const banPlayer = (
  player: APIPlayerProps,
  homePosition: PositionObject,
  awayPosition: PositionObject,
  isHome: boolean,
  setChangeCount: () => void
) => {
  try {
    let elem = document.getElementById(player.id.toString());
    if (typeof elem !== "undefined") {
      let positionNumber = getPositionNumber(player, isHome);
      if (isHome) {
        if (typeof positionNumber !== "undefined") {
          homePosition[parseInt(positionNumber)][0].isBanned = true;
        }
      } else {
        if (typeof positionNumber !== "undefined") {
          awayPosition[parseInt(positionNumber)][0].isBanned = true;
        }
      }
      setChangeCount();
    }
  } catch (err) {
    console.error(
      "banError ",
      "player:",
      player,
      "homePosition:",
      homePosition,
      "awayPosition:",
      awayPosition
    );
    console.error(err);
  }
  return;
};

export const unBanPlayer = (
  player: APIPlayerProps,
  homePosition: PositionObject,
  awayPosition: PositionObject,
  isHome: boolean,
  setChangeCount: () => void
) => {
  try {
    let elem = document.getElementById(player.id.toString());
    if (typeof elem !== "undefined") {
      let positionNumber = getPositionNumber(player, isHome);
      if (isHome) {
        if (typeof positionNumber !== "undefined") {
          homePosition[parseInt(positionNumber)][0].isBanned = false;
        }
      } else {
        if (typeof positionNumber !== "undefined") {
          awayPosition[parseInt(positionNumber)][0].isBanned = false;
        }
      }
      setChangeCount();
    }
  } catch (err) {
    console.error(
      "unbanError ",
      "player:",
      player,
      "homePosition:",
      homePosition,
      "awayPosition:",
      awayPosition
    );
    console.error(err);
  }

  return;
};

export const warnedPlayer = (
  player: APIPlayerProps,
  homePosition: PositionObject,
  awayPosition: PositionObject,
  isHome: boolean,
  setChangeCount: () => void
) => {
  try {
    let elem = document.getElementById(player.id.toString());
    if (typeof elem !== "undefined") {
      let positionNumber = getPositionNumber(player, isHome);
      if (isHome) {
        if (typeof positionNumber !== "undefined") {
          homePosition[parseInt(positionNumber)][0].isWarned = true;
        }
      } else {
        if (typeof positionNumber !== "undefined") {
          awayPosition[parseInt(positionNumber)][0].isWarned = true;
        }
      }
      setChangeCount();
    }
  } catch (err) {
    console.error(
      "warnedError ",
      "player:",
      player,
      "homePosition:",
      homePosition,
      "awayPosition:",
      awayPosition
    );
    console.error(err);
  }
};

export const scoredPlayer = (
  player: APIPlayerProps,
  homePosition: PositionObject,
  awayPosition: PositionObject,
  isHome: boolean,
  setChangeCount: () => void
) => {
  try {
    let elem = document.getElementById(player.id.toString());
    if (typeof elem !== "undefined") {
      let positionNumber = getPositionNumber(player, isHome);
      if (isHome) {
        if (typeof positionNumber !== "undefined") {
          homePosition[parseInt(positionNumber)][0].goalCount += 1;
        }
      } else {
        if (typeof positionNumber !== "undefined") {
          awayPosition[parseInt(positionNumber)][0].goalCount += 1;
        }
      }
      setChangeCount();
    }
  } catch (err) {}
};

const getPlayerName = (
  playerCode: number,
  homeLineup: PlayerDetailContext,
  awayLineup: PlayerDetailContext,
  isHome: boolean
) => {
  let key = playerCode.toString();
  if (isHome) return homeLineup[key];
  else return awayLineup[key];
};

export const makeComment = (
  homeName: string,
  awayName: string,
  relayData: any,
  homeLineup: PlayerDetailContext,
  awayLineup: PlayerDetailContext,
  homePosition: PositionObject,
  awayPosition: PositionObject,
  addHomePosition: (positionNumber: number, player: PlayerStatus) => void,
  addAwayPosition: (positionNumber: number, player: PlayerStatus) => void,
  setChangeCount: () => void
) => {
  try {
    let comment = {
      title: "",
      detail: "",
      flag: "",
    };

    if (relayData.type === "cornerKick") {
      comment.title = " 코너킥";
      if (relayData.isHome) {
        comment.title = homeName + comment.title;
        comment.flag = homeName;
      } else {
        comment.title = awayName + comment.title;
        comment.flag = awayName;
      }
      let playerName = getPlayerName(
        relayData.player.id,
        homeLineup,
        awayLineup,
        relayData.isHome
      );
      comment.detail = playerName + " 이(가) 코너킥을 준비합니다.";
    } else if (relayData.type === "shotSaved") {
      comment.title = " 슈팅";
      if (relayData.isHome) {
        comment.title = homeName + comment.title;
        comment.flag = homeName;
      } else {
        comment.title = awayName + comment.title;
        comment.flag = awayName;
      }
      let playerName = getPlayerName(
        relayData.player.id,
        homeLineup,
        awayLineup,
        relayData.isHome
      );
      comment.detail = playerName + "의 슈팅, 그러나 골키퍼 선방에 막힙니다.";
    } else if (relayData.type === "freeKickWon") {
      comment.title = " 프리킥";
      if (relayData.isHome) {
        comment.title = homeName + comment.title;
        comment.flag = homeName;
      } else {
        comment.title = awayName + comment.title;
        comment.flag = awayName;
      }
      let playerName = getPlayerName(
        relayData.player.id,
        homeLineup,
        awayLineup,
        relayData.isHome
      );
      comment.detail = playerName + " 이(가) 프리킥을 얻어냅니다.";
    } else if (relayData.type === "freeKickLost") {
      comment.title = " 파울, 프리킥";
      if (relayData.isHome) {
        comment.title = homeName + comment.title;
        comment.flag = homeName;
      } else {
        comment.title = awayName + comment.title;
        comment.flag = awayName;
      }
      let playerName = getPlayerName(
        relayData.player.id,
        homeLineup,
        awayLineup,
        relayData.isHome
      );
      comment.detail = playerName + "의 파울로 프리킥.";
    } else if (relayData.type === "offside") {
      comment.title = " 오프사이드";
      if (relayData.isHome) {
        comment.title = homeName + comment.title;
        comment.flag = homeName;
      } else {
        comment.title = awayName + comment.title;
        comment.flag = awayName;
      }
      let playerName = getPlayerName(
        relayData.player.id,
        homeLineup,
        awayLineup,
        relayData.isHome
      );
      comment.detail = playerName + " 이(가) 오프사이드에 걸립니다.";
    } else if (relayData.type === "shotBlocked") {
      comment.title = " 슈팅";
      if (relayData.isHome) {
        comment.title = homeName + comment.title;
        comment.flag = homeName;
      } else {
        comment.title = awayName + comment.title;
        comment.flag = awayName;
      }
      let playerName = getPlayerName(
        relayData.player.id,
        homeLineup,
        awayLineup,
        relayData.isHome
      );
      comment.detail = playerName + "의 슈팅, 그러나 골키퍼 선방에 막힙니다.";
    } else if (relayData.type === "shotOffTarget") {
      comment.title = " 슈팅";
      if (relayData.isHome) {
        comment.title = homeName + comment.title;
        comment.flag = homeName;
      } else {
        comment.title = awayName + comment.title;
        comment.flag = awayName;
      }
      let playerName = getPlayerName(
        relayData.player.id,
        homeLineup,
        awayLineup,
        relayData.isHome
      );
      comment.detail = playerName + "의 슈팅, 그러나 빗나갑니다.";
    } else if (relayData.type === "yellowCard") {
      comment.title = " 경고";
      if (relayData.isHome) {
        comment.title = homeName + comment.title;
        comment.flag = homeName;
      } else {
        comment.title = awayName + comment.title;
        comment.flag = awayName;
      }
      let playerName = getPlayerName(
        relayData.player.id,
        homeLineup,
        awayLineup,
        relayData.isHome
      );
      warnedPlayer(
        relayData.player,
        homePosition,
        awayPosition,
        relayData.isHome,
        setChangeCount
      );
      comment.detail = playerName + " 경고. 옐로우카드를 받습니다.";
    } else if (relayData.type === "redCard") {
      comment.title = " 경고";
      if (relayData.isHome) {
        comment.title = homeName + comment.title;
        comment.flag = homeName;
      } else {
        comment.title = awayName + comment.title;
        comment.flag = awayName;
      }
      let playerName = getPlayerName(
        relayData.player.id,
        homeLineup,
        awayLineup,
        relayData.isHome
      );
      banPlayer(
        relayData.player,
        homePosition,
        awayPosition,
        relayData.isHome,
        setChangeCount
      );
      comment.detail = playerName + " 퇴장. 레드카드를 받습니다.";
    } else if (relayData.type === "scoreChange") {
      if (relayData.text.includes("Own Goal")) comment.title = " 자책골!";
      else comment.title = " 득점!";
      if (relayData.isHome) {
        comment.title = homeName + comment.title;
        comment.flag = homeName;
      } else {
        comment.title = awayName + comment.title;
        comment.flag = awayName;
      }
      let playerName = getPlayerName(
        relayData.player.id,
        homeLineup,
        awayLineup,
        relayData.isHome
      );
      if (relayData.text.includes("Own Goal"))
        comment.detail = playerName + " 가 자책골을 기록합니다.";
      else comment.detail = playerName + "가 득점을 기록합니다. ";
      if (Object.hasOwn(relayData, "assist1")) {
        let playerName1 = getPlayerName(
          relayData.assist1.id,
          homeLineup,
          awayLineup,
          relayData.isHome
        );
        if (relayData.player.id !== relayData.assist1.id)
          comment.detail = comment.detail + playerName1 + "의 어시스트";
      }
      scoredPlayer(
        relayData.player,
        homePosition,
        awayPosition,
        relayData.isHome,
        setChangeCount
      );
    } else if (relayData.type === "substitution") {
      comment.title = " 교체";
      if (relayData.isHome) {
        comment.title = homeName + comment.title;
        comment.flag = homeName;
      } else {
        comment.title = awayName + comment.title;
        comment.flag = awayName;
      }

      let playerName1 = getPlayerName(
        relayData.playerIn.id,
        homeLineup,
        awayLineup,
        relayData.isHome
      );
      comment.detail = playerName1 + " 들어가고 ";
      let playerName2 = getPlayerName(
        relayData.playerOut.id,
        homeLineup,
        awayLineup,
        relayData.isHome
      );
      changePlayer(
        relayData.playerOut,
        relayData.playerIn,
        relayData.isHome,
        homeLineup,
        awayLineup,
        addHomePosition,
        addAwayPosition,
        setChangeCount
      );
      comment.detail = comment.detail + playerName2 + " 나갑니다";
    } else if (relayData.type === "penaltyScored") {
      comment.title = " 승부차기 득점.";
      if (relayData.isHome) {
        comment.title = homeName + comment.title;
        comment.flag = homeName;
      } else {
        comment.title = awayName + comment.title;
        comment.flag = awayName;
      }
      let playerName = getPlayerName(
        relayData.player.id,
        homeLineup,
        awayLineup,
        relayData.isHome
      );
      comment.detail = playerName + "의 슈팅. 성공합니다.";
    } else if (relayData.type === "penaltySaved") {
      comment.title = " 승부차기 실패.";
      if (relayData.isHome) {
        comment.title = homeName + comment.title;
        comment.flag = homeName;
      } else {
        comment.title = awayName + comment.title;
        comment.flag = awayName;
      }
      let playerName = getPlayerName(
        relayData.player.id,
        homeLineup,
        awayLineup,
        relayData.isHome
      );
      comment.detail = playerName + "의 슈팅. 실패합니다.";
    } else if (relayData.type === "matchStarted") {
      comment.title = "경기 시작";
      comment.detail = homeName + "-" + awayName + " 시작합니다.";
      comment.flag = "None";
    } else if (relayData.type === "matchEnded") {
      comment.title = "경기 종료";
      comment.detail = homeName + "-" + awayName + " 종료됩니다.";
      comment.flag = "None";
    } else if (relayData.type === "endFirstHalf") {
      comment.title = "전반전 종료";
      comment.detail = homeName + "-" + awayName + " 경기 전반 종료.";
      comment.flag = "None";
    } else if (relayData.type === "endSecondHalf") {
      comment.title = "후반전 종료";
      comment.detail = homeName + "-" + awayName + " 경기 후반 종료.";
      comment.flag = "None";
    } else if (relayData.type === "periodEnd") {
      comment.title = "연장전 ";
      if (relayData.periodName == "ET1")
        comment.title = comment.title + "전반 종료";
      else if (relayData.periodName == "ET2")
        comment.title = comment.title + "후반 종료";
      else if (relayData.periodName == "PEN") comment.title = "승부차기 종료";
      comment.detail = homeName + "-" + awayName;
      comment.flag = "None";
    } else {
      comment.title = "No title";
      comment.detail = "No data";
      comment.flag = "No Data";
    }

    return comment;
  } catch (err) {
    console.log(err);
    let comment = {
      title: "",
      detail: "",
      flag: "",
    };
    comment.title = "No title";
    comment.detail = "No data";
    comment.flag = "No Data";
    return comment;
  }
};
