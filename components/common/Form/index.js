import Image from "next/image";
import React, { useContext, memo, cloneElement, useRef, useEffect, useState } from "react";
import { useMemo } from "react";
import { createContext } from "react";
import styles from "./Form.module.scss";

const RadioInputContext = createContext({});

function Form({ children, onSubmit }) {
  const onSubmitForm = (e) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <form className={styles.container} onSubmit={onSubmitForm}>
      {children}
    </form>
  );
}

function InputWrapper({ children, title }) {
  return (
    <div className={styles.input_box}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function InputText({ name, value, onChange, title, multiline, placeholder }) {
  const onChangeTextarea = (e) => {
    onChange(e);
    autoResizeTextarea(e);
  };

  const autoResizeTextarea = (e) => {
    const DEFAULT_HEIGHT = 180;
    const PADDING = 20;
    e.target.style.height = `${DEFAULT_HEIGHT}px`;
    if (e.target.scrollHeight > DEFAULT_HEIGHT) {
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight + PADDING}px`;
    }
  };

  return (
    <InputWrapper title={title}>
      {multiline ? ( // 멀티라인인 경우 textarea로 렌더링
        <textarea className={styles.input_border} name={name} defaultValue={value} onChange={onChangeTextarea} placeholder={placeholder} />
      ) : (
        <input className={styles.input_border} type="text" name={name} value={value} onChange={onChange} placeholder={placeholder} />
      )}
    </InputWrapper>
  );
}

function InputRadioWrapper({ children, name, currentValue, onChange, title }) {
  const contextValue = useMemo(() => ({ name, currentValue, onChange }), [name, onChange, currentValue]);
  return (
    <InputWrapper title={title}>
      <RadioInputContext.Provider value={contextValue}>
        <ul className={styles.input_border}>{children}</ul>
      </RadioInputContext.Provider>
    </InputWrapper>
  );
}

function InputRadio({ children, value }) {
  const { name, currentValue, onChange } = useContext(RadioInputContext);
  return (
    <li>
      <input type="radio" value={value} id={value} name={name} onChange={onChange} checked={currentValue === value} />
      <label htmlFor={value}>{children}</label>
    </li>
  );
}

function InputSubmit({ children }) {
  return <button type="submit">{children}</button>;
}

function InputFile({ name, value, onChange, alt, title }) {
  const [imgSrc, setImgSrc] = useState(value);

  useEffect(() => {
    if (value instanceof File) {
      setImgSrc(URL.createObjectURL(value));
    }
  }, [value]);

  return (
    <InputWrapper title={title}>
      <label htmlFor={name} className={styles.input_border}>
        <Image src={imgSrc || "/image-select.svg"} alt={alt} objectFit="contain" width={115} height={163} />
      </label>
      <input type="file" id={name} name={name} onChange={onChange} accept="image/*" />
    </InputWrapper>
  );
}

Form.Text = memo(InputText);
Form.Radio = InputRadioWrapper;
Form.Radio.Button = memo(InputRadio);
Form.Image = memo(InputFile);
Form.Submit = InputSubmit;

export default Form;
