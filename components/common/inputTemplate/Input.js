import styles from "@styles/components/common/inputTemplate.module.scss";
export default function Input({ id, label, value = "", name, readOnly = false, placeholder = "", onChange }) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {value.length > 30 && readOnly ? (
        <div className={`${styles.input} ${styles.readBox}`}>{value}</div>
      ) : (
        <input type="text" className={styles.input} id={id} name={name} value={value} placeholder={placeholder} readOnly={readOnly} onChange={onChange} />
      )}
    </div>
  );
}
