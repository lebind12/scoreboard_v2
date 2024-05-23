const CommentComponent = () => {
  return (
    <div className="p-4 flex justify-center flex-col h-full w-full">
      <div className="flex h-1/4 bg-yellow-300 rounded-t-2xl">
        <div className="w-1/5 h-full bg-slate-300 rounded-tl-2xl">국가</div>
        <div className="w-full"> 제목 </div>
      </div>
      <div className=" h-1/4 bg-yellow-600 rounded-b-2xl">하단</div>
    </div>
  );
};

export default CommentComponent;
