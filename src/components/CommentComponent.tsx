import { useEffect, useState } from "react";
import "../styles/animate.css";
import { CommentComponentProps } from "../types/propsType";
import useInterval from "../hooks/intervalHook";
import API from "../utils/apis/api/api";
import eaglekopSD from "../assets/eaglekop.png";
import { useScoreContext } from "../context/ScoreboardContext";
import sofaAPI from "../utils/apis/api/sofaApi";

const CommentComponent = ({
  homeId,
  awayId,
  matchId,
  naverId,
  id,
}: CommentComponentProps) => {
  interface commentObjectType {
    type: string;
    [key: string]: any;
  }
  const [commentRelayData, setCommentRelayData] =
    useState<Array<commentObjectType>>();
  const [isEmptyRelay, setIsEmptyRelay] = useState<boolean>(true);
  const [statisticsRelayData, setStatisticsRelayData] = useState();
  const [idx, setIdx] = useState(0);
  const { HomeScore, AwayScore, setHomeScore, setAwayScore } =
    useScoreContext();

  const makeSubject = (data: commentObjectType[] | undefined) => {
    if (typeof data !== "undefined") {
      let period: string;
      switch (data[0].type) {
        case "matchEnded":
          return "경기 종료";
        case "endSecondHalf":
          return "후반전 종료";
        case "shotSaved":
          if (data[0].periodName === "2ND") period = "후반전";
          else period = "전반전";
          return period + data[0].time.toString() + "분. 세이브";
        case "shotOffTarget":
          if (data[0].periodName === "2ND") period = "후반전";
          else period = "전반전";
          return period + data[0].time.toString() + "분. 빗나간 슈팅";
        case "substitution":
          if (data[0].periodName === "2ND") period = "후반전";
          else period = "전반전";
          return period + data[0].time.toString() + "분. 선수 교체";
        case "scoreChange":
          if (data[0].periodName === "2ND") period = "후반전";
          else period = "전반전";
          return period + data[0].time.toString() + "분. 골!";
        case "cornerKick":
          if (data[0].periodName === "2ND") period = "후반전";
          else period = "전반전";
          return period + data[0].time.toString() + "분. 코너킥";
        case "offside":
          if (data[0].periodName === "2ND") period = "후반전";
          else period = "전반전";
          return period + data[0].time.toString() + "분. 오프사이드";
        case "matchStarted":
          return "경기 시작";
        case "endFirstHalf":
          return "전반전 종료";
        case "shotBlocked":
          if (data[0].periodName === "2ND") period = "후반전";
          else period = "전반전";
          return period + data[0].time.toString() + "분. 선방";
      }
    } else return;
  };
  const makeText = (data: commentObjectType[] | undefined) => {
    if (typeof data !== "undefined") {
      let playerName: string;
      let player1: string;
      let player2: string;
      switch (data[0].type) {
        case "matchEnded":
          return "경기 종료";
        case "endSecondHalf":
          return "후반전 종료됩니다.";
        case "shotSaved":
          // let player = data[0].player.id
          API.get("/player/id", { params: { player_id: data[0].player.id } })
            .then((res) => {
              playerName = res.data.familyname;
              return playerName + "의 슈팅, 그러나 골키퍼의 선방.";
            })
            .catch((err) => {
              console.log(err);
              return "";
            });
          return "세이브";
        case "shotOffTarget":
          API.get("/player/id", { params: { player_id: data[0].player.id } })
            .then((res) => {
              playerName = res.data.familyname;
              return playerName + "의 슈팅, 그러나 빗나갑니다.";
            })
            .catch((err) => {
              console.log(err);
              return "";
            });
          return "빗나간 슈팅";
        case "substitution":
          API.get("/player/id", { params: { player_id: data[0].playerIn.id } })
            .then((res) => {
              player1 = res.data.familyname;
              API.get("/player/id", {
                params: { player_id: data[0].playerOut.id },
              })
                .then((res) => {
                  player2 = res.data.familyname;
                  return player2 + " 나가고, " + player2 + " 들어갑니다.";
                })
                .catch((err) => {
                  console.log(err);
                  return "";
                });
            })
            .catch((err) => {
              console.log(err);
              return "";
            });
          return "선수 교체";
        case "scoreChange":
          API.get("/player/id", { params: { player_id: data[0].player.id } })
            .then((res) => {
              playerName = res.data.familyname;
              return playerName + " 득점. 골!";
            })
            .catch((err) => {
              console.log(err);
              return "";
            });
          return "골!";
        case "cornerKick":
          API.get("/player/id", { params: { player_id: data[0].player.id } })
            .then((res) => {
              playerName = res.data.familyname;
              return playerName + " 의 코너킥.";
            })
            .catch((err) => {
              console.log(err);
              return "";
            });
          return "코너킥";
        case "offside":
          API.get("/player/id", { params: { player_id: data[0].player.id } })
            .then((res) => {
              playerName = res.data.familyname;
              return playerName + " 의 오프사이드.";
            })
            .catch((err) => {
              console.log(err);
              return "";
            });
          return "오프사이드";
        case "matchStarted":
          return "경기 시작";
        case "endFirstHalf":
          return "전반전이 종료됩니다.";
        case "shotBlocked":
          API.get("/player/id", { params: { player_id: data[0].player.id } })
            .then((res) => {
              playerName = res.data.familyname;
              return playerName + " 의 선방";
            })
            .catch((err) => {
              console.log(err);
              return "";
            });
          return "선방";
      }
    } else return "";
  };
  const makeFlag = (data: commentObjectType[] | undefined) => {
    if (typeof data !== "undefined" && "isHome" in data[0]) {
      switch (data[0].isHome) {
        case true:
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
        case false:
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
    let url = "event/" + matchId.toString() + "/comments";
    let h = {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    };
    sofaAPI
      .get(url, { headers: h })
      .then((res) => {
        setCommentRelayData(res.data.comments);
        setIsEmptyRelay(false);
      })
      .catch((err) => {
        console.log(err);
      });
    sofaAPI
      .get("event/" + matchId.toString(), { headers: h })
      .then((res) => {
        setHomeScore(res.data.event.homeScore.current);
        setAwayScore(res.data.event.awayScore.current);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [matchId]);

  useInterval(() => {
    let url = "event/" + matchId.toString() + "/comments";
    let h = {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    };
    sofaAPI
      .get(url, { headers: h })
      .then((res) => {
        setCommentRelayData(res.data.comments);
        setIsEmptyRelay(false);
      })
      .catch((err) => {
        console.log(err);
      });
    sofaAPI
      .get("event/" + matchId.toString(), { headers: h })
      .then((res) => {
        setHomeScore(res.data.event.homeScore.current);
        setAwayScore(res.data.event.awayScore.current);
      })
      .catch((err) => {
        console.log(err);
      });
  }, 10000);

  return (
    <div className="flex justify-center items-end flex-col h-full w-full animate__animated animate__backInUp">
      <div className="flex flex-col rounded-xl h-1/2 justify-center items-center w-full -outline-offset-2 outline-none outline-8 outline-black">
        <div
          className="grid w-full h-full bg-yellow-300 rounded-t-2xl items-center justify-center text-3xl font-['Jua']"
          style={{
            textShadow:
              "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white",
          }}
        >
          {isEmptyRelay ? "경기 시작 전입니다." : makeSubject(commentRelayData)}
        </div>
        <div
          className="grid w-full h-full bg-yellow-600 rounded-b-2xl items-center justify-center text-2xl font-['Jua'] "
          style={{
            textShadow:
              "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white",
          }}
        >
          {isEmptyRelay ? "경기 시작 전입니다." : makeText(commentRelayData)}
        </div>
        <div className="absolute left-0 outline-none outline-8 outline-black rounded-full -outline-offset-2 bg-white">
          {makeFlag(commentRelayData)}
        </div>
      </div>
    </div>
  );
};

export default CommentComponent;
