import { useEffect, useState } from "react";
import FieldBoard from "../assets/FieldBoard_2.png";
import {
  LineupDetail,
  PlayerDetail,
  TeamFormationComponentProps,
} from "../types/propsType";
import PlayerComponent from "./PlayerComponent";
import {
  useBoardContext,
  usePlayerLineUpContext,
  usePlayerPositionContext,
} from "../context/ScoreboardContext";
import API from "../utils/apis/api/api";
import useInterval from "../hooks/intervalHook";

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update state to force render
  // A function that increment 👆🏻 the previous state like here
  // is better than directly setting `setValue(value + 1)`
}

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
  interface PlayerStatus {
    id: number;
    name: string;
    player: any;
    jerseyNumber: number;
    goalCount: number;
    isWarned: boolean;
    isBanned: boolean;
    substitution: boolean;
    position: string;
  }

  const [formationArray, setFormationArray] = useState<Array<Array<number>>>(
    []
  );
  const {
    homePosition,
    awayPosition,
    addHomePosition,
    addAwayPosition,
    setHomeReady,
    setAwayReady,
  } = usePlayerPositionContext();
  const { selected } = useBoardContext();

  const forceUpdate = useForceUpdate();
  useEffect(() => {
    // 팀 라인업이 로드되면
    if (typeof teamLineup !== "undefined") {
      if (isHome) {
        for (let i = 0; i < 11; i++) {
          if (typeof teamLineup[i] === "undefined") break;
          addHomePosition(i, {
            id: teamLineup[i].player.id,
            name: teamLineup[i].player.name,
            player: teamLineup[i].player,
            jerseyNumber: teamLineup[i].jerseyNumber,
            goalCount: 0,
            isWarned: false,
            isBanned: false,
            substitution: false,
            position: teamLineup[i].position,
          });
          setHomeReady(true);
        }
      } else {
        for (let i = 0; i < 11; i++) {
          if (typeof teamLineup[i] === "undefined") break;
          addAwayPosition(i, {
            id: teamLineup[i].player.id,
            name: teamLineup[i].player.name,
            player: teamLineup[i].player,
            jerseyNumber: teamLineup[i].jerseyNumber,
            goalCount: 0,
            isWarned: false,
            isBanned: false,
            substitution: false,
            position: teamLineup[i].position,
          });
          setAwayReady(true);
        }
      }
    }
  }, [teamLineup]);

  useEffect(() => {
    if (typeof teamLineup !== "undefined") {
      let idx = 0;
      let formation = ["1"].concat(teamFormation.split("-"));
      let resultData = [];
      for (let i of formation) {
        let tempData = [];
        for (let j = 0; j < parseInt(i); j++) {
          tempData.push(idx);
          idx++;
        }
        if (!isHome) tempData.reverse();
        resultData.push(tempData);
      }
      if (!isHome) resultData.reverse();
      setFormationArray(resultData);
    }
  }, [teamFormation]);

  setInterval(() => {
    forceUpdate();
  }, 5000);

  return (
    <>
      {selected ? (
        <div className="flex flex-col w-full h-full justify-center items-center z-10">
          {formationArray.map((rowArray: number[], key: number) => (
            <div className="flex w-full h-full justify-center items-center">
              {rowArray.map((positionNumber: number, key: number) => (
                <div className="w-full h-full justify-center items-center text-center">
                  <PlayerComponent
                    teamId={teamId}
                    playerId={0}
                    isHome={isHome}
                    matchId={matchId}
                    playerNumber={0}
                    isGoaley={positionNumber.toString()}
                    playerTextColor={teamTextColor}
                    goalkeeperTextColor={goalkeeperTextColor}
                    positionNumber={positionNumber}
                  ></PlayerComponent>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default TeamFormationComponent;
