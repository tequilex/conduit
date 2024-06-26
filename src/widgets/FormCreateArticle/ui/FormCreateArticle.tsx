import { useForm } from 'react-hook-form';
import { FormButton } from '../../../shared/ui/FormButton';
import { FormField } from '../../../shared/ui/FormField';
import { useNavigate } from 'react-router-dom';
import { createArticle } from '../../../features/article/createArticle/api/createArticle';
import styles from './styles.module.scss';

interface CreateArticle {
  title: string;
  description: string;
  body: string;
  tagList: string;
}

export function FormCreateArticle() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<CreateArticle>({
    defaultValues: {
      title: '',
      description: '',
      body: '',
      tagList: '',
    },
  });

  const submit = async (data: CreateArticle) => {
    try {
      const response = await createArticle({
        ...data,
        tagList: data.tagList.split(',').map((tag) => tag.trim()),
      });
      if (!response.ok) {
        throw new Error('Ошибка запроса');
      }
      await response.json();
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
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
}
