import styles from "@styles/components/common/inputTemplate.module.scss";
export default function Input({ id, label, value = "", readOnly = false, onChange }) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {(value.length > 30) & readOnly ? <div className={`${styles.input} ${styles.readBox}`}>{value}</div> : <input type="text" className={styles.input} name={id} value={value} readOnly={readOnly} onChange={onChange} />}
    </div>
  );
}
