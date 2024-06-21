import { useEffect, useState } from "react";
import { PlayerComponentProps } from "../types/propsType";
import API from "../utils/apis/api/api";
import { usePlayerContext } from "../context/ScoreboardContext";
import playerSubstitution from "../assets/playerSubstitution.png";
import Ban from "../assets/Ban.png";

const PlayerComponent = ({
  teamId,
  playerTextColor,
  goalkeeperTextColor,
  playerId,
  matchId,
  isHome,
  playerNumber,
  isGoaley,
}: PlayerComponentProps) => {
  const [playerName, setPlayerName] = useState("");
  // const [goalKeeper, setGoalKeeper] = useState(false);
  const [url, setURL] = useState("player/fancy");
  const [backColor, setBackColor] = useState(playerTextColor);
  const { pId, setPId } = usePlayerContext();

  const selectPlayer = () => {
    setPId(playerId);
    let gameElement = document.getElementById("#GameStatistics");
    let playerElement = document.getElementById("#PlayerStatistics");

    // playerElement?.className.
  };

  useEffect(() => {
    // setPlayerName(playerId.toString());
    let params = { player_id: playerId };
    API.get("/player/id", { params })
      .then((res) => {
        setPlayerName(res.data.familyname);
      })
      .catch((err) => console.log(err));
  }, [playerId]);

  useEffect(() => {
    if (isGoaley == "G") {
      setURL("goalkeeper/fancy");
      setBackColor(goalkeeperTextColor);
    }
  }, [isGoaley]);

  return (
    <>
      {isHome ? (
        <div
          id={"player" + playerId.toString()}
          className="flex flex-col w-full items-center"
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
                "/jersey/home/" +
                url
              }
              className="w-[32px] object-center"
            ></img>
            <img src={Ban} className="absolute w-10 hidden"></img>
            <span
              className="absolute text-lg font-['TAEBAEKfont'] drop-shadow-[0_4.2px_2.2px_rgba(0,0,0,0.2)]"
              style={{ color: backColor }}
            >
              {playerNumber.toString()}
            </span>
            <div className="relative">
              <div className="absolute -top-[16px] -left-6 text-[10px] text-yellow-400 bg-yellow-400 z-10 hidden">
                !!!
              </div>
            </div>
            <div className="relative">
              <div className="absolute left-4 bottom-2 w-[16px] h-[16px] z-10 hidden">
                <img src={playerSubstitution}></img>
              </div>
            </div>
            <span
              className="font-['MangoDdobak-B'] text-pretty text-center"
              style={{
                textShadow:
                  "-0.5px -0.5px 0 white, 0.5px -0.5px 0 white, -0.5px 0.5px 0 white, 0.5px 0.5px 0 white",
              }}
            >
              {playerName}
            </span>
          </button>
        </div>
      ) : (
        <div
          id={"player" + playerId.toString()}
          className="flex flex-col w-full items-center"
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
            <img src={Ban} className="absolute w-10 hidden"></img>
            <span
              className="absolute text-lg font-['TAEBAEKfont'] drop-shadow-[0_4.2px_2.2px_rgba(0,0,0,0.2)]"
              style={{ color: backColor }}
            >
              {playerNumber.toString()}
            </span>
            <div className="relative">
              <div className="absolute -top-[16px] -left-6 text-[10px] text-yellow-400 bg-yellow-400 z-10 hidden">
                !!!
              </div>
            </div>
            <div className="relative">
              <div className="absolute left-4 bottom-2 w-[16px] h-[16px] z-10 hidden">
                <img src={playerSubstitution}></img>
              </div>
            </div>
            <span
              className="font-['MangoDdobak-B'] text-pretty text-center"
              style={{
                textShadow:
                  "-0.5px -0.5px 0 white, 0.5px -0.5px 0 white, -0.5px 0.5px 0 white, 0.5px 0.5px 0 white",
              }}
            >
              {playerName}
            </span>
          </button>
        </div>
      )}
    </>
  );
};

export default PlayerComponent;
