import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export default function useSafeAsyncState(initialState) {
  const [state, setState] = useState(initialState);

  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const setSafeAsyncState = useCallback((newState) => {
    if (isMounted.current) {
      setState(newState);
    }
  }, []);

  return [state, setSafeAsyncState];
}
