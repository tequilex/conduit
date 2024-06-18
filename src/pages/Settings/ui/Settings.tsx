import { Container } from "../../../shared/ui/Container";
import { FormSettings } from "../../../widgets/FormSettings";
import styles from "./styles.module.scss";

export function Settings() {
  return (
    <div className={styles.settings}>
      <Container>
        <h1 className={styles.title}>Your settings</h1>
        <FormSettings />
      </Container>
    </div>
  );
}
