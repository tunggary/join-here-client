import { useCallback, useState } from "react";

export function useForm(initialValue) {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback((e) => {
    let newValue = e.target.value;

    if (e.target.type === "file") {
      if (!e.target.files || e.target.files.length === 0) return;
      newValue = e.target.files[0];
    }

    setValue((prev) => ({
      ...prev,
      [e.target.name]: newValue,
    }));
  }, []);
  return { value, onChange };
}
