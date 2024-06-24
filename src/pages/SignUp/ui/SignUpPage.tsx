import { Link, useNavigate } from 'react-router-dom';
import { FormSignUp } from '../../../widgets/FormAuth/ui';
import styles from './styles.module.scss';
import { useEffect } from 'react';
import { useStores } from '../../../app/RootStore.context';

export function SignUpPage() {
  const {
    userStore: { user },
  } = useStores();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  return (
    <div className={styles.signUp}>
      <div className={styles.container}>
        <h1 className={styles.title}>Sign up</h1>
        <Link
          className={styles.toggle}
          to='/signIn'>
          Have an account?
        </Link>
        <FormSignUp />
      </div>
    </div>
  );
}
