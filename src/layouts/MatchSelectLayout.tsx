import API from "../utils/apis/api/api";
import { MatchDetail } from "../types/apiReturnType";
import { useEffect, useState } from "react";
import { useBoardContext } from "../context/ScoreboardContext";

const MatchSelectLayout = () => {
  const [matches, setMatches] = useState([]);
  const { matchId, setMatchId, selected, setSelected } = useBoardContext();

  useEffect(() => {
    const res = API.get("/match/list").then((res) => {
      if (res.status === 200) {
        setMatches(res.data);
      } else {
        console.log("Cannot use Backend");
      }
    });
  }, []);
  return (
    <div
      className={`${
        selected
          ? "hidden"
          : "absolute m-auto w-auto p-4 h-[400px] overflow-y-scroll\
                    top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2\
                    z-10 rounded-lg bg-slate-800\
                    outline-white outline-double outline-[16px]"
      }`}
    >
      <ul>
        {matches.map((v: MatchDetail, idx) => {
          if (idx == 36)
            return (
              <>
                <li className="flex justify-center">
                  <span className="font-['Jua'] text-3xl text-red-400">
                    16강 대진
                  </span>
                </li>
                <li key={idx} className="bg-slate-800">
                  <button
                    className="w-full"
                    onClick={() => {
                      setMatchId(v.id);
                      setSelected(true);
                    }}
                  >
                    <span className="font-['Jua'] text-6xl text-zinc-50">
                      {v.home} : {v.away}
                    </span>
                  </button>
                </li>
              </>
            );
          else if (idx == 44)
            return (
              <>
                <li className="flex justify-center">
                  <span className="font-['Jua'] text-3xl text-red-400">
                    8강 대진
                  </span>
                </li>
                <li key={idx} className="bg-slate-800">
                  <button
                    className="w-full"
                    onClick={() => {
                      setMatchId(v.id);
                      setSelected(true);
                    }}
                  >
                    <span className="font-['Jua'] text-6xl text-zinc-50">
                      {v.home} : {v.away}
                    </span>
                  </button>
                </li>
              </>
            );
          else if (idx == 48)
            return (
              <>
                <li className="flex justify-center">
                  <span className="font-['Jua'] text-3xl text-red-400">
                    준결승 대진
                  </span>
                </li>
                <li key={idx} className="bg-slate-800">
                  <button
                    className="w-full"
                    onClick={() => {
                      setMatchId(v.id);
                      setSelected(true);
                    }}
                  >
                    <span className="font-['Jua'] text-6xl text-zinc-50">
                      {v.home} : {v.away}
                    </span>
                  </button>
                </li>
              </>
            );
          else
            return (
              <li key={idx} className="bg-slate-800">
                <button
                  className="w-full"
                  onClick={() => {
                    setMatchId(v.id);
                    setSelected(true);
                  }}
                >
                  <span className="font-['Jua'] text-6xl text-zinc-50">
                    {v.home} : {v.away}
                  </span>
                </button>
              </li>
            );
        })}
      </ul>
    </div>
  );
};

export default MatchSelectLayout;
