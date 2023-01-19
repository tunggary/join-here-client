import { useRouter } from "next/router";
import ClubTemplate from "@components/common/Template/Club";
import axiosInstance from "@utils/axios";
import ssrWrapper from "@utils/wrapper";
import { getFormData } from "@utils/util";
import PageWrapper from "@components/common/PageWrapper";
import TemplateWrapper from "@components/common/Template/TemplateWrapper";

export default function Registration({ loginInfo }) {
  const router = useRouter();

  const validationCheck = (value) => {
    for (const key in value) {
      if (key === "image" && value[key] === null) continue;
      if (value[key] === "" || value[key] === null) {
        alert("기본 정보를 입력해주세요");
        return false;
      }
    }
    return true;
  };

  const onSubmit = async (value) => {
    if (!validationCheck(value)) return;

    const formData = getFormData({
      ...value,
      id: loginInfo.userName,
    });

    try {
      await axiosInstance.post("/clubs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("성공적으로 동아리를 등록했습니다.");
      router.push("/manage");
    } catch (error) {
      alert("잠시후 다시 시도해주세요");
    }
  };

  return (
    <PageWrapper pageTitle="동아리 등록">
      <TemplateWrapper>
        <ClubTemplate onSubmit={onSubmit} submitText="등록하기" />
      </TemplateWrapper>
    </PageWrapper>
  );
}

export const getServerSideProps = ssrWrapper(async ({ userId }) => {
  if (!userId) throw { url: "/login" };
});
