import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormField } from '../../../shared/ui/FormField';
import { FormButton } from '../../../shared/ui/FormButton';
import { authFetch } from '../../../shared/api/apiAuth';
import styles from './styles.module.scss';
import { useStores } from '../../../app/RootStore.context';
import { Errors } from '../../../shared/utils/types';

interface SignUpForm {
  username: string;
  email: string;
  password: string;
}

export function FormSignUp() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  const {
    userStore: { setUser },
  } = useStores();

  const navigate = useNavigate();

  const submit = async (data: SignUpForm) => {
    try {
      const response = await authFetch('/users', {
        body: JSON.stringify({ user: data }),
        method: 'POST',
      });
      if (response.status > 209) {
        const errorData: Errors = await response.json();
        Object.entries(errorData.errors).forEach(([field, messages]) => {
          setError(
            field as keyof SignUpForm,
            {
              type: 'server',
              message: messages.join(', '),
            },
            { shouldFocus: true },
          );
        });
        return;
      }
      const responseData = await response.json();
      setUser(responseData.user);
      navigate('/');
    } catch (error) {
      console.error('Unexpected error', error);
    }
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(submit)} className={styles.formContainer}>
        <FormField
          {...register('username', {
            required: 'Username is required',
            minLength: {
              value: 6,
              message: 'Username must be more than 6 characters',
            },
          })}
          type='text'
          name='username'
          placeholder='Username'
        />
        {errors.username && (
          <p className={styles.alert}>{errors.username.message}</p>
        )}
        <FormField
          {...register('email', {
            required: 'Email is required',
          })}
          type='email'
          name='email'
          placeholder='Email'
        />
        {errors.email && <p className={styles.alert}>{errors.email.message}</p>}
        <FormField
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be more than 6 characters',
            },
          })}
          type='password'
          name='password'
          placeholder='Password'
        />
        {errors.password && (
          <p className={styles.alert}>{errors.password.message}</p>
        )}
        <FormButton size='big' nameBut='Sign up' />
      </form>
    </div>
  );
}
