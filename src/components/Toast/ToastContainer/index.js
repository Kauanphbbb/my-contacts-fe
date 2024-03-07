import ToastMessage from '../ToastMessage';
import { Container } from './styles';
import useToastContainer from './useToastContainer';

export default function ToastContainer() {
  const { handleRemoveItem, renderList } = useToastContainer();

  return (
    <Container>
      {renderList((message, { isLeaving, animatedRef }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveItem}
          isLeaving={isLeaving}
          animatedRef={animatedRef}
        />
      ))}
    </Container>
  );
}
