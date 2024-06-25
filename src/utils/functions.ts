interface PlayerDetailContext {
  [key: string]: string;
}
export const changePlayer = async (
  currentPlayerId: number,
  newPlayerId: number,
  newPlayerName: string
) => {
  try {
    let elem: any = document.getElementById(
      "player" + currentPlayerId.toString()
    )?.childNodes[0];
    elem.childNodes[4].childNodes[0].classList.remove("hidden");
    elem.childNodes[5].textContent = newPlayerName;
    elem.id = "player" + newPlayerId.toString();
  } catch {}
  return;
};

export const banPlayer = (playerId: number) => {
  try {
    let elem: any = document.getElementById("player" + playerId.toString())
      ?.childNodes[0].childNodes[1];
    elem.classList.remove("hidden");
  } catch {}
  return;
};

export const unBanPlayer = (playerId: number) => {
  try {
    let elem: any = document.getElementById("player" + playerId.toString())
      ?.childNodes[0].childNodes[1];
    elem.classList.add("hidden");
  } catch {}

  return;
};

export const warnedPlayer = (playerId: number) => {
  try {
    let elem: any = document.getElementById("player" + playerId.toString())
      ?.childNodes[0].childNodes[3].childNodes[0];
    elem.classList.remove("hidden");
  } catch {}
};

const isHome = (ishome: boolean) => {
  if (ishome) return "Home";
  else return "Away";
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
  awayLineup: PlayerDetailContext
) => {
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
    warnedPlayer(relayData.player.id);
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
    banPlayer(relayData.player.id);
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
      comment.detail = " 가 자책골을 기록합니다.";
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
    changePlayer(relayData.playerOut.id, relayData.playerIn.id, playerName1);
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
};
