import ToastMessage from '../ToastMessage';
import { Container } from './styles';
import useToastContainer from './useToastContainer';

export default function ToastContainer() {
  const {
    handleAnimationEnd,
    handleRemoveItem,
    messages,
    pendingRemovalItemsIds,
  } = useToastContainer();

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveItem}
          isLeaving={pendingRemovalItemsIds.includes(message.id)}
          onAnimationEnd={handleAnimationEnd}
        />
      ))}
    </Container>
  );
}
