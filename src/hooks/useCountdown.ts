import { useEffect, useState } from "react";

export default function useCountdown(
  initialTime: number,
  interval: number = 1000
) {
  const [countdown, setCountdown] = useState(initialTime);
  const [shouldStartCountdown, setShouldStartCountdown] = useState(false);

  let intervalId: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (shouldStartCountdown) {
      intervalId = setInterval(() => {
        if (countdown > 0) {
          setCountdown((prev) => prev - 1);
        }
      }, interval);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [countdown, shouldStartCountdown]);

  const startCountdown = () => {
    setCountdown(initialTime);
    setShouldStartCountdown(true);
  };

  const stopCountdown = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setShouldStartCountdown(false);
  };

  const restartCountdown = () => {
    stopCountdown();
    startCountdown();
  };

  return { countdown, startCountdown, stopCountdown, restartCountdown };
}
