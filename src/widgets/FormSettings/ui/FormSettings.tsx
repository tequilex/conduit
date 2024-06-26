import { useForm } from 'react-hook-form';
import { FormButton } from '../../../shared/ui/FormButton';
import { FormField } from '../../../shared/ui/FormField';
import styles from './styles.module.scss';
import { useStores } from '../../../app/RootStore.context';
import { updateProfile } from '../../../features/profile/updateProfile/api/updateProfile';

interface Fields {
  username: string;
  email: string;
  password: string;
  image: string;
  bio: string;
}

export function FormSettings() {
  const {
    userStore: { user, setUser },
  } = useStores();

  const { register, handleSubmit } = useForm<Fields>({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      password: '',
      image: user?.image,
      bio: user?.bio,
    },
  });

  const submit = (data: Fields) => {
    updateProfile(data)
      .then((response) => response.json())
      .then((response) => setUser(response.user));
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(submit)} className={styles.formContainer}>
        <FormField
          {...register('image')}
          placeholder='Url of profile picture'
          type='text'
          name='image'
        />
        <FormField
          {...register('username')}
          placeholder='Username'
          type='text'
          name='username'
        />
        <FormField
          {...register('bio')}
          className={styles.textarea}
          placeholder='Short bio about you'
          name='bio'
        />
        <FormField
          {...register('email')}
          placeholder='Email'
          type='email'
          name='email'
        />
        <FormField
          {...register('password')}
          placeholder='New password'
          type='password'
          name='password'
        />
        <FormButton size='big' nameBut='Update setting' />
      </form>
    </div>
  );
}
