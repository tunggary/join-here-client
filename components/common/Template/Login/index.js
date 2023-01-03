import Form from "@components/common/Form";
import { useForm } from "@hooks/useForm";
import Link from "next/link";
import styles from "./Login.module.scss";

export default function LoginTemplate({ onSubmit }) {
  const { value, onChange } = useForm({
    id: "",
    password: "",
  });

  return (
    <div className={styles.container}>
      <Form onSubmit={() => onSubmit(value)}>
        <h1>로그인</h1>
        <Form.Text name="id" title="아이디" value={value.id} onChange={onChange} placeholder="아이디를 입력하세요" />
        <Form.Text name="password" title="비밀번호" value={value.password} onChange={onChange} placeholder="비밀번호를 입력하세요" />
        <Form.Submit>로그인</Form.Submit>
        <div className={styles.signup}>
          <Link href="/login/signup">아직 계정이 없으신가요?</Link>
        </div>
      </Form>
    </div>
  );
}
