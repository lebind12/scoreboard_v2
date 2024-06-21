import ScoreComponent from "../components/ScoreComponent";
import CommentComponent from "../components/CommentComponent";
import API from "../utils/apis/api/api";
import qs from "qs";
import { useEffect, useState } from "react";
import { useBoardContext } from "../context/ScoreboardContext";
import { BottomLayoutProps } from "../types/propsType";
import wallpaper from "../assets/wallpaper.png";

const BottomLayout = ({
  homeName,
  awayName,
  matchId,
  homeId,
  awayId,
  naverId,
  id,
}: BottomLayoutProps) => {
  return (
    <div className="flex w-full h-full overflow-hidden">
      <div className="w-1/4 bg-[#00ff00]"></div>
      <div className="justify-center items-center w-1/2 bg-[#00ff00] pt-4">
        <ScoreComponent
          homeName={homeName}
          awayName={awayName}
          matchId={matchId}
          homeId={homeId}
          awayId={awayId}
        />
      </div>
      <div className="w-1/4 bg-[#00ff00]"></div>
    </div>
  );
};

export default BottomLayout;
