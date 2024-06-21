import TeamComponent from "./TeamComponent";
import { ScoreComponentProps } from "../types/propsType";
import useContextMenu from "../hooks/contextMenuHook";
import { useState } from "react";
import useInterval from "../hooks/intervalHook";
import { useScoreContext, useTimeContext } from "../context/ScoreboardContext";

const ScoreComponent = ({
  homeName,
  awayName,
  matchId,
  homeId,
  awayId,
}: ScoreComponentProps) => {
  // TODO
  //
  const { HomeScore, AwayScore, injuryTime, setHomeScore, setAwayScore } =
    useScoreContext();
  const { currentMinute, setCurrentMinute } = useTimeContext();
  const [time, setTime] = useState("00:00");
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);

  const makeSecond = (second: number) => {
    if (second < 10) {
      return "0" + second.toString();
    } else {
      return second.toString();
    }
  };

  const makeMinute = (minute: number) => {
    if (minute < 10) {
      return "0" + minute.toString();
    } else {
      return minute.toString();
    }
  };

  useInterval(() => {
    if (second + 1 >= 60) {
      setMinute(minute + 1);
      setCurrentMinute(minute + 1);
      setSecond(0);
    } else {
      setSecond(second + 1);
    }
  }, 1000);

  return (
    <div className="flex flex-col w-full h-[50px]">
      <div className="flex h-full items-center">
        <div className="w-full h-full">
          <button
            className="w-full h-full"
            onClick={() => {
              let time = prompt("시간 입력. 사이에 : 가 있어야합니다.");
              if (time !== null && time.includes(":")) {
                setTime(time);
                let a = time.split(":");
                setSecond(parseInt(a[1]));
                setMinute(parseInt(a[0]));
              }
            }}
          >
            <TeamComponent
              teamName={homeName}
              matchId={matchId}
              teamId={homeId}
              score={HomeScore}
              isHome={true}
            />
          </button>
        </div>
        <div className="h-full border-l-2 border-[#0D35B2]"></div>
        <div className="w-full h-full bg-amber-900">
          <button className="w-full h-full">
            <TeamComponent
              teamName={awayName}
              matchId={matchId}
              teamId={awayId}
              score={AwayScore}
              isHome={false}
            />
          </button>
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-5/12"></div>
        <div className="flex w-1/6 h-full items-center rounded-lg">
          <span
            id="Timer"
            className="grid text-3xl w-full h-full font-bold bg-[#133DDA] text-black z-10 items-center text-center font-['LABDigital']"
            style={{
              textShadow:
                "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white",
            }}
          >
            {makeMinute(minute)}:{makeSecond(second)}
          </span>
        </div>
        <span
          className="grid pl-2 pr-2 text-xl h-full items-center font-bold bg-[#FFC901] text-white rounded-r-lg animate__animated animate__slideInLeft"
          style={{
            textShadow:
              "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
          }}
        >
          +{injuryTime}
        </span>
        {/* <div className="flex w-full text-4xl items-center justify-center font-['Freesentation-9Black']">
          <input className="bg-transparent w-full text-center"></input>
        </div> */}
      </div>
    </div>
  );
};

export default ScoreComponent;
