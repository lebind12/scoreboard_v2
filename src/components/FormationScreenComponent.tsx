import TeamFormationComponent from "./TeamForamtionComponent";

const FormationScreenComponent = () => {
  return (
    <div className="flex flex-col w-full h-full items-center">
      {/* 홈 포메이션 */}
      <div className="h-1/2">
        <TeamFormationComponent />
      </div>
      {/* 어웨이 포메이션 */}
      <div className="h-1/2">
        <TeamFormationComponent />
      </div>
    </div>
  );
};

export default FormationScreenComponent;
