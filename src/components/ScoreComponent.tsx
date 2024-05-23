import TeamComponent from "./TeamComponent";

const ScoreComponent = () => {
  return (
    <div className="flex flex-col w-full h-full p-2">
      <div className="flex w-full h-1/3">
        <div className="flex w-max h-full bg-white items-center">
          <h1 className="text-6xl font-bold p-2">00:00</h1>
        </div>
        <div className="flex w-full text-4xl items-center justify-center">
          2024 유로 예선전
        </div>
      </div>
      <div className="h-2/3">
        <div className="w-full h-1/2 bg-amber-300">
          <TeamComponent />
        </div>
        <div className="w-full h-1/2 bg-amber-900">
          <TeamComponent />
        </div>
      </div>
    </div>
  );
};

export default ScoreComponent;
