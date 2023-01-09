import styles from "./Member.module.scss";
import Form from "@components/common/Form";
import { useForm } from "@hooks/useForm";

export default function MemberTemplate({ onSubmit }) {
  const { value, setValue, onChange } = useForm({ id: "" });

  const onSubmitId = () => {
    console.log(value.id);
    onSubmit(value.id);
    setValue({ id: "" });
  };

  return (
    <Form onSubmit={onSubmitId}>
      <div className={styles.input_container}>
        <Form.Text name="id" value={value.id} onChange={onChange} />
        <div className={styles.plus_button}>
          <Form.Submit>ID로 추가하기</Form.Submit>
        </div>
      </div>
    </Form>
  );
}
