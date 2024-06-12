import TeamComponent from "./TeamComponent";
import { ScoreComponentProps } from "../types/propsType";

const ScoreComponent = ({
  homeName,
  awayName,
  matchId,
  homeId,
  awayId,
}: ScoreComponentProps) => {
  return (
    <div className="flex flex-col w-full h-full p-2">
      <div className="flex w-full h-1/4">
        <div className="flex w-max h-full bg-white items-center">
          <h1 className="text-6xl font-bold p-2">00:00</h1>
        </div>
        <div className="flex w-full text-4xl items-center justify-center font-['Freesentation-9Black']">
          2024 유로 예선전
        </div>
      </div>
      <div className="h-3/4">
        <div className="w-full h-1/2 bg-amber-300">
          <TeamComponent
            teamName={homeName}
            matchId={matchId}
            teamId={homeId}
          />
        </div>
        <div className="w-full h-1/2 bg-amber-900">
          <TeamComponent
            teamName={awayName}
            matchId={matchId}
            teamId={awayId}
          />
        </div>
      </div>
    </div>
  );
};

export default ScoreComponent;
