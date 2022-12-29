import { useRouter } from "next/router";
import styles from "@styles/pages/register.module.scss";
import { blobToBase64, isManagement } from "@utils/util";
import ssrWrapper from "@utils/wrapper";
import axiosInstance from "@utils/axios";
import RecruitmentTemplate from "@components/common/Template/Recruitment";

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
    const submitData = {
      ...value,
      id: loginInfo.userName,
      poster: value.poster ? await blobToBase64(value.poster) : null,
    };

    try {
      await axiosInstance.post(`/clubs/${clubId}/announcements`, submitData);
      alert("성공적으로 모집공고를 등록했습니다.");
      router.push("/clublist?tab=all");
    } catch (error) {
      alert("서버 오류입니다. 잠시후 다시 시도해주세요");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerContainer}>
        <RecruitmentTemplate onSubmit={onSubmit} />
      </div>
    </div>
  );
}

export const getServerSideProps = ssrWrapper(async ({ context, userId }) => {
  const { clubid: clubId } = context.params;
  if (!userId) throw { url: "/login" };
  if (!(await isManagement(clubId, userId))) throw { url: "/manage" };
  return { clubId };
});
