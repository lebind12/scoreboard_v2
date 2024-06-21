import { useEffect, useState } from "react";
import { usePlayerContext } from "../context/ScoreboardContext";
import { PlayerStatusComponentProps } from "../types/propsType";
import sofaAPI from "../utils/apis/api/sofaApi";
import API from "../utils/apis/api/api";
import {
  DefenderStatistics,
  ForwardStatistics,
  GoalkeeperStatistics,
  MidfielderStatistics,
} from "../types/apiReturnType";
import StatisticsComponent from "./StatisticsComponent";
import "../styles/animate.css";
import topImage from "../assets/4_top.png";
import Ban from "../assets/Ban.png";

const PlayerStatusComponent = ({ matchId }: PlayerStatusComponentProps) => {
  const defaultGoalkeeperStatistics = {
    totalPass: 33,
    accuratePass: 30,
    totalLongBalls: 7,
    accurateLongBalls: 4,
    aerialWon: 1,
    duelWon: 1,
    totalClearance: 1,
    savedShotsFromInsideTheBox: 2,
    saves: 2,
    punches: 1,
    minutesPlayed: 90,
    touches: 37,
    rating: 6.9,
    possessionLostCtrl: 3,
    ratingVersions: {
      original: 6.9,
      alternative: 6.6,
    },
    goalsPrevented: -0.25,
  };
  const defaultForwardStatistics = {
    totalPass: 9999,
    accuratePass: 1,
    totalLongBalls: 9999,
    duelLost: 9999,
    duelWon: 9999,
    challengeLost: 9999,
    dispossessed: 9999,
    totalContest: 9999,
    wonContest: 9999,
    totalTackle: 9999,
    wasFouled: 9999,
    totalOffside: 9999,
    minutesPlayed: 9999,
    touches: 9999,
    rating: 9999.9999,
    possessionLostCtrl: 9999,
    keyPass: 9999,
    ratingVersions: {
      original: 9999.9999,
      alternative: 9999.9999,
    },
    expectedAssists: 9999.9999,
  };
  const defaultDefenderStatistics = {
    totalPass: 45,
    accuratePass: 43,
    totalLongBalls: 3,
    accurateLongBalls: 2,
    totalClearance: 1,
    outfielderBlock: 2,
    minutesPlayed: 90,
    touches: 50,
    rating: 6.6,
    possessionLostCtrl: 2,
    ratingVersions: {
      original: 6.6,
      alternative: 6.6,
    },
  };
  const defaultMidfielderStatistics = {
    totalPass: 46,
    accuratePass: 42,
    totalLongBalls: 1,
    aerialLost: 1,
    aerialWon: 1,
    duelLost: 1,
    duelWon: 3,
    blockedScoringAttempt: 1,
    totalClearance: 1,
    totalTackle: 1,
    wasFouled: 1,
    minutesPlayed: 90,
    touches: 51,
    rating: 6.8,
    possessionLostCtrl: 4,
    expectedGoals: 0.0167,
    ratingVersions: {
      original: 6.8,
      alternative: 6.7,
    },
    expectedAssists: 0.0424998,
  };
  const { pId, setPId } = usePlayerContext();
  const [playerDetail, setPlayerDetail] = useState<
    | DefenderStatistics
    | MidfielderStatistics
    | ForwardStatistics
    | GoalkeeperStatistics
  >(defaultForwardStatistics);
  const [playerPosition, setPlayerPosition] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [playerBirthYear, setPlayerBirthYear] = useState(0);

  const unixToDate = (unixTime: number) => {
    let myDate = new Date(unixTime * 1000);
    return myDate.getFullYear();
  };

  useEffect(() => {
    let url =
      "event/" +
      matchId.toString() +
      "/player/" +
      pId.toString() +
      "/statistics";
    let h = {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    };
    // let url = "event/12173506" + "/player/" + pId.toString() + "/statistics";
    sofaAPI
      .get(url, { headers: h })
      .then((res) => {
        setPlayerDetail(res.data.statistics);
        switch (res.data.position) {
          case "F":
            setPlayerPosition("공격수");
            break;
          case "M":
            setPlayerPosition("미드필더");
            break;
          case "D":
            setPlayerPosition("수비수");
            break;
          default:
            setPlayerPosition("골키퍼");
            break;
        }
        let params = { player_id: pId };
        API.get("/player/id", { params })
          .then((res) => setPlayerName(res.data.familyname))
          .catch((err) => console.log(err));
        setPlayerBirthYear(unixToDate(res.data.player.dateOfBirthTimestamp));
      })
      .catch((err) => console.log(err));
  }, [pId]);

  return (
    <div className="flex w-full h-full items-end justify-center">
      <div className="flex flex-col w-5/6 h-5/6 outline-offset-[-3px] outline-none outline-[#02074B] outline-8 rounded-xl flag_background">
        {/* 상단 */}
        <img className="absolute w-5/6" src={topImage}></img>
        <div className="flex flex-col w-full min-h-[200px]">
          <div className="flex w-full h-full">
            <div className="grid w-full items-center justify-center">
              <img
                src={
                  "https://api.sofascore.app/api/v1/player/" +
                  pId.toString() +
                  "/image"
                }
                className="pt-2 w-[120px] rounded-full"
              ></img>
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex flex-col w-full items-center justify-center text-xl font-['Freesentation-9Black'] text-white bg-[#05096C]  drop-shadow-[2px_0_0px_rgba(255,255,255,1)]">
              <span>{playerBirthYear}년생</span>
            </div>
            <div className="flex flex-col w-full items-center justify-center text-xl font-['Freesentation-9Black'] text-white bg-[#05096C]">
              <span>{playerName}</span>
            </div>
            <div className="flex flex-col w-full items-center justify-center text-xl font-['Freesentation-9Black'] text-white bg-[#05096C]  drop-shadow-[-2px_0_0px_rgba(255,255,255,1)]">
              <span>{playerPosition}</span>
            </div>
          </div>
        </div>
        {/* 내용 */}
        <div className="flex flex-col w-full h-full items-center justify-center font-['MangoDdobak-B'] text-white">
          <StatisticsComponent
            position={playerPosition}
            statistics={playerDetail}
          ></StatisticsComponent>
        </div>
        {/* 하단 */}
        <div className="flex flex-col justify-center items-center w-full min-h-[70px] bg-[#05096C]">
          <button
            className="w-1/3 text-2xl text-white rounded-xl font-['TAEBAEKfont'] bg-[#062D86]"
            onClick={() => {
              document
                .getElementById("GameStatistics")
                ?.classList.remove("go_behind_animation");
              document
                .getElementById("GameStatistics")
                ?.classList.add("go_toward_animation");
              document
                .getElementById("PlayerStatistics")
                ?.classList.remove("animate__backInLeft");
              document
                .getElementById("PlayerStatistics")
                ?.classList.add("animate__fadeOutLeftBig");
            }}
          >
            {"  "}
            닫기
            {"  "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerStatusComponent;
