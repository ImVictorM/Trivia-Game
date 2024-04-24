import { useEffect, useRef, useState } from "react";

export default function useDelayedUnmount(
  isMounted: boolean,
  delayTime: number
) {
  const [shouldRender, setShouldRender] = useState(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isMounted && !shouldRender) {
      setShouldRender(true);
    } else if (!isMounted && shouldRender) {
      timeoutIdRef.current = setTimeout(() => {
        setShouldRender(false);
      }, delayTime);
    }

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [delayTime, isMounted, shouldRender]);

  return { shouldRender };
}
