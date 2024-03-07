import { useEffect } from 'react';
import useAnimatedList from '../../../hooks/useAnimatedList';
import { toastEventManager } from '../../../utils/toast';

export default function useToastContainer() {
  const {
    handleRemoveItem,
    setItems: setMessages,
    renderList,
  } = useAnimatedList([]);

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(),
          type,
          text,
          duration,
        },
      ]);
    }
    toastEventManager.on('addToast', handleAddToast);
    return () => {
      toastEventManager.removeListener('addToast', handleAddToast);
    };
  }, [setMessages]);

  return {
    handleRemoveItem,
    renderList,
  };
}
