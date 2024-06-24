import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FormButton } from '../../../shared/ui/FormButton';
import { FormField } from '../../../shared/ui/FormField';
import { useStores } from '../../../app/RootStore.context';
import { updateArticle } from '../../../features/article/updateArticle/api/updateArticle';
import styles from './styles.module.scss';
import { observer } from 'mobx-react-lite';

const defaultFormFields = {
  title: '',
  description: '',
  body: '',
  tagList: [] as string[],
};

const FormEditArticle = observer(() => {
  const {
    articlesStore: { article, fetchArticle },
  } = useStores();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) return;
    fetchArticle(slug, {
      onError: () => navigate('/'),
    });
  }, [slug, fetchArticle, navigate]);

  useEffect(() => {
    if (article) {
      setFormFields({
        title: article.title || '',
        description: article.description || '',
        body: article.body || '',
        tagList: article.tagList || [],
      });
    }
  }, [article]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!slug) return;
    updateArticle(slug, formFields)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка запроса');
        }
        return response.json();
      })
      .then(() => navigate(`/`));
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
          value={formFields.title}
          placeholder='Article title'
        />
        <FormField
          type='text'
          onChange={handleChange}
          name='description'
          value={formFields.description}
          placeholder="What's this article about"
        />
        <FormField
          type='text'
          onChange={handleChange}
          name='body'
          value={formFields.body}
          placeholder='Write your article (in markdown)'
        />
        <FormField
          type='text'
          onChange={handleChange}
          name='tagList'
          value={formFields.tagList.join(', ')}
          placeholder='Enter tags'
        />
        <FormButton
          size='big'
          nameBut='Publish article'
        />
      </form>
    </div>
  );
});

export default FormEditArticle;
