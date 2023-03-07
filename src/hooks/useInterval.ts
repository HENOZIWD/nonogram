import { useEffect, useRef } from 'react';

function useInterval (callback: () => void, ms?: number) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current !== undefined && savedCallback.current !== null) {
        savedCallback.current();
      }
    }

    if (ms !== undefined && ms !== null) {
      const id = setInterval(tick, ms);
      return () => clearInterval(id);
    }
  }, [ms]);
  
}

export { useInterval };