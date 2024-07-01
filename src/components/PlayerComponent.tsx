import { useEffect, useState } from "react";
import { PlayerComponentProps } from "../types/propsType";
import API from "../utils/apis/api/api";
import {
  useBoardContext,
  usePlayerContext,
  usePlayerLineUpContext,
  usePlayerPositionContext,
  usePositionNumber,
} from "../context/ScoreboardContext";
import playerSubstitution from "../assets/playerSubstitution.png";
import Ban from "../assets/Ban.png";
import Goal from "../assets/Goal.png";
import useInterval from "../hooks/intervalHook";

const PlayerComponent = ({
  teamId,
  playerTextColor,
  goalkeeperTextColor,
  playerId,
  matchId,
  isHome,
  playerNumber,
  isGoaley,
  positionNumber,
}: PlayerComponentProps) => {
  const [playerName, setPlayerName] = useState("");
  // const [goalKeeper, setGoalKeeper] = useState(false);
  const [url, setURL] = useState("player/fancy");
  const [backColor, setBackColor] = useState("");
  const [scored, setScored] = useState(false);
  const [warned, setWarned] = useState(false);
  const [banned, setBanned] = useState(false);
  const [subbed, setSubbed] = useState(false);
  const { pId, setPId } = usePlayerContext();
  const { homePosition, awayPosition, homeReady, awayReady, changeCount } =
    usePlayerPositionContext();
  const [isLoaded, setIsLoaded] = useState(false);
  const { selected } = useBoardContext();
  const { HomeLineUpIDMatch, AwayLineUpIDMatch } = usePlayerLineUpContext();
  const { setPosNum, setHome } = usePositionNumber();

  useEffect(() => {
    if (isLoaded) {
      if (isHome) {
        if (homePosition[positionNumber][0].goalCount > 0) setScored(true);
        else setScored(false);
      } else {
        if (awayPosition[positionNumber][0].goalCount > 0) setScored(true);
        else setScored(false);
      }
    }
  }, [
    homePosition[positionNumber][0]?.goalCount,
    awayPosition[positionNumber][0]?.goalCount,
    changeCount,
  ]);

  useEffect(() => {
    if (isLoaded)
      if (isHome) {
        if (homePosition[positionNumber][0].isWarned) setWarned(true);
        else setWarned(false);
      } else {
        if (awayPosition[positionNumber][0].isWarned) setWarned(true);
        else setWarned(false);
      }
  }, [
    homePosition[positionNumber][0]?.isWarned,
    awayPosition[positionNumber][0]?.isWarned,
    changeCount,
  ]);

  useEffect(() => {
    if (isLoaded)
      if (isHome) {
        if (homePosition[positionNumber][0].substitution) setSubbed(true);
        else setWarned(false);
      } else {
        if (awayPosition[positionNumber][0].substitution) setSubbed(true);
        else setWarned(false);
      }
  }, [
    homePosition[positionNumber][0]?.substitution,
    awayPosition[positionNumber][0]?.substitution,
    changeCount,
  ]);

  useEffect(() => {
    if (isLoaded)
      if (isHome) {
        if (homePosition[positionNumber][0].isBanned) setBanned(true);
        else setBanned(false);
      } else {
        if (awayPosition[positionNumber][0].isBanned) setBanned(true);
        else setBanned(false);
      }
  }, [
    homePosition[positionNumber][0]?.isBanned,
    awayPosition[positionNumber][0]?.isBanned,
    changeCount,
  ]);

  const selectPlayer = () => {
    if (isHome) setPId(homePosition[positionNumber][0].player.id);
    else setPId(awayPosition[positionNumber][0].player.id);
    setPosNum(positionNumber);
    setHome(isHome);
  };

  useEffect(() => {
    if (selected) {
      if (homeReady && awayReady) {
        setIsLoaded(true);
      }
    }
  }, [selected, homeReady, awayReady]);

  useEffect(() => {
    if (isLoaded)
      if (isHome) {
        if (homePosition[positionNumber][0].position === "G") {
          setURL("goalkeeper/fancy");
          setBackColor(goalkeeperTextColor);
        } else {
          setBackColor(playerTextColor);
        }
      } else {
        if (awayPosition[positionNumber][0].position === "G") {
          setURL("goalkeeper/fancy");
          setBackColor(goalkeeperTextColor);
        } else {
          setBackColor(playerTextColor);
        }
      }
  }, [positionNumber, isLoaded]);

  return (
    <>
      {isLoaded ? (
        <>
          {isHome ? (
            <>
              {subbed ? (
                <div
                  id={homePosition[positionNumber][0].player.id}
                  className={
                    "flex flex-col w-full items-center animate__animated animate__flash" +
                    " home_sub_" +
                    positionNumber.toString()
                  }
                >
                  <button
                    className={"flex flex-col w-full items-center"}
                    onClick={() => {
                      selectPlayer();
                      document
                        .getElementById("GameStatistics")
                        ?.classList.remove("go_toward_animation");
                      document
                        .getElementById("GameStatistics")
                        ?.classList.add("go_behind_animation");
                      document
                        .getElementById("PlayerStatistics")
                        ?.classList.remove("animate__fadeOutLeftBig");
                      document
                        .getElementById("PlayerStatistics")
                        ?.classList.add("animate__backInLeft");
                    }}
                  >
                    <img
                      src={
                        "https://api.sofascore.app/api/v1/event/" +
                        matchId.toString() +
                        "/jersey/home/" +
                        url
                      }
                      className="w-[32px] object-center"
                    ></img>
                    {banned ? (
                      <img src={Ban} className="absolute w-10"></img>
                    ) : (
                      <img src={Ban} className="absolute w-10 hidden"></img>
                    )}
                    <span
                      className="absolute text-lg font-['TAEBAEKfont'] drop-shadow-[0_4.2px_2.2px_rgba(0,0,0,0.2)]"
                      style={{ color: "#" + backColor }}
                    >
                      {/* {playerNumber.toString()} */}
                      {homePosition[positionNumber][0].jerseyNumber}
                    </span>
                    {warned ? (
                      <div className="relative">
                        <div className="absolute -top-[16px] -left-6 text-[10px] text-yellow-400 bg-yellow-400 z-10 tada_animation">
                          !!!
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="absolute -top-[16px] -left-6 text-[10px] text-yellow-400 bg-yellow-400 z-10 hidden">
                          !!!
                        </div>
                      </div>
                    )}
                    {homePosition[positionNumber][0].substitution ? (
                      <div className="relative">
                        <div className="absolute left-4 bottom-2 w-[16px] h-[16px] z-10">
                          <img src={playerSubstitution}></img>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    {scored ? (
                      <div className="relative">
                        <div className="absolute right-1 bottom-3 w-[32px] h-[32px] z-20 tada_animation">
                          <img src={Goal}></img>
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="absolute right-1 bottom-3 w-[32px] h-[32px] z-20 hidden">
                          <img src={Goal}></img>
                        </div>
                      </div>
                    )}
                    <span className="font-['ONE-Mobile-Title'] text-pretty text-center">
                      {
                        HomeLineUpIDMatch[
                          homePosition[positionNumber][0].player.id
                        ]
                      }
                    </span>
                  </button>
                </div>
              ) : (
                <div
                  id={homePosition[positionNumber][0].player.id}
                  className={
                    "flex flex-col w-full items-center" +
                    " home_sub_" +
                    positionNumber.toString()
                  }
                >
                  <button
                    className={"flex flex-col w-full items-center"}
                    onClick={() => {
                      selectPlayer();
                      document
                        .getElementById("GameStatistics")
                        ?.classList.remove("go_toward_animation");
                      document
                        .getElementById("GameStatistics")
                        ?.classList.add("go_behind_animation");
                      document
                        .getElementById("PlayerStatistics")
                        ?.classList.remove("animate__fadeOutLeftBig");
                      document
                        .getElementById("PlayerStatistics")
                        ?.classList.add("animate__backInLeft");
                    }}
                  >
                    <img
                      src={
                        "https://api.sofascore.app/api/v1/event/" +
                        matchId.toString() +
                        "/jersey/home/" +
                        url
                      }
                      className="w-[32px] object-center"
                    ></img>
                    {banned ? (
                      <img src={Ban} className="absolute w-10"></img>
                    ) : (
                      <img src={Ban} className="absolute w-10 hidden"></img>
                    )}
                    <span
                      className="absolute text-lg font-['TAEBAEKfont'] drop-shadow-[0_4.2px_2.2px_rgba(0,0,0,0.2)]"
                      style={{ color: "#" + backColor }}
                    >
                      {/* {playerNumber.toString()} */}
                      {homePosition[positionNumber][0].jerseyNumber}
                    </span>
                    {warned ? (
                      <div className="relative">
                        <div className="absolute -top-[16px] -left-6 text-[10px] text-yellow-400 bg-yellow-400 z-10 tada_animation">
                          !!!
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="absolute -top-[16px] -left-6 text-[10px] text-yellow-400 bg-yellow-400 z-10 hidden">
                          !!!
                        </div>
                      </div>
                    )}
                    {homePosition[positionNumber][0].substitution ? (
                      <div className="relative">
                        <div className="absolute left-4 bottom-2 w-[16px] h-[16px] z-10">
                          <img src={playerSubstitution}></img>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    {scored ? (
                      <div className="relative">
                        <div className="absolute right-1 bottom-3 w-[32px] h-[32px] z-20 tada_animation">
                          <img src={Goal}></img>
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="absolute right-1 bottom-3 w-[32px] h-[32px] z-20 hidden">
                          <img src={Goal}></img>
                        </div>
                      </div>
                    )}
                    <span className="font-['ONE-Mobile-Title'] text-pretty text-center">
                      {
                        HomeLineUpIDMatch[
                          homePosition[positionNumber][0].player.id
                        ]
                      }
                    </span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {subbed ? (
                <div
                  id={awayPosition[positionNumber][0].player.id}
                  className={
                    "flex flex-col w-full items-center animate__animated animate__flash" +
                    " away_sub_" +
                    positionNumber.toString()
                  }
                >
                  <button
                    className="flex flex-col w-full items-center"
                    onClick={() => {
                      selectPlayer();
                      document
                        .getElementById("GameStatistics")
                        ?.classList.remove("go_toward_animation");
                      document
                        .getElementById("GameStatistics")
                        ?.classList.add("go_behind_animation");
                      document
                        .getElementById("PlayerStatistics")
                        ?.classList.remove("animate__fadeOutLeftBig");
                      document
                        .getElementById("PlayerStatistics")
                        ?.classList.add("animate__backInLeft");
                    }}
                  >
                    <img
                      src={
                        "https://api.sofascore.app/api/v1/event/" +
                        matchId.toString() +
                        "/jersey/away/" +
                        url
                      }
                      className="w-[32px] object-center"
                    ></img>
                    {banned ? (
                      <img src={Ban} className="absolute w-10"></img>
                    ) : (
                      <></>
                    )}
                    <span
                      className="absolute text-lg font-['TAEBAEKfont'] drop-shadow-[0_4.2px_2.2px_rgba(0,0,0,0.2)]"
                      style={{ color: "#" + backColor }}
                    >
                      {awayPosition[positionNumber][0].jerseyNumber}
                    </span>
                    {warned ? (
                      <div className="relative">
                        <div className="absolute -top-[16px] -left-6 text-[10px] text-yellow-400 bg-yellow-400 z-10 tada_animation">
                          !!!
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    {awayPosition[positionNumber][0].substitution ? (
                      <div className="relative">
                        <div className="absolute left-4 bottom-2 w-[16px] h-[16px] z-10">
                          <img src={playerSubstitution}></img>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    {scored ? (
                      <div className="relative">
                        <div className="absolute right-1 bottom-3 w-[32px] h-[32px] z-20 tada_animation">
                          <img src={Goal}></img>
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="absolute right-1 bottom-3 w-[32px] h-[32px] z-20 hidden">
                          <img src={Goal}></img>
                        </div>
                      </div>
                    )}
                    <span className="font-['ONE-Mobile-Title'] text-pretty text-center">
                      {
                        AwayLineUpIDMatch[
                          awayPosition[positionNumber][0].player.id
                        ]
                      }
                    </span>
                  </button>
                </div>
              ) : (
                <div
                  id={awayPosition[positionNumber][0].player.id}
                  className={
                    "flex flex-col w-full items-center" +
                    " away_sub_" +
                    positionNumber.toString()
                  }
                >
                  <button
                    className="flex flex-col w-full items-center"
                    onClick={() => {
                      selectPlayer();
                      document
                        .getElementById("GameStatistics")
                        ?.classList.remove("go_toward_animation");
                      document
                        .getElementById("GameStatistics")
                        ?.classList.add("go_behind_animation");
                      document
                        .getElementById("PlayerStatistics")
                        ?.classList.remove("animate__fadeOutLeftBig");
                      document
                        .getElementById("PlayerStatistics")
                        ?.classList.add("animate__backInLeft");
                    }}
                  >
                    <img
                      src={
                        "https://api.sofascore.app/api/v1/event/" +
                        matchId.toString() +
                        "/jersey/away/" +
                        url
                      }
                      className="w-[32px] object-center"
                    ></img>
                    {banned ? (
                      <img src={Ban} className="absolute w-10"></img>
                    ) : (
                      <></>
                    )}
                    <span
                      className="absolute text-lg font-['TAEBAEKfont'] drop-shadow-[0_4.2px_2.2px_rgba(0,0,0,0.2)]"
                      style={{ color: "#" + backColor }}
                    >
                      {awayPosition[positionNumber][0].jerseyNumber}
                    </span>
                    {warned ? (
                      <div className="relative">
                        <div className="absolute -top-[16px] -left-6 text-[10px] text-yellow-400 bg-yellow-400 z-10 tada_animation">
                          !!!
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    {awayPosition[positionNumber][0].substitution ? (
                      <div className="relative">
                        <div className="absolute left-4 bottom-2 w-[16px] h-[16px] z-10">
                          <img src={playerSubstitution}></img>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    {scored ? (
                      <div className="relative">
                        <div className="absolute right-1 bottom-3 w-[32px] h-[32px] z-20 tada_animation">
                          <img src={Goal}></img>
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="absolute right-1 bottom-3 w-[32px] h-[32px] z-20 hidden">
                          <img src={Goal}></img>
                        </div>
                      </div>
                    )}
                    <span className="font-['ONE-Mobile-Title'] text-pretty text-center">
                      {
                        AwayLineUpIDMatch[
                          awayPosition[positionNumber][0].player.id
                        ]
                      }
                    </span>
                  </button>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default PlayerComponent;
