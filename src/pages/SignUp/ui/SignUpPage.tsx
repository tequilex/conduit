import { Link } from "react-router-dom"
import { FormSignUp } from "../../../widgets/FormAuth"
import styles from './styles.module.scss'

export function SignUpPage() {
  return (
    <div className={styles.signUp}>
    <div className={styles.container}>
      <h1 className={styles.title}>Sign up</h1>
      <Link className={styles.toggle} to='/signIn'>Have an account?</Link>
      <FormSignUp />
    </div>
  </div>
  )
}