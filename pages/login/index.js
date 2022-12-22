import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@styles/pages/login.module.scss";
import Header from "@components/common/Header";
import ssrWrapper from "@utils/wrapper";
import axiosInstance from "@utils/axios";

export default function Login({ loginInfo }) {
  const { back } = useRouter();

  const [data, setData] = useState({
    loginId: "",
    password: "",
  });

  const { loginId, password } = data;

  const onChange = (e) => {
    const { value, id } = e.target;

    setData({
      ...data,
      [id]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (loginId === "") {
      alert("ID을 입력해주세요.");
      return;
    }
    if (password === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    login();
  };

  const login = async () => {
    const data = await axiosInstance
      .post(
        "/api/login",
        {
          loginId,
          password,
        },
        {
          baseURL: "http://localhost:3000",
        }
      )
      .catch(() => {
        alert("로그인 과정에서 오류가 발생했습니다. 다시 시도해주세요.");
        return;
      });
    if (data?.data?.error === "not_matching") {
      alert("loginId 혹은 비밀번호를 확인해주세요.");
      setData({
        loginId: "",
        password: "",
      });
      return;
    }
    back();
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onSubmit(e);
    }
  };

  return (
    <div className={styles.container}>
      <Header loginInfo={loginInfo} />
      <div className={styles.title}>로그인</div>
      <form className={styles.loginContainer} onSubmit={onSubmit} onKeyDown={onKeyPress}>
        <div className={styles.input}>
          <label htmlFor="loginId">이메일</label>
          <input type="text" autoComplete="off" id="loginId" placeholder="이메일을 입력해주세요" value={loginId} onChange={onChange} />
        </div>
        <div className={styles.input}>
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" placeholder="비밀번호를 입력해주세요" value={password} onChange={onChange} />
        </div>
        <button className={styles.loginButton}>로그인</button>
        <div className={styles.signup}>
          <Link href="/login/signup">아직 계정이 없으신가요?</Link>
        </div>
      </form>
    </div>
  );
}

export const getServerSideProps = ssrWrapper(async ({ userId }) => {
  if (userId) {
    throw { url: "/" };
  }
});
