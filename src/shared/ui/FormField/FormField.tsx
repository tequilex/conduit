import styles from "./styles.module.scss";

type Props = React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;

export function FormField({ ...otherProps }: Props) {

  return (
    <>
      {otherProps.name === "bio" || otherProps.name === 'body' ? (
        <textarea
          {...otherProps}
          className={styles.textarea}
        />
      ) : (
        <input {...otherProps} className={styles.input} />
      )}
    </>
  );
}
