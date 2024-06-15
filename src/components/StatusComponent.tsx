import { StatusComponentProps } from "../types/propsType";
import StatusGraphComponent from "./StatusGraphComponent";
import sofaAPI from "../utils/apis/api/sofaApi";
import { useEffect, useState } from "react";
import { StatusDetail } from "../types/apiReturnType";
import useInterval from "../hooks/intervalHook";

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
  // TODO
  // 10초마다 경기기록 갱신

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
          setPossession(res.data.statistics[0].groups[0].statisticsItems[0]);
          setExg(res.data.statistics[0].groups[0].statisticsItems[1]);
          setBigChance(res.data.statistics[0].groups[0].statisticsItems[2]);
          setShooting(res.data.statistics[0].groups[0].statisticsItems[3]);
          setConerkick(res.data.statistics[0].groups[0].statisticsItems[5]);
          setFreekick(res.data.statistics[0].groups[0].statisticsItems[9]);
          setFoul(res.data.statistics[0].groups[0].statisticsItems[6]);
          setYellowCard(res.data.statistics[0].groups[0].statisticsItems[10]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, 10000);

  const [possession, setPossession] = useState<StatusDetail | undefined>(
    defaultData
  );
  const [exg, setExg] = useState<StatusDetail | undefined>(defaultData);
  const [bigChance, setBigChance] = useState<StatusDetail | undefined>(
    defaultData
  );
  const [shooting, setShooting] = useState<StatusDetail | undefined>(
    defaultData
  );
  const [conerkick, setConerkick] = useState<StatusDetail | undefined>(
    defaultData
  );
  const [freekick, setFreekick] = useState<StatusDetail | undefined>(
    defaultData
  );
  const [foul, setFoul] = useState<StatusDetail | undefined>(defaultData);
  const [yellowCard, setYellowCard] = useState<StatusDetail | undefined>(
    defaultData
  );
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
        setPossession(res.data.statistics[0].groups[0].statisticsItems[0]);
        setExg(res.data.statistics[0].groups[0].statisticsItems[1]);
        setBigChance(res.data.statistics[0].groups[0].statisticsItems[2]);
        setShooting(res.data.statistics[0].groups[0].statisticsItems[3]);
        setConerkick(res.data.statistics[0].groups[0].statisticsItems[5]);
        setFreekick(res.data.statistics[0].groups[0].statisticsItems[9]);
        setFoul(res.data.statistics[0].groups[0].statisticsItems[6]);
        setYellowCard(res.data.statistics[0].groups[0].statisticsItems[10]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [matchId]);

  return (
    <div className="flex w-full h-full items-center justify-center animate__animated animate__backInLeft">
      <div className="flex flex-col w-5/6 h-5/6 bg-white outline-offset-[-3px] outline-none outline-black outline-8 rounded-xl">
        {/* 상단 */}
        <div className="flex flex-col w-full min-h-[200px] bg-slate-300">
          <div className="flex w-full h-full bg-slate-700">
            <div className="grid w-full bg-slate-100 items-center justify-center ">
              <img
                src={`${
                  "https://api.sofascore.app/api/v1/team/" + homeId + "/image"
                }`}
              ></img>
            </div>
            <div className="grid w-full bg-slate-200 items-center justify-center">
              <img
                src={`${
                  "https://api.sofascore.app/api/v1/team/" + awayId + "/image"
                }`}
              ></img>
            </div>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 -translate-y-1/2 font-['MoveSans-Bold'] text-6xl">
              VS
            </div>
          </div>
          <div className="flex w-full ">
            <div className="flex flex-col w-full bg-blue-600 items-center justify-center text-4xl font-['Freesentation-9Black']">
              {home}
            </div>
            <div className="flex flex-col w-full bg-blue-200 items-center justify-center text-4xl font-['Freesentation-9Black']">
              {away}
            </div>
          </div>
        </div>
        {/* 내용 */}
        <div className="flex flex-col w-full h-full items-center justify-center bg-slate-100 font-['MangoDdobak-B']">
          <StatusGraphComponent
            homeStatGrade={70}
            homeStat={possession?.home}
            statName={"점유율"}
            awayStat={possession?.away}
            awayStatGrade={30}
          ></StatusGraphComponent>
          <StatusGraphComponent
            homeStatGrade={70}
            homeStat={exg?.home}
            statName={"예상 골"}
            awayStat={exg?.away}
            awayStatGrade={30}
          ></StatusGraphComponent>
          <StatusGraphComponent
            homeStatGrade={70}
            homeStat={bigChance?.home}
            statName={"빅 찬스"}
            awayStat={bigChance?.away}
            awayStatGrade={30}
          ></StatusGraphComponent>
          <StatusGraphComponent
            homeStatGrade={70}
            homeStat={shooting?.home}
            statName={"전체 슈팅"}
            awayStat={shooting?.away}
            awayStatGrade={30}
          ></StatusGraphComponent>
          <StatusGraphComponent
            homeStatGrade={70}
            homeStat={conerkick?.home}
            statName={"코너킥"}
            awayStat={conerkick?.away}
            awayStatGrade={30}
          ></StatusGraphComponent>
          <StatusGraphComponent
            homeStatGrade={70}
            homeStat={freekick?.home}
            statName={"프리킥"}
            awayStat={freekick?.away}
            awayStatGrade={30}
          ></StatusGraphComponent>
          <StatusGraphComponent
            homeStatGrade={70}
            homeStat={foul?.home}
            statName={"파울"}
            awayStat={foul?.away}
            awayStatGrade={30}
          ></StatusGraphComponent>
          <StatusGraphComponent
            homeStatGrade={70}
            homeStat={yellowCard?.home}
            statName={"옐로우 카드"}
            awayStat={yellowCard?.away}
            awayStatGrade={30}
          ></StatusGraphComponent>
        </div>
        {/* 하단 */}
        <div className="flex flex-col w-full min-h-[70px] bg-black"></div>
      </div>
    </div>
  );
};

export default StatusComponent;
