import styles from "@styles/components/common/inputTemplate.module.scss";
export default function Form({ children, button = "확인", onClick }) {
  return (
    <div className={styles.container}>
      {children}
      <button className={styles.submitButton} onClick={onClick}>
        {button}
      </button>
    </div>
  );
}
