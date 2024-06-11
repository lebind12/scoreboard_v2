import ScoreComponent from "../components/ScoreComponent";
import CommentComponent from "../components/CommentComponent";
import API from "../utils/apis/api/api";
import qs from "qs";
import { useEffect } from "react";

const BottomLayout = () => {
  let params = { match_id: 3 };

  useEffect(() => {
    let test = API.get("/match/id", { params });
    console.log(test);
  }, []);
  return (
    <div className="flex w-full h-full bg-amber-600 ">
      <div className="w-1/4 bg-gray-500">
        <ScoreComponent />
      </div>
      <div className="flex justify-center items-center w-2/4 bg-gray-50">
        <CommentComponent />
      </div>
      <div className="w-1/4 bg-gray-950"></div>
    </div>
  );
};

export default BottomLayout;
