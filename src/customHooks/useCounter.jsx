import React, { useState } from "react";

const useCounter = () => {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    if (count > 0) setCount(count - 1);
  }

  return [count, increment, decrement];
};

export default useCounter;
