import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import { ButtonContainer, Form } from './styles';
import useContactForm from './useContactForm';

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const {
    name,
    email,
    phone,
    categoryId,
    categories,
    isSubmitting,
    isLoadingCategories,
    isFormValid,
    getErrorMessageByFieldName,
    handleNameChange,
    handleEmailChange,
    handlePhoneChange,
    handleSubmit,
    setCategoryId,
  } = useContactForm(onSubmit, ref);

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          $error={getErrorMessageByFieldName('name')}
          placeholder="Nome *"
          value={name}
          onChange={handleNameChange}
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          $error={getErrorMessageByFieldName('email')}
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup>
        <Input
          maxLength={15}
          type="tel"
          placeholder="Telefone"
          value={phone}
          onChange={handlePhoneChange}
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="">Sem categoria</option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid} isLoading={isSubmitting}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
});

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
