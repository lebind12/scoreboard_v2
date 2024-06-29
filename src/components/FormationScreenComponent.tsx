import { FormationScreenComponentProps } from "../types/propsType";
import TeamFormationComponent from "./TeamForamtionComponent";
import FieldBoard from "../assets/FieldBoard.png";
import {
  useFormationReadyContext,
  usePlayerLineUpContext,
} from "../context/ScoreboardContext";
import { useEffect } from "react";
import sofaAPI from "../utils/apis/api/sofaApi";
import API from "../utils/apis/api/api";

const FormationScreenComponent = ({
  home,
  away,
  homeId,
  awayId,
  homeLineup,
  awayLineup,
  homeFormation,
  awayFormation,
  homeTextColor,
  awayTextColor,
  homeGoalkeeperTextColor,
  awayGoalkeeperTextColor,
  homeCode,
  awayCode,
  matchId,
}: FormationScreenComponentProps) => {
  const { setAwayLineUpIDMatch, setHomeLineUpIDMatch } =
    usePlayerLineUpContext();
  const { setHomeFormationReady, setAwayFormationReady } =
    useFormationReadyContext();

  // 이름 한글화 데이터 호출 API
  useEffect(() => {
    API.get("/match/lineup", {
      params: {
        home_code: homeCode,
        away_code: awayCode,
      },
    })
      .then((res) => {
        setHomeLineUpIDMatch(res.data.home);
        setAwayLineUpIDMatch(res.data.away);
        setHomeFormationReady(true);
        setAwayFormationReady(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [homeCode, awayCode]);

  return (
    <div className="flex flex-col w-[480px] h-full z-10 justify-end items-center">
      <img src={FieldBoard} className="absolute h-full pt-12 pb-12"></img>
      {/* 홈 포메이션 */}
      <div className="flex w-full h-1/2 justify-end pt-20">
        <TeamFormationComponent
          teamName={home}
          matchId={matchId}
          teamId={homeId}
          teamLineup={homeLineup}
          teamFormation={homeFormation}
          teamTextColor={homeTextColor}
          goalkeeperTextColor={homeGoalkeeperTextColor}
          isHome={true}
        />
      </div>
      {/* 어웨이 포메이션 */}
      <div className="flex w-full h-1/2 justify-center pb-14 pt-2">
        <TeamFormationComponent
          teamName={away}
          teamId={awayId}
          matchId={matchId}
          teamLineup={awayLineup}
          teamFormation={awayFormation}
          teamTextColor={awayTextColor}
          goalkeeperTextColor={awayGoalkeeperTextColor}
          isHome={false}
        />
      </div>
    </div>
  );
};

export default FormationScreenComponent;
