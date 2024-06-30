import { useEffect, useRef, useState } from "react";
import {
  useBoardContext,
  usePlayerContext,
  usePlayerPositionContext,
  usePositionNumber,
} from "../context/ScoreboardContext";
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
import loadingImage from "../assets/LikeEffectAnimation.gif";

const PlayerStatusComponent = ({ matchId }: PlayerStatusComponentProps) => {
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
  const { homePosition, awayPosition, homeReady, awayReady } =
    usePlayerPositionContext();
  const { posNum, isHome } = usePositionNumber();
  const [subLength, setSubLength] = useState(0);
  const [idx, setIdx] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const { selected } = useBoardContext();
  const [updateLoaded, setUpdateLoaded] = useState(true);

  const unixToDate = (unixTime: number) => {
    let myDate = new Date(unixTime * 1000);
    return myDate.getFullYear();
  };

  useEffect(() => {
    if (selected) {
      if (homeReady && awayReady) {
        setIsLoaded(true);
      }
    }
  }, [selected, homeReady, awayReady]);

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
        setUpdateLoaded(true);
      })
      .catch((err) => console.log(err));
    if (isHome) {
      setSubLength(homePosition[posNum].length);
    } else {
      setSubLength(awayPosition[posNum].length);
    }
  }, [pId]);

  useEffect(() => {
    try {
      if (isLoaded) {
        if (isHome) {
          setPId(homePosition[posNum][idx - 1].id);
        } else {
          setPId(awayPosition[posNum][idx - 1].id);
        }
      }
    } catch (err) {
      console.error(homePosition[posNum][idx]);
    }
  }, [idx]);

  return (
    <div className="flex w-full h-full items-end justify-center">
      <div className="flex flex-col w-5/6 h-5/6 outline-offset-[-3px] outline-none outline-[#02074B] outline-8 rounded-xl flag_background">
        {/* 상단 */}
        <img className="absolute w-5/6" src={topImage}></img>
        {updateLoaded ? (
          <>
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
            <div className="flex justify-around items-center w-full min-h-[70px] bg-[#05096C]">
              {idx > 1 ? (
                <button
                  className="w-1/4 text-2xl text-white rounded-xl font-['TAEBAEKfont'] bg-[#062D86]"
                  onClick={() => {
                    setIdx(idx - 1);
                    setUpdateLoaded(false);
                  }}
                >
                  이전
                </button>
              ) : (
                <button className="w-1/4 text-2xl text-white rounded-xl font-['TAEBAEKfont'] bg-[#062D86]">
                  {"    "}
                </button>
              )}
              <button
                className="w-1/4 text-2xl text-white rounded-xl font-['TAEBAEKfont'] bg-[#062D86]"
                onClick={() => {
                  setIdx(1);
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
                닫기
              </button>
              {idx < subLength ? (
                <button
                  className="w-1/4 text-2xl text-white rounded-xl font-['TAEBAEKfont'] bg-[#062D86]"
                  onClick={() => {
                    setIdx(idx + 1);
                    setUpdateLoaded(false);
                  }}
                >
                  다음
                </button>
              ) : (
                <button className="w-1/4 text-2xl text-white rounded-xl font-['TAEBAEKfont'] bg-[#062D86]">
                  {"    "}
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="flex w-full h-full justify-center items-center">
            <img src={loadingImage} alt="로딩이미지" className="flex w-32" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerStatusComponent;
