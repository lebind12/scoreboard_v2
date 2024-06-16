import { useState } from "react";
import { StatisticsComponentProps } from "../types/propsType";
import { ForwardStatistics } from "../types/apiReturnType";
import PlayerStatisticDetailComponent from "./PlayerStatisticDetailComponent";

const StatisticsComponent = ({
  position,
  statistics,
}: StatisticsComponentProps) => {
  const [playerDetail, setPlayerDetail] = useState();

  const stasticsMatching: { [key: string]: string } = {
    // prettier-ignore
    "totalPass": "전체 패스",
    // prettier-ignore
    "accuratePass": "패스 성공",
    // prettier-ignore
    "totalLongBalls": "전체 롱패스",
    // prettier-ignore
    "goalAssist": "어시스트",
    // prettier-ignore
    "totalCross": "전체 크로스",
    // prettier-ignore
    "accurateCross": "크로스 성공",
    // prettier-ignore
    "aerialWon": "공중 경합 성공",
    // prettier-ignore
    "bigChanceCreated": "빅찬스 생산",
    // prettier-ignore
    "bigChanceMissed": "빅찬스 미스",
    // prettier-ignore
    "shotOnTarget": "유효 슈팅",
    // prettier-ignore
    "fouls": "파울",
    // prettier-ignore
    "minutesPlayed": "플레이타임",
    // prettier-ignore
    "rating": "평점",
    // prettier-ignore
    "expectedGoals": "ExG",
    // prettier-ignore
    "goals": "득점",
    // prettier-ignore
    "saves": "세이브",
    // prettier-ignore
    "totalClearance" : "전체 클리어링",
    // prettier-ignore
    "savedShotsFromInsideTheBox": "박스 내 세이브",
    // prettier-ignore
    "penaltySave": "패널티킥 선방",
  };

  return (
    <div className="flex flex-col pt-4 pb-2 justify-center h-full w-full justify-center, text-center text-lg">
      {Object.entries(statistics).map(([key, value]) => {
        if (key in stasticsMatching) {
          return (
            <PlayerStatisticDetailComponent
              name={stasticsMatching[key]}
              value={value}
            ></PlayerStatisticDetailComponent>
          );
        }
      })}
    </div>
  );
};

export default StatisticsComponent;
