import { Link } from 'react-router-dom'
import {FormSignIn} from '../../../widgets/FormAuth'
import styles from './styles.module.scss'

export function SignInPage() {
  return (
    <div className={styles.signIn}>
      <div className={styles.container}>
        <h1 className={styles.title}>Sign in</h1>
        <Link className={styles.toggle} to='/signUp'>Need an account?</Link>
        <FormSignIn />
      </div>
    </div>
  )
}