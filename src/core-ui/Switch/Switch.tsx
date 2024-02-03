import "./Switch.scss";

const Switch: React.FC<{
  billType: boolean | null;
  changeBillType: (event: React.MouseEvent<HTMLDivElement>) => void;
}> = (props) => {
  return (
    <div
      className={`switch ${props.billType ? null : "active"}`}
      onClick={props.changeBillType}
    >
      <div className="switch__indicator"></div>
    </div>
  );
};

export default Switch;
