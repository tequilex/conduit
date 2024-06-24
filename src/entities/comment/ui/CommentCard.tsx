import styles from './styles.module.scss';

interface CardProps {
  body: JSX.Element;
  footer: JSX.Element;
}

export function CommentCard({ body, footer }: CardProps) {
  return (
    <div className={styles.cardComment}>
      {body}
      {footer}
    </div>
  );
}
