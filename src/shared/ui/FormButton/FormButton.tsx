import styles from "./styles.module.scss";

interface ButtonProps {
  nameBut: string;
  size: string;
}

export function FormButton({ nameBut, size }: ButtonProps) {
  return (
    <button
      type="submit"
      className={size === "small" ? styles.buttonSmall : styles.button}
    >
      {nameBut}
    </button>
  );
}
