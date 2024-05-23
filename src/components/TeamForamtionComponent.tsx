import FieldBoard from "../assets/FieldBoard.png";

const TeamFormationComponent = () => {
  return (
    <div className="flex flex-col h-full bg-green-500 justify-center">
      <div className="w-full text-xl bg-slate-200 text-center"> 팀명 </div>
      <img src={FieldBoard} alt="보드" className="h-5/6"></img>
    </div>
  );
};

export default TeamFormationComponent;
