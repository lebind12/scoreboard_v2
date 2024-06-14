import { useEffect, useState } from "react";
import { PlayerComponentProps } from "../types/propsType";
import API from "../utils/apis/api/api";

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
        <div className="flex flex-col w-full items-center">
          <img
            src={
              "https://api.sofascore.app/api/v1/event/" +
              matchId.toString() +
              "/jersey/home/" +
              url
            }
            className="w-[32px] object-center"
          ></img>
          <span
            className="absolute text-lg font-['TAEBAEKfont'] drop-shadow-[0_4.2px_2.2px_rgba(0,0,0,0.2)]"
            style={{ color: backColor }}
          >
            {playerNumber.toString()}
          </span>
          <span className="font-['MangoDdobak-B'] text-pretty text-center drop-shadow-[0_4.2px_2.2px_rgba(0,0,0,0.2)]">
            {playerName}
          </span>
        </div>
      ) : (
        <div className="flex flex-col w-full items-center">
          <img
            src={
              "https://api.sofascore.app/api/v1/event/" +
              matchId.toString() +
              "/jersey/away/" +
              url
            }
            className="w-[32px] object-center"
          ></img>
          <span
            className="absolute text-lg font-['TAEBAEKfont'] drop-shadow-[0_4.2px_2.2px_rgba(0,0,0,0.2)]"
            style={{ color: backColor }}
          >
            {playerNumber.toString()}
          </span>
          <span className="font-['MangoDdobak-B'] text-pretty text-center drop-shadow-[0_4.2px_2.2px_rgba(0,0,0,0.2)]">
            {playerName}
          </span>
        </div>
      )}
    </>
  );
};

export default PlayerComponent;
