import TeamComponent from "./TeamComponent";
import { ScoreComponentProps } from "../types/propsType";
import useContextMenu from "../hooks/contextMenuHook";
import { useState } from "react";
import useInterval from "../hooks/intervalHook";
import { useScoreContext } from "../context/ScoreboardContext";

const ScoreComponent = ({
  homeName,
  awayName,
  matchId,
  homeId,
  awayId,
}: ScoreComponentProps) => {
  // TODO
  //
  const { HomeScore, AwayScore, setHomeScore, setAwayScore } =
    useScoreContext();
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
      setSecond(0);
    } else {
      setSecond(second + 1);
    }
  }, 1000);

  return (
    <div className="flex flex-col w-full h-full p-2">
      <div className="flex w-full h-1/4">
        <div className="flex w-full h-full items-center rounded-lg">
          <span
            id="Timer"
            className="grid text-5xl w-full h-full font-bold bg-white z-10 items-center text-center font-['LABDigital']"
          >
            {makeMinute(minute)}:{makeSecond(second)}
          </span>
          <h2 className="text-2xl h-full items-center font-bold bg-pink-400 p-2 rounded-r-lg animate__animated animate__slideInLeft">
            +9
          </h2>
        </div>
        <div className="flex w-full text-4xl items-center justify-center font-['Freesentation-9Black']">
          <input className="bg-transparent w-full text-center"></input>
        </div>
      </div>
      <div className="h-3/4">
        <div className="w-full h-1/2 bg-amber-300">
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
            />
          </button>
        </div>
        <div className="w-full h-1/2 bg-amber-900">
          <button className="w-full h-full">
            <TeamComponent
              teamName={awayName}
              matchId={matchId}
              teamId={awayId}
              score={AwayScore}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreComponent;
