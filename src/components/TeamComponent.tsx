import { useEffect, useState } from "react";
import { TeamComponentProps } from "../types/propsType";
import TeamFormationComponent from "./TeamForamtionComponent";
import sofaAPI from "../utils/apis/api/sofaApi";

const TeamComponent = ({
  teamName,
  matchId,
  teamId,
  score,
  isHome,
}: TeamComponentProps) => {
  return (
    <>
      {isHome ? (
        <div className="flex w-full h-full">
          <div className="relative left-6 w-1/6 bg-transparent overflow-hidden">
            <img
              src={`${
                "https://api.sofascore.app/api/v1/team/" +
                teamId.toString() +
                "/image"
              }`}
              className="absolute w-[100px] object-center -top-4 right-3"
            ></img>
          </div>
          <div className="flex flex-1 justify-center w-4/6 h-full text-white bg-[#133DDA] font-['ONE-Mobile-POP'] text-4xl items-center text-center">
            {teamName}
          </div>
          <div className="grid w-1/6 h-full bg-white font-['Jua'] text-5xl items-center text-center text-[#05096C]">
            {score}
          </div>
        </div>
      ) : (
        <div className="flex w-full h-full">
          <div className="grid w-1/6 bg-white font-['Jua'] text-5xl items-center text-center text-[#05096C]">
            {score}
          </div>
          <div className="flex justify-center w-4/6 h-full text-white bg-[#133DDA] font-['ONE-Mobile-POP'] text-4xl items-center text-center">
            {teamName}
          </div>

          <div className="relative right-6 w-1/6 h-full bg-transparent overflow-hidden ">
            <img
              src={`${
                "https://api.sofascore.app/api/v1/team/" +
                teamId.toString() +
                "/image"
              }`}
              className="absolute w-[100px] object-center -top-4 z-10 left-3"
            ></img>
          </div>
        </div>
      )}
    </>
  );
};

export default TeamComponent;
