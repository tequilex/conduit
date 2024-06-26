import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormField } from '../../../shared/ui/FormField';
import { FormButton } from '../../../shared/ui/FormButton';
import { authFetch } from '../../../shared/api/apiAuth';
import { useStores } from '../../../app/RootStore.context';
import { observer } from 'mobx-react-lite';
import styles from './styles.module.scss';

interface SignInForm {
  email: string;
  password: string;
}

const FormSignIn = observer(() => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    userStore: { setUser },
  } = useStores();
  const navigate = useNavigate();

  const submit = async (data: SignInForm) => {
    try {
      const response = await authFetch('/users/login', {
        body: JSON.stringify({ user: data }),
        method: 'POST',
      });
      if (response.status > 209) {
        setError('root', {
          type: 'server',
          message: 'Неверный логин или пароль',
        });
        return;
      }
      const responseData = await response.json();
      setUser(responseData.user);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(submit)} className={styles.formContainer}>
        <FormField
          {...register('email', {
            required: 'Email is required',
          })}
          type='email'
          placeholder='Email'
        />
        {errors.email && <p className={styles.alert}>{errors.email.message}</p>}
        <FormField
          {...register('password', {
            required: 'Password is required',
          })}
          type='password'
          placeholder='Password'
        />
        {errors.password && (
          <p className={styles.alert}>{errors.password.message}</p>
        )}
        {errors.root && <p className={styles.alert}>{errors.root.message}</p>}
        <FormButton size='big' nameBut='Sign in' />
      </form>
    </div>
  );
});

export default FormSignIn;
