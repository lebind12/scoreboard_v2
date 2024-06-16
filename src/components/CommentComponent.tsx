import { useEffect, useState } from "react";
import "../styles/animate.css";
import { CommentComponentProps } from "../types/propsType";
import useInterval from "../hooks/intervalHook";
import API from "../utils/apis/api/api";
import eaglekopSD from "../assets/eaglekop.png";
import { useScoreContext } from "../context/ScoreboardContext";

const CommentComponent = ({
  homeId,
  awayId,
  matchId,
  naverId,
  id,
}: CommentComponentProps) => {
  const [commentRelayData, setCommentRelayData] = useState<any | null>();
  const [isEmptyRelay, setIsEmptyRelay] = useState<boolean>(true);
  const [idx, setIdx] = useState(0);
  const { HomeScore, AwayScore, setHomeScore, setAwayScore } =
    useScoreContext();

  const incidentMatch: { [key: string]: string } = {
    period: "종료",
    substitution: "교체",
    injuryTime: "추가시간",
    card: "카드",
    goal: "골",
    varDecision: "VAR판독",
    inGamePenalty: "패널티킥",
    penaltyShootout: "승부차기",
  };

  const changeFlag = () => {
    if (!isEmptyRelay) {
      switch (commentRelayData?.textRelays[idx].homeOrAway) {
        case "Home":
          return (
            <img
              src={`${
                "https://api.sofascore.app/api/v1/team/" +
                homeId.toString() +
                "/image"
              }`}
              className="relative w-[100px] h-[100px]"
            ></img>
          );
        case "Away":
          return (
            <img
              src={`${
                "https://api.sofascore.app/api/v1/team/" +
                awayId.toString() +
                "/image"
              }`}
              className="relative w-[100px] h-[100px]"
            ></img>
          );
        default:
          return (
            <img
              src={eaglekopSD}
              className="relative w-[100px] h-[100px] left-1 bottom-5"
            ></img>
          );
      }
    } else
      return (
        <img
          src={eaglekopSD}
          className="relative w-[100px] h-[100px] left-1 bottom-5"
        ></img>
      );
  };

  useEffect(() => {
    let url = "/match/comment";
    let params = {
      match_id: naverId.toString(),
      //   match_id: "20240615145870787",
    };
    API.get(url, { params })
      .then((res) => {
        setCommentRelayData(res.data);
        if (res.data !== null) {
          setIsEmptyRelay(false);
          setHomeScore(res.data.homeScore);
          setAwayScore(res.data.awayScore);
        }
      })
      .catch((err) => console.log(err));
  }, [naverId]);

  useInterval(() => {
    let url = "/match/comment";
    let h = {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    };
    let params = {
      match_id: naverId.toString(),
    };
    API.get(url, { params, headers: h })
      .then((res) => {
        setCommentRelayData(res.data);
        if (res.data !== null) {
          setHomeScore(res.data.homeScore);
          setAwayScore(res.data.awayScore);
        }
      })
      .catch((err) => console.log(err));
  }, 10000);

  return (
    <div className="flex  justify-center items-end flex-col h-full w-full animate__animated animate__backInUp">
      <div className="flex flex-col rounded-xl h-1/2 justify-center items-center w-5/6 -outline-offset-2 outline-none outline-8 outline-black">
        <div
          className="grid w-full h-full bg-yellow-300 rounded-t-2xl items-center justify-center text-3xl font-['Jua']"
          style={{
            textShadow:
              "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white",
          }}
        >
          {isEmptyRelay
            ? "경기 시작 전입니다."
            : commentRelayData?.textRelays[idx].statusInfo}
        </div>
        <div
          className="grid w-full h-full bg-yellow-600 rounded-b-2xl items-center justify-center text-2xl font-['Jua'] "
          style={{
            textShadow:
              "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white",
          }}
        >
          {isEmptyRelay
            ? "경기 시작 전입니다."
            : commentRelayData?.textRelays[idx].text}
        </div>
        <div className="absolute left-0 outline-none outline-8 outline-black rounded-full -outline-offset-2 bg-white">
          {changeFlag()}
        </div>
      </div>
    </div>
  );
};

export default CommentComponent;
