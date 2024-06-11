import API from "../utils/apis/api/api";
import { MatchDetail } from "../types/apiReturnType";
import { useEffect, useState } from "react";

const MatchSelectLayout = () => {
  const [matches, setMatches] = useState([]);

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
    <div className="absolute m-auto h-[300px] overflow-scroll top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-10 rounded-lg">
      <ul>
        {matches.map((v: MatchDetail, idx) => {
          return (
            <li key={idx}>
              <span className="font-['BMHANNA'] text-6xl">
                {v.home} : {v.away}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MatchSelectLayout;
