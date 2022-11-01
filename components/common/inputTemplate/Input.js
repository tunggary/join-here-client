import styles from "@styles/components/common/inputTemplate.module.scss";
import { useEffect } from "react";
import { useRef } from "react";
export default function Input({ id, label, value = "", name, readOnly = false, placeholder = "", onChange }) {
  const ref = useRef(null);

  const autoResizeTextarea = () => {
    const target = ref.current;
    target.style.height = "auto";
    target.style.height = target.defaultValue.length > 20 ? `${target.scrollHeight + 8}px` : `56px`;
  };

  useEffect(() => {
    !readOnly && autoResizeTextarea();
  }, []);

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {readOnly ? (
        <div ref={ref} className={`${styles.input} ${styles.readBox}`}>
          {value}
        </div>
      ) : (
        <textarea ref={ref} className={styles.textarea} id={id} name={name} defaultValue={value} placeholder={placeholder} onChange={onChange} onKeyDown={autoResizeTextarea} onKeyUp={autoResizeTextarea}></textarea>
      )}
    </div>
  );
}
