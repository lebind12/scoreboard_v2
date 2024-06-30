import StatusComponent from "../components/StatusComponent";
import FormationScreenComponent from "../components/FormationScreenComponent";
import "animate.css";
import { ScreenLayoutProps } from "../types/propsType";
import { useEffect, useState } from "react";
import sofaAPI from "../utils/apis/api/sofaApi";
import PlayerStatusComponent from "../components/PlayerStatusComponent";
import "../styles/animate.css";
import CommentComponent from "../components/CommentComponent";
import useInterval from "../hooks/intervalHook";

const ScreenLayout = ({
  matchId,
  naverId,
  homeId,
  awayId,
  home,
  away,
  id,
  homeCode,
  awayCode,
}: ScreenLayoutProps) => {
  const [homePlayers, setHomePlayers] = useState([]);
  const [awayPlayers, setAwayPlayers] = useState([]);
  const [homeFormation, setHomeFormation] = useState("");
  const [awayFormation, setAwayFormation] = useState("");
  const [homeTextColor, setHomeTextColor] = useState("");
  const [awayTextColor, setAwayTextColor] = useState("");
  const [homeGoalkeeperTextColor, setHomeGoalkeeperTextColor] = useState("");
  const [awayGoalkeeperTextColor, setAwayGoalkeeperTextColor] = useState("");

  useEffect(() => {
    let url =
      "https://www.sofascore.com/api/v1/event/" +
      matchId.toString() +
      "/lineups";
    // let url = "https://www.sofascore.com/api/v1/event/12226495/lineups";
    let h = {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    };
    sofaAPI
      .get(url, { headers: h })
      .then((res) => {
        setHomePlayers(res.data.home.players);
        setAwayPlayers(res.data.away.players);
        setHomeFormation(res.data.home.formation);
        setAwayFormation(res.data.away.formation);
        setHomeTextColor(res.data.home.playerColor.fancyNumber);
        setAwayTextColor(res.data.away.playerColor.fancyNumber);
        setHomeGoalkeeperTextColor(res.data.away.goalkeeperColor.fancyNumber);
        setAwayGoalkeeperTextColor(res.data.away.goalkeeperColor.fancyNumber);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [matchId]);

  useInterval(() => {
    let url =
      "https://www.sofascore.com/api/v1/event/" +
      matchId.toString() +
      "/lineups";
    // let url = "https://www.sofascore.com/api/v1/event/12226495/lineups";
    let h = {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    };
    sofaAPI
      .get(url, { headers: h })
      .then((res) => {
        setHomeFormation(res.data.home.formation);
        setAwayFormation(res.data.away.formation);
        console.log(res.data.home.formation);
        console.log(res.data.away.formation);
      })
      .catch((err) => {
        console.log(err);
      });
  }, 60000);

  return (
    <div className="flex w-full h-full">
      <div className="w-1/4 h-full items-center bg-[#00ff00]">
        <div
          id="GameStatistics"
          className="w-full h-full items-center go_toward_animation"
        >
          <FormationScreenComponent
            home={home}
            away={away}
            homeId={homeId}
            awayId={awayId}
            homeLineup={homePlayers}
            awayLineup={awayPlayers}
            homeFormation={homeFormation}
            awayFormation={awayFormation}
            homeTextColor={homeTextColor}
            awayTextColor={awayTextColor}
            homeGoalkeeperTextColor={homeGoalkeeperTextColor}
            awayGoalkeeperTextColor={awayGoalkeeperTextColor}
            homeCode={homeCode}
            awayCode={awayCode}
            matchId={matchId}
          />
        </div>

        <div
          id="PlayerStatistics"
          className="absolute w-1/4 bottom-14 h-5/6 animate__animated animate__fadeOutLeftBig bg-[#00ff00]"
        >
          <PlayerStatusComponent matchId={matchId}></PlayerStatusComponent>
        </div>
      </div>
      <div className="w-1/2 h-full bg-[#00ff00]">
        <div className="h-3/4"></div>
        <div className="flex pl-8 justify-center items-center w-full h-1/4">
          <CommentComponent
            homeId={homeId}
            awayId={awayId}
            matchId={matchId}
            naverId={naverId}
            homeName={home}
            awayName={away}
            id={id}
          />
        </div>
      </div>

      <div className="flex flex-col flex-1 w-1/4 h-full items-center animate__animated animate__backInRight bg-[#00ff00]">
        <div className="w-full h-1/2 -mb-32 bg-transparent"></div>
        <StatusComponent
          homeId={homeId}
          awayId={awayId}
          home={home}
          away={away}
          matchId={matchId}
        />
      </div>
    </div>
  );
};

export default ScreenLayout;
