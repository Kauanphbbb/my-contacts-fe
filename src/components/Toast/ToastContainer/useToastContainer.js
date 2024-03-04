import { useEffect } from 'react';
import useAnimatedList from '../../../hooks/useAnimatedList';
import { toastEventManager } from '../../../utils/toast';

export default function useToastContainer() {
  const {
    handleAnimationEnd,
    handleRemoveItem,
    items: messages,
    pendingRemovalItemsIds,
    setItems: setMessages,
  } = useAnimatedList([{ id: 123, text: 'Hello World', type: 'default' }]);

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
    messages,
    pendingRemovalItemsIds,
    handleRemoveItem,
    handleAnimationEnd,
  };
}
