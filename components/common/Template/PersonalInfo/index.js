import Form from "@components/common/Form";
import { useForm } from "@hooks/useForm";

export default function PersonalInfoTemplate({ onSubmit, defaultValue }) {
  const { value, onChange } = useForm({
    ...defaultValue,
    birthday: defaultValue.birthday.replaceAll("-", ""),
  });

  return (
    <Form onSubmit={() => onSubmit(value)}>
      <h2>내 정보</h2>
      <Form.Text name="name" title="이름" onChange={onChange} value={value.name} />
      <Form.Text name="birthday" type="number" title="생년월일" onChange={onChange} value={value.birthday} />
      <Form.Text name="phone" type="number" title="연락처" onChange={onChange} value={value.phone} />
      <Form.Submit>수정하기</Form.Submit>
    </Form>
  );
}
