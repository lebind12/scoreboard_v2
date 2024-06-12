import "../styles/animate.css";
import { CommentComponentProps } from "../types/propsType";

const CommentComponent = ({ nationId }: CommentComponentProps) => {
  return (
    <div className="flex justify-center flex-col h-full w-full animate__animated animate__backInUp">
      <div className="grid h-1/4 bg-yellow-300 rounded-t-2xl items-center justify-center text-3xl font-['Jua']">
        <div className="absolute w-1/6 h-1/4 overflow-hidden items-center rounded-tl-2xl flag_background">
          <img
            src={`${
              "https://api.sofascore.app/api/v1/team/" +
              nationId.toString() +
              "/image"
            }`}
            className="relative top-[-40px]"
          ></img>
          <div className="w-full h-full left_gradient_mask"></div>
        </div>
        전반 20분 이탈리아 경고
      </div>
      <div className="grid h-1/4 bg-yellow-600 rounded-b-2xl items-center justify-center text-3xl font-['Jua'] ">
        8번 토티에게 옐로우카드가 주어집니다.
      </div>
    </div>
  );
};

export default CommentComponent;
