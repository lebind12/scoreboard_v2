import { StatusComponentProps } from "../types/propsType";
import StatusGraphComponent from "./StatusGraphComponent";
import sofaAPI from "../utils/apis/api/sofaApi";
import { useEffect, useState } from "react";
import { StatusDetail } from "../types/apiReturnType";
import useInterval from "../hooks/intervalHook";
import topImage from "../assets/4_top.png";

const StatusComponent = ({
  homeId,
  awayId,
  home,
  away,
  matchId,
}: StatusComponentProps) => {
  const defaultData = {
    name: "no data",
    home: "no data",
    away: "no data",
    compareCode: -99,
    statisticsType: "no data",
    valueType: "no data",
    homeValue: -99,
    awayValue: -99,
    renderType: -99,
    key: "no data",
  };

  const statMatchMap: { [key: string]: string } = {
    "Ball possession": "볼 점유율",
    "Expected goals": "기대득점",
    "Big chances": "빅 찬스",
    "Total shots": "전체 슈팅",
    "Goalkeeper saves": "골키퍼 선방",
    "Corner kicks": "코너킥",
    // prettier-ignore
    "Fouls": "파울",
    "Yellow cards": "옐로우카드",
    "Shots on target": "유효슈팅",
  };
  const [gameStatistics, setGameStatistics] = useState<Array<StatusDetail>>([]);

  useInterval(() => {
    if (matchId !== 0) {
      let url = "event/" + matchId.toString() + "/statistics";
      let h = {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      };

      sofaAPI
        .get(url, { headers: h })
        .then((res) => {
          setGameStatistics(
            res.data?.statistics[0]?.groups[0]?.statisticsItems
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, 10000);
  useEffect(() => {
    let url = "event/" + matchId.toString() + "/statistics";
    let h = {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    };
    sofaAPI
      .get(url, { headers: h })
      .then((res) => {
        setGameStatistics(res.data?.statistics[0]?.groups[0]?.statisticsItems);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [matchId]);

  return (
    <div className="flex w-full h-3/5 items-end justify-center animate__animated animate__backInLeft ">
      <div className="flex flex-col w-5/6 h-full bg-transparent outline-offset-[-3px] outline-none outline-[#05096C] outline-8 rounded-xl flag_background">
        {/* 상단 */}
        <img className="absolute w-5/6" src={topImage}></img>
        <div className="flex flex-col w-full min-h-[170px] z-10">
          <div className="flex w-full h-full bg-transparent">
            <div className="grid w-full bg-transparent items-center justify-center ">
              <img
                src={`${
                  "https://api.sofascore.app/api/v1/team/" + homeId + "/image"
                }`}
                className="pt-6 w-[100px]"
              ></img>
            </div>
            <div className="grid w-full bg-transparent items-center justify-center">
              <img
                src={`${
                  "https://api.sofascore.app/api/v1/team/" + awayId + "/image"
                }`}
                className="pt-6 w-[100px]"
              ></img>
            </div>
          </div>
          <div className="flex w-full ">
            <div className="flex flex-col w-full bg-[#05096C] items-center text-white justify-center text-4xl font-['Freesentation-9Black'] drop-shadow-[2px_0_0px_rgba(255,255,255,1)]">
              {home}
            </div>
            <div className="flex flex-col w-full bg-[#05096C] items-center text-white justify-center text-4xl font-['Freesentation-9Black']">
              {away}
            </div>
          </div>
        </div>
        {/* 내용 */}
        <div className="flex flex-col h-full w-full items-center justify-center bg-transparent font-['MangoDdobak-B']">
          {typeof gameStatistics !== undefined && gameStatistics.length > 0
            ? gameStatistics.map((res: StatusDetail, key: number) => {
                if (res.name in statMatchMap)
                  return (
                    <StatusGraphComponent
                      homeStatGrade={0}
                      homeStat={res.home}
                      statName={statMatchMap[res.name]}
                      awayStat={res.away}
                      awayStatGrade={0}
                    ></StatusGraphComponent>
                  );
              })
            : "경기 집계중입니다."}
        </div>
        {/* 하단 */}
        {/* <div className="flex flex-col w-full min-h-[70px] bg-black items-center justify-center">
          <div className="flex w-full bg-white text-center">
            <div className="w-full">{managers.homeManager}</div>
            <div className="w-full">{managers.awayManager}</div>
          </div>
          <div className="w-full bg-white text-center">{judge.JudgeName}</div>
        </div> */}
      </div>
    </div>
  );
};

export default StatusComponent;
