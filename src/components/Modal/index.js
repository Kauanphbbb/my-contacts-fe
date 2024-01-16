import PropTypes from 'prop-types';
import Button from '../Button';
import { Container, Footer, Overlay } from './styles';

export default function Modal({ danger }) {
  return (
    <Overlay>
      <Container danger={danger}>
        <h1>
          Título do modal
        </h1>
        <p>
          Corpo do modal
        </p>
        <Footer>
          <button type="button" className="cancel-button">Cancelar</button>
          <Button type="button" danger>Deletar</Button>
        </Footer>
      </Container>
    </Overlay>
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
};
