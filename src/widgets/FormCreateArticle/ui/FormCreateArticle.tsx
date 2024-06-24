import { useState } from 'react';
import { FormButton } from '../../../shared/ui/FormButton';
import { FormField } from '../../../shared/ui/FormField';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { createArticle } from '../../../features/article/createArticle/api/createArticle';

const defaultFormFields = {
  title: '',
  description: '',
  body: '',
  tagList: [],
};

export function FormCreateArticle() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createArticle(formFields)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка запроса');
        }
        return response.json();
      })
      .then(() => navigate('/'));
  };

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]:
        name === 'tagList' ? value.split(',').map((tag) => tag.trim()) : value,
    }));
  };

  return (
    <div className={styles.edit}>
      <form
        onSubmit={handleSubmit}
        className={styles.formContainer}>
        <FormField
          type='text'
          onChange={handleChange}
          name='title'
          placeholder='Article title'
        />
        <FormField
          type='text'
          onChange={handleChange}
          name='description'
          placeholder="What's this article about"
        />
        <FormField
          type='text'
          onChange={handleChange}
          name='body'
          placeholder='Write your article (in markdown)'
        />
        <FormField
          type='text'
          onChange={handleChange}
          name='tagList'
          placeholder='Enter tags'
        />
        <FormButton
          size='big'
          nameBut='Publish article'
        />
      </form>
    </div>
  );
}
