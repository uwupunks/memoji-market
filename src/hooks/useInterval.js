import { useState, useEffect } from "react";

export function useInterval(callback, delay) {
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
      if (intervalId) clearInterval(intervalId);
      const newId = setInterval(callback, delay);
      return () => clearInterval(newId);
    }, [callback, delay]);
  
    return intervalId;
  }