import { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ContactForm from '../../components/ContactForm';
import Loader from '../../components/Loader';
import PageHeader from '../../components/PageHeader';
import { useSafeAsyncAction } from '../../hooks/useSafeAsyncAction';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  const { id } = useParams();
  const history = useHistory();
  const contactFormRef = useRef(null);
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id);
        safeAsyncAction(() => {
          contactFormRef.current.setFieldsValues(contact);
          setContactName(contact.name);
          setIsLoading(false);
        });
      } catch {
        safeAsyncAction(() => {
          history.push('/');
          toast({
            type: 'danger',
            text: 'Contato não encontrado',
          });
        });
      }
    }

    loadContact();
  }, [id, history, safeAsyncAction]);

  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

      const updatedContact = await ContactsService.updateContact(id, contact);

      setContactName(updatedContact.name);
      toast({
        type: 'success',
        text: 'Contato atualizado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao atualizar o contato!',
      });
    }
  }
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
