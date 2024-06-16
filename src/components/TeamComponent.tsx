import { useEffect, useState } from "react";
import { TeamComponentProps } from "../types/propsType";
import TeamFormationComponent from "./TeamForamtionComponent";
import sofaAPI from "../utils/apis/api/sofaApi";

const TeamComponent = ({
  teamName,
  matchId,
  teamId,
  score,
}: TeamComponentProps) => {
  return (
    <div className="flex w-full h-full p-2">
      <div className="w-1/6 h-full bg-white">
        <img
          src={`${
            "https://api.sofascore.app/api/v1/team/" +
            teamId.toString() +
            "/image"
          }`}
          className="w-full h-full"
        ></img>
      </div>
      <div
        className="grid w-4/6 h-full bg-blue-400 font-['ONE-Mobile-POP'] text-5xl items-center text-center"
        style={{
          textShadow:
            "-3px -3px 0 white, 3px -3px 0 white, -3px 3px 0 white, 3px 3px 0 white",
        }}
      >
        {teamName}
      </div>
      <div
        className="grid w-1/6 h-full bg-white font-['Jua'] text-5xl items-center text-center"
        style={{
          textShadow:
            "-3px -3px 0 white, 3px -3px 0 white, -3px 3px 0 white, 3px 3px 0 white",
        }}
      >
        {score}
      </div>
    </div>
  );
};

export default TeamComponent;
