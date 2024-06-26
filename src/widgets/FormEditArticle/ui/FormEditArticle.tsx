import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { FormButton } from '../../../shared/ui/FormButton';
import { FormField } from '../../../shared/ui/FormField';
import { updateArticle } from '../../../features/article/updateArticle/api/updateArticle';
import { observer } from 'mobx-react-lite';
import styles from './styles.module.scss';
import { Article } from '../../../shared/utils/types';
import { useEffect } from 'react';

interface ArticleProps {
  article: Article;
}

interface EditArticle {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

const FormEditArticle = observer(({ article }: ArticleProps) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: article.title,
      description: article.description,
      body: article.body,
      tagList: article.tagList,
    },
  });

  useEffect(() => {
    reset({
      title: article.title,
      description: article.description,
      body: article.body,
      tagList: article.tagList,
    });
  }, [article, reset]);

  const { slug } = useParams();
  const navigate = useNavigate();

  const submit = (data: EditArticle) => {
    if (!slug) return;
    updateArticle(slug, data)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка запроса');
        }
        return response.json();
      })
      .then(() => navigate(`/`));
  };

  return (
    <div className={styles.edit}>
      <form onSubmit={handleSubmit(submit)} className={styles.formContainer}>
        <FormField
          {...register('title')}
          type='text'
          name='title'
          placeholder='Article title'
        />
        <FormField
          {...register('description')}
          type='text'
          name='description'
          placeholder="What's this article about"
        />
        <FormField
          {...register('body')}
          type='text'
          name='body'
          placeholder='Write your article (in markdown)'
        />
        <FormField
          {...register('tagList')}
          type='text'
          name='tagList'
          placeholder='Enter tags'
        />
        <FormButton size='big' nameBut='Publish article' />
      </form>
    </div>
  );
});

export default FormEditArticle;
