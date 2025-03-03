import Die from "./Die";
import React from "react";
// import Confetti from "./Confetti";

import Confetti from "react-confetti";
function App() {
  const [diceArray, setDiceArray] = React.useState(() => getDiceArray());
  const buttonRef = React.useRef(null);
  //=========================Winning Game=============================
  const gameWon =
    diceArray.every((die) => die.isHeld) &&
    diceArray.every((die) => die.value === diceArray[0].value);
  //===================Focus on New Game Button ======================
  React.useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);
  //=========More Declarative way using Array construction============
  function getDiceArray() {
    let count = 0;
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: count++,
    }));
  }
  //==================================================================
  //========================Mapping our Array=========================
  const diceField = diceArray.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      setHeld={die.isHeld}
      // changeHeld={changeHold}
      changeHeld={() => changeHold(die.id)}
    />
  ));
  //==================================================================
  function getUpdateDiceArray() {
    setDiceArray((prevDiceArray) =>
      prevDiceArray.map((die) =>
        die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
      )
    );
  }
  //=============================Change Hold State=====================
  function changeHold(id) {
    setDiceArray((prevDiceArray) =>
      prevDiceArray.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }
  //=============================New Game=====================
  function getNewGame() {
    setDiceArray(getDiceArray());
  }
  const ButtonText = gameWon ? "New Game" : "Roll";
  return (
    <main>
      {gameWon ? <Confetti /> : null}
      <div aria-live="polite" className="sr-only">
        {gameWon ? (
          <p>Congratulations! You won! Press "New Game" to start again </p>
        ) : null}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-field">{diceField}</div>
      <button
        ref={buttonRef}
        className="roll-dice"
        onClick={gameWon ? getNewGame : getUpdateDiceArray}
      >
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
export default App;
