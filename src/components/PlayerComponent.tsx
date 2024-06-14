import { useEffect, useState } from "react";
import { PlayerComponentProps } from "../types/propsType";
import API from "../utils/apis/api/api";

const PlayerComponent = ({
  teamId,
  playerId,
  matchId,
  isHome,
  playerNumber,
  isGoaley,
}: PlayerComponentProps) => {
  const [playerName, setPlayerName] = useState("");
  // const [goalKeeper, setGoalKeeper] = useState(false);
  const [url, setURL] = useState("player/fancy");

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
    if (isGoaley == "G") setURL("goalkeeper/fancy");
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
          <span className="absolute text-lg font-['TAEBAEKfont']">
            {playerNumber.toString()}
          </span>
          <span className="font-['MangoDdobak-B'] text-pretty text-center">
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
          <span className="absolute text-lg text-white font-['TAEBAEKfont']">
            {playerNumber.toString()}
          </span>
          <span className="font-['MangoDdobak-B'] text-pretty text-center">
            {playerName}
          </span>
        </div>
      )}
    </>
  );
};

export default PlayerComponent;
