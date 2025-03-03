export default function Die(props) {
  const styles = { backgroundColor: props.setHeld ? "#59e391" : "white" };
  return (
    <button
      style={styles}
      onClick={props.changeHeld}
      aria-label={`This is a die with value ${props.value},
        $(props.setHeld ? "held" : "not held")`}
      aria-pressed={props.setHeld}
    >
      {props.value}
    </button>
  );
}
