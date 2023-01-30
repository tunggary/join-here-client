import { useRouter } from "next/router";
import { getFormData, isManagement } from "@utils/util";
import ssrWrapper from "@utils/wrapper";
import axiosInstance from "@utils/axios";
import RecruitmentTemplate from "@components/common/Template/Recruitment";
import PageWrapper from "@components/common/PageWrapper";
import TemplateWrapper from "@components/common/Template/TemplateWrapper";

export default function Recruitment({ loginInfo, clubId }) {
  const router = useRouter();

  const validationCheck = (value) => {
    for (const key in value) {
      if (key === "poster" && value[key] === null) continue;
      if (value[key] === "" || value[key] === null) {
        alert("기본 정보를 입력해주세요");
        return false;
      }
      if (key === "question" && value[key].length === 0) {
        alert("지원서 양식을 입력해주세요");
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
      image: value.poster,
    });

    try {
      await axiosInstance.post(`/clubs/${clubId}/announcements`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("성공적으로 모집공고를 등록했습니다.");
      router.push("/clublist?tab=all");
    } catch (error) {
      alert("잠시후 다시 시도해주세요");
    }
  };

  return (
    <PageWrapper pageTitle="모집공고 등록">
      <TemplateWrapper>
        <RecruitmentTemplate onSubmit={onSubmit} />
      </TemplateWrapper>
    </PageWrapper>
  );
}

export const getServerSideProps = ssrWrapper(async ({ context, userId }) => {
  const { clubid: clubId } = context.params;
  if (!userId) throw { url: "/login" };
  if (!(await isManagement(clubId, userId))) throw { url: "/manage" };
  return { clubId };
});
