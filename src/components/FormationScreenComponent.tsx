import { FormationScreenComponentProps } from "../types/propsType";
import TeamFormationComponent from "./TeamForamtionComponent";
import FieldBoard from "../assets/FieldBoard.png";

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
  matchId,
}: FormationScreenComponentProps) => {
  return (
    <div className="flex flex-col w-full h-full z-10 justify-center items-center">
      <img src={FieldBoard} className="absolute"></img>
      {/* 홈 포메이션 */}
      <div className="flex w-full h-1/2 justify-center pt-12 pb-8">
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
      <div className="flex w-full h-1/2 justify-center pt-8 pb-12">
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
