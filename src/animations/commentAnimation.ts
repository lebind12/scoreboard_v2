import "animate.css";

export const commentAnimation = (element: any) => {
  element.classList.add("animate__backInUp");
  element.classList.remove("animate__backInUp");
  element.classList.add("animate__backOutDown");
};

export const test = 1;
