import { useEffect, useState } from "react";

export default function useDebound(initializeValue, delay = 1000) {
  //
  const [deboundValue, setDeboundValue] = useState(initializeValue);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDeboundValue(initializeValue);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay, initializeValue]);
  return deboundValue;
}
