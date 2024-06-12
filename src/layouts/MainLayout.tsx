import BottomLayout from "./BottomLayout";
import ScreenLayout from "./ScreenLayout";
import { useBoardContext } from "../context/ScoreboardContext";

const MainLayout = () => {
  const { matchId, setMatchId, selected, setSelected } = useBoardContext();

  return (
    <div
      id="MainLayout"
      className={`${
        selected
          ? "flex flex-col flex-none w-full h-full"
          : "flex flex-col flex-none w-full h-full brightness-50 blur-sm"
      }`}
    >
      <div className="w-full h-3/4">
        <ScreenLayout></ScreenLayout>
      </div>
      <div className="w-full h-1/4">
        <BottomLayout></BottomLayout>
      </div>
    </div>
  );
};

export default MainLayout;
