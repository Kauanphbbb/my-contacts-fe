import { useEffect, useState } from 'react';
import { toastEventManager } from '../../../utils/toast';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast({ type, text }) {
      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text },
      ]);
    }
    toastEventManager.on('addToast', handleAddToast);
    return () => {
      toastEventManager.removeListener('addToast', handleAddToast);
    };
  }, []);
  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          text={message.text}
          type={message.type}
          key={message.id}
        />
      ))}
    </Container>
  );
}
