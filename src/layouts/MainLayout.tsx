import BottomLayout from "./BottomLayout";
import ScreenLayout from "./ScreenLayout";
import { useBoardContext } from "../context/ScoreboardContext";
import API from "../utils/apis/api/api";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const { matchId, setMatchId, selected, setSelected } = useBoardContext();
  const [home, setHome] = useState("");
  const [away, setAway] = useState("");
  const [homeId, setHomeId] = useState(4695);
  const [awayId, setAwayId] = useState(4695);
  const [sofaMatchId, setSofaMatchId] = useState(0);
  const [naverId, setNaverId] = useState("");
  const [id, setId] = useState(0);

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
            setId(res.data.id);
            setNaverId(res.data.naverid);
          } else {
            console.log("Cannot use Backend 1");
          }
        })
      );
    }
  }, [matchId]);

  return (
    <div
      id="MainLayout"
      className={`${
        selected
          ? "flex flex-col flex-none w-full h-full "
          : "flex flex-col flex-none w-full h-full brightness-50 blur-sm"
      }`}
    >
      <div className="w-full h-[150px]">
        <BottomLayout
          homeName={home}
          awayName={away}
          matchId={sofaMatchId}
          homeId={homeId}
          awayId={awayId}
          naverId={naverId}
          id={id}
        ></BottomLayout>
      </div>
      <div className="w-full h-full">
        <ScreenLayout
          matchId={sofaMatchId}
          naverId={naverId}
          homeId={homeId}
          awayId={awayId}
          home={home}
          away={away}
          id={id}
        ></ScreenLayout>
      </div>
    </div>
  );
};

export default MainLayout;
