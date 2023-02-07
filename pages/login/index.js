import { useRouter } from "next/router";
import ssrWrapper from "@utils/wrapper";
import axiosInstance from "@utils/axios";
import PageWrapper from "@components/common/PageWrapper";
import LoginTemplate from "@components/common/Template/Login";

export default function Login() {
  const router = useRouter();

  const validateCheck = (value) => {
    const id = value.id.trim();
    const password = value.password.trim();
    return id !== "" && password !== "";
  };

  const onSubmit = async (value) => {
    if (!validateCheck(value)) {
      return alert("아이디와 비밀번호를 입력해주세요.");
    }
    try {
      await axiosInstance.post(
        "/api/login",
        {
          loginId: value.id,
          password: value.password,
        },
        {
          baseURL: process.env.NEXT_PUBLIC_LOCAL_API_URL,
        }
      );
      router.back();
    } catch {
      alert("아이디 혹은 비밀번호를 확인해주세요.");
    }
  };

  return (
    <PageWrapper>
      <LoginTemplate onSubmit={onSubmit} />
    </PageWrapper>
  );
}

export const getServerSideProps = ssrWrapper(async ({ userId }) => {
  if (userId) {
    throw { url: "/" };
  }
});
