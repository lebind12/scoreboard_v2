import StatusComponent from "../components/StatusComponent";
import FormationScreenComponent from "../components/FormationScreenComponent";
import "animate.css";
import { ScreenLayoutProps } from "../types/propsType";
import { useEffect, useState } from "react";
import sofaAPI from "../utils/apis/api/sofaApi";

const ScreenLayout = ({
  matchId,
  homeId,
  awayId,
  home,
  away,
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
    sofaAPI
      .get(url)
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

  return (
    <div className="flex w-full h-full bg-slate-400">
      <div className="flex w-1/4 h-full  items-center animate__animated animate__backInLeft">
        <StatusComponent
          homeId={homeId}
          awayId={awayId}
          home={home}
          away={away}
          matchId={matchId}
        />
      </div>
      <div className="w-1/2 h-full bg-slate-400"></div>
      <div className="flex flex-1 w-1/4 h-full items-center animate__animated animate__backInRight">
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
          matchId={matchId}
        />
      </div>
    </div>
  );
};

export default ScreenLayout;
