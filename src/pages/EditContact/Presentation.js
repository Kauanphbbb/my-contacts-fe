import PropTypes from 'prop-types';
import ContactForm from '../../components/ContactForm';
import Loader from '../../components/Loader';
import PageHeader from '../../components/PageHeader';

export default function Presentation({
  isLoading,
  contactName,
  contactFormRef,
  handleSubmit,
}) {
  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title={isLoading ? 'Carregando...' : `Editar ${contactName}`} />
      <ContactForm
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
        ref={contactFormRef}
      />
    </>
  );
}

Presentation.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  contactName: PropTypes.string.isRequired,
  contactFormRef: PropTypes.shape().isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
