import StatusComponent from "../components/StatusComponent";
import FormationScreenComponent from "../components/FormationScreenComponent";
import "animate.css";

const ScreenLayout = () => {
  return (
    <div className="flex w-full h-full bg-slate-400">
      <div className="flex w-1/4 h-full bg-slate-50 items-center animate__animated animate__backInLeft">
        <StatusComponent />
      </div>
      <div className="w-1/2 h-full bg-slate-400"></div>
      <div className="flex flex-1 w-1/4 h-full bg-slate-50 items-center animate__animated animate__backInRight">
        <FormationScreenComponent />
      </div>
    </div>
  );
};

export default ScreenLayout;
