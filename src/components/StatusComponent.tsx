const StatusComponent = () => {
  return (
    <div className="w-full h-full  items-center p-10">
      <div className="flex flex-col w-full h-full bg-white">
        {/* 상단 */}
        <div className="flex flex-col w-full min-h-[200px] bg-slate-300">
          <div className="flex flex-col w-full h-full bg-slate-700">
            <div className="w-full h-full bg-slate-100">사진</div>
            <div className="w-full min-h-max bg-slate-200">이름</div>
          </div>
          <div className="flex w-full min-h-[70px]">
            <div className="w-full bg-blue-600"></div>
            <div className="w-full bg-blue-400"></div>
            <div className="w-full bg-blue-200"></div>
          </div>
        </div>
        {/* 내용 */}
        <div className="flex flex-col w-full h-full bg-slate-100"></div>
        {/* 하단 */}
        <div className="flex flex-col w-full min-h-[70px] bg-black"></div>
      </div>
    </div>
  );
};

export default StatusComponent;
