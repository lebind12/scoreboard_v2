import StatusComponent from "../components/StatusComponent";
import FormationComponent from "../components/FormationComponent";

const ScreenLayout = () => {
  return (
    <div className="flex w-full h-full bg-slate-400">
      <div className="flex w-1/4 h-full bg-slate-50 items-center">
        <StatusComponent />
      </div>
      <div className="w-1/2 h-full bg-slate-400"></div>
      <div className="flex w-1/4 h-full bg-slate-50 items-center">
        <FormationComponent />
      </div>
    </div>
  );
};

export default ScreenLayout;
