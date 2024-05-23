import ScoreComponent from "../components/ScoreComponent";
import CommentComponent from "../components/CommentComponent";

const BottomLayout = () => {
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
