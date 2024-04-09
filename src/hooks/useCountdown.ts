import { useCallback, useEffect, useRef, useState } from "react";

export default function useCountdown(
  initialTime: number,
  interval: number = 1000
) {
  const [countdown, setCountdown] = useState(initialTime);
  const [shouldStartCountdown, setShouldStartCountdown] = useState(false);

  const intervalId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (shouldStartCountdown) {
      intervalId.current = setInterval(() => {
        if (countdown > 0) {
          setCountdown((prev) => prev - 1);
        }
      }, interval);
    }

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [countdown, shouldStartCountdown, intervalId, interval]);

  const startCountdown = useCallback(() => {
    setCountdown(initialTime);
    setShouldStartCountdown(true);
  }, [initialTime]);

  const stopCountdown = useCallback(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
    setShouldStartCountdown(false);
  }, []);

  const restartCountdown = useCallback(() => {
    stopCountdown();
    startCountdown();
  }, [startCountdown, stopCountdown]);

  return { countdown, startCountdown, stopCountdown, restartCountdown };
}
