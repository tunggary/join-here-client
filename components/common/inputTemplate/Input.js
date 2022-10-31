import styles from "@styles/components/common/inputTemplate.module.scss";
export default function Input({ id, label, value = "", name, readOnly = false, placeholder = "", onChange }) {
  const autoResizeTextarea = ({ target }) => {
    target.style.height = "auto";
    target.style.height = target.defaultValue.length > 20 ? `${target.scrollHeight + 8}px` : `56px`;
  };

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {readOnly ? (
        <div className={`${styles.input} ${styles.readBox}`}>{value}</div>
      ) : (
        <textarea className={styles.textarea} id={id} name={name} defaultValue={value} placeholder={placeholder} onChange={onChange} onKeyDown={autoResizeTextarea} onKeyUp={autoResizeTextarea}></textarea>
      )}
    </div>
  );
}
