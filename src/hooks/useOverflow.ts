import { RefObject, useLayoutEffect, useState } from "react";

export default function useOverflow(
  ref: RefObject<HTMLElement>,
  callback?: (hasOverflow: boolean) => void
) {
  const [isOverflow, setIsOverflow] = useState(false);

  useLayoutEffect(() => {
    const { current } = ref;

    const trigger = () => {
      if (current) {
        const hasOverflow = current.scrollWidth > current.clientWidth;

        setIsOverflow(hasOverflow);

        if (callback) {
          callback(hasOverflow);
        }
      }
    };

    if (current) {
      if ("ResizeObserver" in window) {
        new ResizeObserver(trigger).observe(current);
      } else {
        trigger();
      }
    }
  }, [callback, ref.current]);

  return { isOverflow };
}
