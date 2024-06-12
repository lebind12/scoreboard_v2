import ScoreComponent from "../components/ScoreComponent";
import CommentComponent from "../components/CommentComponent";
import API from "../utils/apis/api/api";
import qs from "qs";
import { useEffect, useState } from "react";
import { useBoardContext } from "../context/ScoreboardContext";

const BottomLayout = () => {
  const { matchId, setMatchId, selected, setSelected } = useBoardContext();
  const [home, setHome] = useState("");
  const [away, setAway] = useState("");
  const [homeId, setHomeId] = useState(4695);
  const [awayId, setAwayId] = useState(4695);
  const [sofaMatchId, setSofaMatchId] = useState(0);

  useEffect(() => {
    if (matchId != 99) {
      let params = { match_id: matchId };
      let test = API.get("/match/id", { params });
      console.log(
        test.then((res) => {
          if (res.status == 200) {
            console.log(res.data);
            setHome(res.data.home);
            setAway(res.data.away);
            setHomeId(res.data.homeid);
            setAwayId(res.data.awayid);
            setSofaMatchId(res.data.sofascoredid);
          } else {
            console.log("Cannot use Backend 1");
          }
        })
      );
    }
  }, [matchId]);

  return (
    <div className="flex w-full h-full bg-amber-600 ">
      <div className="w-1/4 bg-gray-500">
        <ScoreComponent
          homeName={home}
          awayName={away}
          matchId={sofaMatchId}
          homeId={homeId}
          awayId={awayId}
        />
      </div>
      <div className="p-4 flex justify-center items-center w-2/4 bg-gray-50">
        <CommentComponent nationId={homeId} />
      </div>
      <div className="w-1/4 bg-gray-950"></div>
    </div>
  );
};

export default BottomLayout;
