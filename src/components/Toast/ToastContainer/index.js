import { useEffect, useState } from 'react';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast(event) {
      const { type, text } = event.detail;
      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text },
      ]);
    }
    document.addEventListener('addToast', handleAddToast);
    return () => {
      document.removeEventListener('addToast', handleAddToast);
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
