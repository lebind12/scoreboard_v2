import { useEffect } from "react";
import { PlayerStatisticDetailComponentProps } from "../types/propsType";

const PlayerStatisticDetailComponent = ({
  name,
  value,
}: PlayerStatisticDetailComponentProps) => {
  useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <div className="flex w-full h-full">
      <span className="w-full">{name}</span>
      {typeof value === "number" ? (
        <span className="w-full"> {value.toString()}</span>
      ) : (
        <div></div>
      )}
      {/* <span className="w-full">{typeof value === "unknown" ? () : ()}</span> */}
    </div>
  );
};

export default PlayerStatisticDetailComponent;
