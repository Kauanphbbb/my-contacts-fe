import Modal from '../../components/Modal';
import { Container } from './styles';

import Loader from '../../components/Loader';
import ContactsList from './components/ContactsList';
import EmptyList from './components/EmptyList';
import ErrorStatus from './components/ErrorStatus';
import Header from './components/Header';
import InputSearch from './components/InputSearch';
import SearchNotFound from './components/SearchNotFound';
import useHome from './useHome';

export default function Home() {
  const {
    isLoading,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleDeleteConfirmContact,
    isDeleteModalVisible,
    isLoadingDelete,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    filteredContacts,
    handleTryAgain,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact,
  } = useHome();

  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && !hasContacts && !isLoading;
  const isSearchEmpty = !hasError && hasContacts && filteredContacts.length < 1;

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {hasContacts && (
        <InputSearch value={searchTerm} onChange={handleChangeSearchTerm} />
      )}

      <Header
        hasError={hasError}
        quantityOfContacts={contacts.length}
        quantityOfFilteredContacts={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isListEmpty && <EmptyList />}
      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

      {hasContacts && (
        <>
          <ContactsList
            filteredContacts={filteredContacts}
            onDeleteContact={handleDeleteContact}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            contactBeingDeleted={contactBeingDeleted}
          />

          <Modal
            danger
            title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}?"`}
            confirmLabel="Deletar"
            onCancel={handleCloseDeleteModal}
            onConfirm={handleDeleteConfirmContact}
            visible={isDeleteModalVisible}
            isLoading={isLoadingDelete}
          >
            <p>Esta ação não poderá ser desfeita!</p>
          </Modal>
        </>
      )}
    </Container>
  );
}
