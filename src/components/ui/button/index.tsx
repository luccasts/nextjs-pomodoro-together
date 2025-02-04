/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./page.module.scss";

type IButton = {
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (e: any) => void;
  children: string | JSX.Element | JSX.Element[];
  padding?: string;
  fontSize?: string;
  className: string;
  textTransform?: string | any;
};

export default function Button({
  disabled,
  onClick,
  children,
  padding,
  fontSize,
  className,
  textTransform,
}: IButton) {
  return (
    <button
      style={{
        padding: `${padding}`,
        fontSize: `${fontSize}`,
        textTransform: textTransform ? textTransform : "capitalize",
      }}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  );
}
