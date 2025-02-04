/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./page.module.scss";

type IInput = {
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (e: any) => void;
  id: string;
  type: string;
  placeholder: string;
  required: boolean;
  minLength?: number;
  padding?: string;
  fontSize?: string;
  textTransform?: string | any;
};

export default function Input({
  value,
  onChange,
  id,
  type,
  placeholder,
  required,
  minLength,
  padding,
  fontSize,
}: IInput) {
  return (
    <input
      value={value}
      style={{
        padding: `${padding}`,
        fontSize: `${fontSize}`,
      }}
      id={id}
      type={type}
      minLength={minLength}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`${styles.input}`}
    />
  );
}
