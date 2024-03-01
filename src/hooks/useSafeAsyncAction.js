import { useCallback } from 'react';
import useIsMounted from './useIsMounted';

export default function useSafeAsyncAction() {
  const isMounted = useIsMounted();
  const runSafeAsyncAction = useCallback((action) => {
    if (isMounted()) {
      action();
    }
  }, [isMounted]);
  return runSafeAsyncAction;
}
