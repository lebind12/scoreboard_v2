import BottomLayout from "./BottomLayout";
import ScreenLayout from "./ScreenLayout";

const MainLayout = () => {
  return (
    <div className="flex flex-col flex-none w-full h-full">
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
