import React from "react";

const Button: React.FC<{
  className: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  icon: any;
  text: string;
}> = (props) => {
  return (
    <button className={props.className} onClick={props.onClick}>
      <span className={`fix-icon`}>{props.icon}</span>
      {props.text}
    </button>
  );
};

export default Button;
