import { useEffect, useRef, useState } from "react";
import "../styles/animate.css";
import { CommentComponentProps } from "../types/propsType";
import useInterval from "../hooks/intervalHook";
import API from "../utils/apis/api/api";
import eaglekopSD from "../assets/eaglekop.png";
import {
  useFormationReadyContext,
  usePlayerLineUpContext,
  usePlayerPositionContext,
  useScoreContext,
  useTimeContext,
} from "../context/ScoreboardContext";
import sofaAPI from "../utils/apis/api/sofaApi";
import { makeComment } from "../utils/functions";

const CommentComponent = ({
  homeId,
  awayId,
  matchId,
  homeName,
  awayName,
  naverId,
  id,
}: CommentComponentProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [messageQueue, setMessageQueue] = useState<
    Array<{ time: number; [key: string]: any }>
  >([]);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageDetail, setMessageDetail] = useState("");
  const [matchHistory, setMetchHistory] =
    useState<Array<{ time: number; [key: string]: any }>>();
  const [flag, setFlag] = useState("");

  const { HomeLineUpIDMatch, AwayLineUpIDMatch } = usePlayerLineUpContext();
  const { homeFormationReady, awayFormationReady } = useFormationReadyContext();
  const {
    homePosition,
    awayPosition,
    addHomePosition,
    addAwayPosition,
    homeReady,
    awayReady,
  } = usePlayerPositionContext();
  const idx = useRef(0);
  // TODO
  // 메세지 큐 구현
  // 1. 처음 실행 시 메세지 목록 받음. 메세지 목록대로 이벤트 수행
  useEffect(() => {
    sofaAPI("/event/" + matchId.toString() + "/comments", {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
      .then((res) => {
        if (res.data.comments.length > 0) {
          let textRelayData = res.data.comments;
          setMetchHistory(res.data.comments.reverse());
          // 마지막 코멘트는 애니메이션. 메세지큐에 추가해줌.
          setMessageQueue([textRelayData[textRelayData.length - 1]]);
          idx.current = textRelayData.length;
          setIsLoaded(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [matchId]);

  useEffect(() => {
    if (typeof matchHistory !== "undefined") {
      if (homeFormationReady && awayFormationReady && homeReady && awayReady) {
        setTimeout(() => {
          for (let i = 0; i < matchHistory.length; i++) {
            makeComment(
              homeName,
              awayName,
              matchHistory[i],
              HomeLineUpIDMatch,
              AwayLineUpIDMatch,
              homePosition,
              awayPosition,
              addHomePosition,
              addAwayPosition
            );
          }
        }, 5000);
      }
    }
  }, [
    matchHistory,
    homeFormationReady,
    awayFormationReady,
    homeReady,
    awayReady,
  ]);

  useInterval(() => {
    sofaAPI("/event/" + matchId.toString() + "/comments", {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
      .then((res) => {
        // console.log("Data polling ", messageQueue);
        if (isLoaded && res.data.comments.length > idx.current) {
          let textRelayData = res.data.comments.reverse();
          setMessageQueue([
            ...messageQueue,
            ...textRelayData.slice(idx.current),
          ]);
          idx.current = textRelayData.length;
        } else if (res.data.comments.length > 0 && !isLoaded) {
          let textRelayData = res.data.comments.reverse();
          setMetchHistory(res.data.comments.reverse());
          // 마지막 코멘트는 애니메이션. 메세지큐에 추가해줌.
          setMessageQueue([textRelayData[textRelayData.length - 1]]);
          idx.current = textRelayData.length;
          setIsLoaded(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, 10000);

  useInterval(async () => {
    // console.log("Make Event ", messageQueue);
    if (messageQueue.length > 0) {
      let commentObject = makeComment(
        homeName,
        awayName,
        messageQueue[0],
        HomeLineUpIDMatch,
        AwayLineUpIDMatch,
        homePosition,
        awayPosition,
        addHomePosition,
        addAwayPosition
      );
      setMessageQueue(messageQueue.slice(1));
      if (commentObject.flag !== "No Data") {
        console.log("Comment data Received.");
        setMessageTitle(commentObject.title);
        setMessageDetail(commentObject.detail);
        setFlag(commentObject.flag);
        let elem = document.getElementById("commentObject");
        elem?.classList.remove("animate__backOutDown");
        elem?.classList.add("animate__backInUp");
        setTimeout(() => {
          elem?.classList.remove("animate__backInUp");
          elem?.classList.add("animate__backOutDown");
        }, 6000);
      }
    }
  }, 10000);

  const makeFlag = (flag: string) => {
    if (flag === homeName) {
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
    } else if (flag === awayName) {
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
    } else {
      return (
        <img
          src={eaglekopSD}
          className="relative w-[100px] h-[100px] left-1 bottom-5"
        ></img>
      );
    }
  };

  return (
    <div
      id="commentObject"
      className="flex justify-center items-center flex-col h-full w-full  animate__animated animate__backOutDown"
    >
      <div className="flex flex-col rounded-xl h-1/2 justify-center items-center w-5/6 -outline-offset-2 outline-none outline-8 outline-black">
        <div
          className="grid w-full h-full rounded-t-2xl items-center justify-center text-3xl font-['Jua'] text-yellow-300"
          style={{
            backgroundColor: "rgba(32,128,191,1)",
          }}
        >
          {isLoaded ? messageTitle : "경기 시작 전입니다."}
        </div>
        <div
          className="grid w-full h-full  rounded-b-2xl items-center justify-center text-2xl font-['Jua'] text-white"
          style={{
            backgroundColor: "rgba(24,53,136,1)",
          }}
        >
          {isLoaded ? messageDetail : "경기 시작 전입니다."}
        </div>
        <div className="absolute left-10 outline-none outline-8 outline-black rounded-full -outline-offset-[4px] bg-white">
          {makeFlag(flag)}
        </div>
      </div>
    </div>
  );
};

export default CommentComponent;
