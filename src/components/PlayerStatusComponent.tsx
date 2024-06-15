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
    totalPass: 49,
    accuratePass: 44,
    totalLongBalls: 2,
    duelLost: 5,
    duelWon: 6,
    challengeLost: 1,
    dispossessed: 3,
    totalContest: 3,
    wonContest: 2,
    totalTackle: 2,
    wasFouled: 2,
    totalOffside: 1,
    minutesPlayed: 75,
    touches: 61,
    rating: 6.9,
    possessionLostCtrl: 10,
    keyPass: 1,
    ratingVersions: {
      original: 6.9,
      alternative: 6.7,
    },
    expectedAssists: 0.0542089,
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
    console.log(unixTime);
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
    <div className="flex w-full h-full items-center justify-center">
      <div className="flex flex-col w-5/6 h-5/6 bg-white outline-offset-[-3px] outline-none outline-black outline-8 rounded-xl">
        {/* 상단 */}
        <div className="flex flex-col w-full min-h-[200px] bg-slate-300">
          <div className="flex w-full h-full bg-slate-700">
            <div className="grid w-full bg-slate-200 items-center justify-center">
              <img
                src={
                  "https://api.sofascore.app/api/v1/player/" +
                  pId.toString() +
                  "/image"
                }
                className="rounded-full"
              ></img>
            </div>
          </div>
          <div className="flex w-full ">
            <div className="flex flex-col w-full bg-blue-600 items-center justify-center text-xl font-['Freesentation-9Black']">
              {playerBirthYear}년생
            </div>
            <div className="flex flex-col w-full bg-blue-200 items-center justify-center text-xl font-['Freesentation-9Black']">
              {playerName}
            </div>
            <div className="flex flex-col w-full bg-blue-400 items-center justify-center text-xl font-['Freesentation-9Black']">
              {playerPosition}
            </div>
          </div>
        </div>
        {/* 내용 */}
        <div className="flex flex-col w-full h-full items-center justify-center bg-slate-100 font-['MangoDdobak-B']">
          <StatisticsComponent
            position={playerPosition}
            statistics={playerDetail}
          ></StatisticsComponent>
        </div>
        {/* 하단 */}
        <div className="flex flex-col justify-center items-center w-full min-h-[70px] bg-black">
          <button className="w-fit bg-white"> 닫기 </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerStatusComponent;
