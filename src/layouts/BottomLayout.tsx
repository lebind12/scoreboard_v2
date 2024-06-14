import ScoreComponent from "../components/ScoreComponent";
import CommentComponent from "../components/CommentComponent";
import API from "../utils/apis/api/api";
import qs from "qs";
import { useEffect, useState } from "react";
import { useBoardContext } from "../context/ScoreboardContext";
import { BottomLayoutProps } from "../types/propsType";

const BottomLayout = ({
  homeName,
  awayName,
  matchId,
  homeId,
  awayId,
}: BottomLayoutProps) => {
  return (
    <div className="flex w-full h-full bg-amber-600 ">
      <div className="w-1/4 bg-gray-500">
        <ScoreComponent
          homeName={homeName}
          awayName={awayName}
          matchId={matchId}
          homeId={homeId}
          awayId={awayId}
        />
      </div>
      <div className="p-4 flex justify-center items-center w-2/4 bg-gray-50">
        <CommentComponent nationId={homeId} />
      </div>
      <div className="w-1/4 bg-gray-950"></div>
    </div>
  );
};

export default BottomLayout;
