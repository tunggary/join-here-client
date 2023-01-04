import styles from "./Signup.module.scss";
import Form from "@components/common/Form";
import { useForm } from "@hooks/useForm";

function ConfirmMessage({ value, check }) {
  return (
    <div className={styles.message_container}>
      {value === "" || check === "" ? null : value === check ? <span style={{ color: "green" }}>비밀번호가 일치합니다.</span> : <span style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</span>}
    </div>
  );
}

export default function SignupTemplate({ onSubmit }) {
  const { value, onChange } = useForm({
    id: "",
    name: "",
    password: "",
    confirm: "",
    birth: "",
    phone: "",
  });

  return (
    <Form onSubmit={() => onSubmit(value)}>
      <h2>회원 정보</h2>
      <Form.Text title="이름" name="name" value={value.name} onChange={onChange} placeholder="이름을 입력하세요." />
      <Form.Text title="아이디" name="id" value={value.id} onChange={onChange} placeholder="아이디를 입력하세요." />
      <Form.Text title="비밀번호" type="password" name="password" value={value.password} onChange={onChange} placeholder="비밀번호를 입력하세요." />
      <Form.Text title="비밀번호 확인" type="password" name="confirm" value={value.confirm} onChange={onChange} placeholder="비밀번호를 한번더 입력하세요." />
      <ConfirmMessage value={value.password} check={value.confirm} />
      <Form.Text title="생년월일" type="number" name="birth" value={value.birth} onChange={onChange} placeholder="생년월일을 입력하세요. ex) 19970101" />
      <Form.Text title="연락처" type="number" name="phone" value={value.phone} onChange={onChange} placeholder="연락처를 입력하세요. ex) 01012345678" />
      <Form.Submit>회원가입</Form.Submit>
    </Form>
  );
}
