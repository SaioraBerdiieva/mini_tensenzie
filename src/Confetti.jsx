import React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function ConfettiEffect() {
  const { width, height } = useWindowSize(); // Get full window size

  return <Confetti width={width} height={height} />;
}
