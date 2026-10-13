import "./Button.css";
function Button({ weight = " ", type = "submit", disabled = false, ...props }) {
  const style = "button " + "button-" + props.class + " " + weight;
  return (
    <button className={style} type={type} onClick={props.onClick} disabled={disabled}>
      {props.children}
    </button>
  );
}

export default Button;
