import { getDate } from "@utils/util";
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

function InputText({ name, value, onChange, title, multiline, placeholder, readonly, ...props }) {
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
      {readonly ? (
        <div className={`${styles.input_border} ${styles.readonly}`}>{value}</div>
      ) : multiline ? ( // 멀티라인인 경우 textarea로 렌더링
        <textarea className={styles.input_border} name={name} defaultValue={value} onChange={onChangeTextarea} placeholder={placeholder} {...props} />
      ) : (
        <input className={styles.input_border} type={name === "password" ? "password" : "text"} name={name} value={value} onChange={onChange} placeholder={placeholder} {...props} />
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

function InputPeriod({ title, onChange }) {
  const { formal: today } = getDate();

  const [maxStartDate, setMaxStartDate] = useState(null);
  const [minEndDate, setMinEndDate] = useState(today);

  const onChangeStartDate = (e) => {
    const newStartDate = e.target.value || today;
    setMinEndDate(newStartDate);
    onChange(e);
  };

  const onChangeEndDate = (e) => {
    const newEndDate = e.target.value || null;
    setMaxStartDate(newEndDate);
    onChange(e);
  };
  return (
    <InputWrapper title={title}>
      <div className={styles.input_date_wrapper}>
        <input
          type="date" //
          className={styles.input_border}
          name="startDate"
          data-placeholder="기간(시작)"
          min={today}
          max={maxStartDate}
          onChange={onChangeStartDate}
          required
        />
        <span>~</span>
        <input
          type="date" //
          className={styles.input_border}
          name="endDate"
          data-placeholder="기간(종료)"
          min={minEndDate}
          onChange={onChangeEndDate}
          required
        />
      </div>
    </InputWrapper>
  );
}

Form.Radio = InputRadioWrapper;
Form.Radio.Button = memo(InputRadio);
Form.Text = memo(InputText);
Form.Image = memo(InputFile);
Form.Period = memo(InputPeriod);
Form.Submit = InputSubmit;

export default Form;
