import { useRouter } from "next/router";
import ssrWrapper from "@utils/wrapper";
import axiosInstance from "@utils/axios";
import PageWrapper from "@components/common/PageWrapper";
import TemplateWrapper from "@components/common/Template/TemplateWrapper";
import SignupTemplate from "@components/common/Template/Signup";

export default function Signup() {
  const { push } = useRouter();

  const validationCheck = (value) => {
    const { id, name, password, confirm, birth, phone } = value;
    if (name === "") {
      alert("이름을 입력해주세요.");
      return false;
    }
    if (id.length < 6 || id.length > 18) {
      alert("id는 6~18 자리로 입력해주세요");
      return false;
    }
    if (password === "") {
      alert("비밀번호를 입력해주세요");
      return false;
    }
    if (password !== confirm) {
      alert("비밀번호를 확인해주세요.");
      return false;
    }
    if (birth.length !== 8) {
      alert("생년월일 8자리를 입력해주세요.");
      return false;
    }
    if (phone.length < 10 || phone.length > 11) {
      alert("핸드폰 번호를 입력해주세요");
      return false;
    }
    return true;
  };

  const onSubmit = async (value) => {
    if (!validationCheck(value)) return;

    try {
      const { id, name, password, birth, phone } = value;
      await axiosInstance.post("/members", {
        id,
        name,
        password,
        birthday: `${birth.slice(0, 4)}-${birth.slice(4, 6)}-${birth.slice(6, 8)}`,
        phone,
      });
      alert("회원가입이 성공적으로 되었습니다.");
      push("/login");
    } catch {
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <PageWrapper pageTitle="회원가입">
      <TemplateWrapper>
        <SignupTemplate onSubmit={onSubmit} />
      </TemplateWrapper>
    </PageWrapper>
  );
}

export const getServerSideProps = ssrWrapper(async ({ userId }) => {
  if (userId) {
    throw { url: "/" };
  }
});
