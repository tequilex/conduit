import { forwardRef } from 'react';
import styles from './styles.module.scss';

type Props = React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;

const FormField = forwardRef(({ ...otherProps }: Props, ref) => {
  return (
    <>
      {otherProps.name === 'bio' || otherProps.name === 'body' ? (
        <textarea
          {...otherProps}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className={styles.textarea}
        />
      ) : (
        <input
          {...otherProps}
          ref={ref as React.Ref<HTMLInputElement>}
          className={styles.input}
        />
      )}
    </>
  );
});

export default FormField;
