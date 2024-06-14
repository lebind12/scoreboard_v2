import { useEffect, useState } from "react";
import FieldBoard from "../assets/FieldBoard.png";
import {
  LineupDetail,
  PlayerDetail,
  TeamFormationComponentProps,
} from "../types/propsType";
import PlayerComponent from "./PlayerComponent";

const TeamFormationComponent = ({
  teamName,
  matchId,
  teamId,
  teamFormation,
  teamLineup,
  isHome,
  teamTextColor,
  goalkeeperTextColor,
}: TeamFormationComponentProps) => {
  const [lineupByFormation, setLineupByFormation] = useState<Array<any>>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  const makeLineup = (lineup: Array<any>, formation: string): Array<any> => {
    let idx = 0;
    let formationNumbers = ["1"].concat(formation.split("-"));

    let lineupFormation = [];
    for (let i = 0; i < formationNumbers.length; i++) {
      let playersByFormation = [];
      for (let j = 0; j < parseInt(formationNumbers[i]); j++) {
        playersByFormation.push(lineup[idx]);
        idx += 1;
      }
      lineupFormation.push(playersByFormation);
    }
    return lineupFormation;
  };

  useEffect(() => {
    if (isHome) {
      setLineupByFormation(makeLineup(teamLineup, teamFormation));
    } else {
      setLineupByFormation(makeLineup(teamLineup, teamFormation).reverse());
    }
  }, [teamFormation]);

  useEffect(() => {
    if (lineupByFormation.length > 3) {
      console.log(lineupByFormation);
      setLoaded(true);
    }
  }, [lineupByFormation]);

  return (
    <>
      {loaded ? (
        <>
          <div className="flex flex-col justify-center items-center w-full h-full z-20">
            {lineupByFormation.map((data: Array<LineupDetail>, key) => (
              <div className="flex items-center w-full h-full">
                {data.map((p: LineupDetail) => (
                  <PlayerComponent
                    teamId={teamId}
                    playerId={p.player.id}
                    // playerId={1111}
                    isHome={isHome}
                    matchId={matchId}
                    playerTextColor={"#" + teamTextColor}
                    goalkeeperTextColor={"#" + goalkeeperTextColor}
                    playerNumber={parseInt(p.jerseyNumber)}
                    // matchId={12226495}
                    isGoaley={p.player.position}
                  ></PlayerComponent>
                ))}
              </div>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default TeamFormationComponent;
