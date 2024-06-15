import { useState } from "react";
import { StatisticsComponentProps } from "../types/propsType";
import { ForwardStatistics } from "../types/apiReturnType";

const StatisticsComponent = ({
  position,
  statistics,
}: StatisticsComponentProps) => {
  const [playerDetail, setPlayerDetail] = useState();
  const makeStatistics = (position: string) => {
    switch (position) {
      case "공격수":
        return (
          <div>
            <div>평점 {statistics.rating}</div>
            <div>
              패스 정확도 {statistics.totalPass / statistics.accuratePass}
            </div>
            <div>플레이타임 {statistics.minutesPlayed}</div>
            <div>오프사이드 횟수 {statistics.totalOffside}</div>
          </div>
        );
      case "미드필더":
        return <div>미드필더</div>;
      case "수비수":
        return (
          <div>
            <div>평점 {statistics.rating}</div>
            <div>
              패스 정확도{" "}
              {((statistics.accuratePass / statistics.totalPass) * 100).toFixed(
                2
              )}
            </div>
            <div>
              롱볼 정확도
              {(
                (statistics.accurateLongBalls / statistics.totalLongBalls) *
                100
              ).toFixed(2)}
            </div>
            <div>플레이타임 {statistics.minutesPlayed}</div>
            <div>클리어 {statistics.totalClearance}</div>
            <div></div>
          </div>
        );
      default:
        return (
          <div>
            <div>평점 {statistics.rating}</div>
            <div>
              패스 정확도{" "}
              {((statistics.accuratePass / statistics.totalPass) * 100).toFixed(
                2
              )}
            </div>
            <div>
              롱볼 정확도
              {(
                (statistics.accurateLongBalls / statistics.totalLongBalls) *
                100
              ).toFixed(2)}
            </div>
            <div>플레이타임 {statistics.minutesPlayed}</div>
            <div>세이브 횟수 {statistics.saves}</div>
            <div></div>
          </div>
        );
    }
  };
  return <>{makeStatistics(position)}</>;
};

export default StatisticsComponent;
