import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import cookies from "next-cookies";
import styles from "@styles/pages/signup.module.scss";
import Header from "@components/common/Header";

export default function Signup({ loginInfo }) {
  const { push } = useRouter();

  const [data, setData] = useState({
    loginId: "",
    name: "",
    password: "",
    confirm: "",
    birth: "",
    phone: "",
  });

  const [check, setCheck] = useState({
    password: false,
  });

  const { loginId, name, password, confirm, birth, phone } = data;

  const onChange = (e) => {
    const { value, id } = e.target;

    if (id === "birth" && value.length > 8) return;
    if (id === "phone" && value.length > 11) return;

    if (id === "confirm" || id === "password") {
      if (value === "") {
        setCheck({
          ...check,
          password: false,
        });
      } else {
        setCheck({
          ...check,
          password: (id === "confirm" && password === value) || (id === "password" && confirm === value),
        });
      }
    }

    setData({
      ...data,
      [id]: value,
    });
  };

  const onSubmit = () => {
    if (loginId.length < 6 || loginId.length > 18) {
      alert("id는 6~18 자리로 입력해주세요");
      return;
    }
    if (name === "") {
      alert("이름을 입력해주세요.");
      return;
    }
    if (password === "") {
      alert("비밀번호를 입력해주세요");
      return;
    }
    if (!check.password) {
      alert("비밀번호를 확인해주세요.");
      return;
    }
    if (birth.length !== 8) {
      alert("생년월일 8자리를 입력해주세요.");
      return;
    }
    if (phone.length < 10 || phone.length > 11) {
      alert("핸드폰 번호를 입력해주세요");
      return;
    }
    signup();
  };

  const signup = async () => {
    const res = await axios.post(
      "http://3.36.36.87:8080/members",
      {
        id: loginId,
        name,
        password,
        birthday: `${birth.slice(0, 4)}-${birth.slice(4, 6)}-${birth.slice(6, 8)}`,
        phone,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    alert("회원가입이 성공적으로 되었습니다.");
    push("/login");
  };

  useEffect(() => {
    document.addEventListener("wheel", function (event) {
      console.log(document.activeElement.type);
      if (document.activeElement.type === "number") {
        document.activeElement.blur();
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <Header loginInfo={loginInfo} />
      <div className={styles.title}>회원가입</div>
      <section className={styles.signupContainer}>
        <div className={styles.input}>
          <label htmlFor="loginId">ID</label>
          <input type="text" autoComplete="off" id="loginId" placeholder="이메일을 입력해주세요" value={loginId} onChange={onChange} />
        </div>
        <div className={styles.input}>
          <label htmlFor="name">이름</label>
          <input type="text" autoComplete="off" id="name" placeholder="이름(실명)을 입력해주세요" value={name} onChange={onChange} />
        </div>
        <div className={styles.input}>
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" placeholder="비밀번호를 입력해주세요" value={password} onChange={onChange} />
        </div>
        <div className={styles.input}>
          <label htmlFor="confirm">비밀번호 확인</label>
          <input type="password" id="confirm" placeholder="비밀번호를 다시 입력해주세요" value={confirm} onChange={onChange} />
        </div>
        <div className={styles.check}>{check.password && <div className={styles.green}>일치합니다.</div>}</div>
        <div className={styles.input}>
          <label htmlFor="birth">생년월일</label>
          <input type="number" id="birth" placeholder="8자리로 입력해주세요" value={birth} onChange={onChange} />
        </div>
        <div className={styles.input}>
          <label htmlFor="phone">핸드폰번호</label>
          <input type="number" id="phone" placeholder="핸드폰번호를 입력해주세요" value={phone} onChange={onChange} />
        </div>
        <button className={styles.signupButton} onClick={onSubmit}>
          회원가입
        </button>
      </section>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { id } = cookies(ctx);

  //cookie 확인 후 token이 있으면 홈화면으로 redirect
  if (id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
}
