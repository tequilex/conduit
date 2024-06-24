import { Link, useNavigate } from 'react-router-dom';
import { FormSignIn } from '../../../widgets/FormAuth/ui';
import { useStores } from '../../../app/RootStore.context';
import styles from './styles.module.scss';
import { useEffect } from 'react';

export function SignInPage() {
  const {
    userStore: { user },
  } = useStores();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  return (
    <div className={styles.signIn}>
      <div className={styles.container}>
        <h1 className={styles.title}>Sign in</h1>
        <Link
          className={styles.toggle}
          to='/signUp'>
          Need an account?
        </Link>
        <FormSignIn />
      </div>
    </div>
  );
}
