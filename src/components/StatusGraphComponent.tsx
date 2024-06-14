import { StatusGraphComponentProps } from "../types/propsType";

const StatusGraphComponent = ({
  homeStatGrade,
  homeStat,
  statName,
  awayStat,
  awayStatGrade,
}: StatusGraphComponentProps) => {
  return (
    <div className="flex w-full h-full items-center">
      <div className="w-full text-right justify-center">{homeStat}</div>
      <div className=""></div>
      <div className="w-full text-center">{statName}</div>
      <div></div>
      <div className="w-full text-left">{awayStat}</div>
    </div>
  );
};

export default StatusGraphComponent;
