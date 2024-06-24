import styles from './styles.module.scss';

export function Tag({ tag }: { tag: string }) {
  return <li className={styles.tag}>{tag}</li>;
}
