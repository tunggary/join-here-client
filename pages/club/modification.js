import { useRouter } from "next/router";
import { isManagement, getFormData } from "@utils/util";
import ssrWrapper from "@utils/wrapper";
import axiosInstance from "@utils/axios";
import ClubTemplate from "@components/common/Template/Club";
import PageWrapper from "@components/common/PageWrapper";
import TemplateWrapper from "@components/common/Template/TemplateWrapper";

export default function Modification({ loginInfo, defaultInfo }) {
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
      await axiosInstance.patch("/clubs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("성공적으로 동아리를 정보를 수정했습니다.");
      router.push("/manage");
    } catch (error) {
      alert("잠시후 다시 시도해주세요");
    }
  };

  return (
    <PageWrapper pageTitle="동아리 정보 수정">
      <TemplateWrapper>
        <ClubTemplate onSubmit={onSubmit} defaultInfo={defaultInfo} submitText="수정하기" />
      </TemplateWrapper>
    </PageWrapper>
  );
}

export const getServerSideProps = ssrWrapper(async ({ userId, context }) => {
  const { clubId } = context.query;

  if (!userId) throw { url: "/login" };

  if (!clubId || !(await isManagement(clubId, userId))) throw { url: "/manage" };

  const data = await axiosInstance.get(`/clubs/${clubId}`);

  return { defaultInfo: data.club };
});
