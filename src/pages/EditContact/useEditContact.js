import { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function useEditContact() {
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

  async function handleSubmit(contact) {
    try {
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

  return {
    contactName,
    isLoading,
    contactFormRef,
    handleSubmit,
  };
}
