import styles from "./Button.module.css";

export default function Button({ children, onClick, type = "button", variant = "primary" }) {
  return (
    <button
      className={`${styles.btn} ${variant === "secondary" ? styles.secondary : ""}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
