import { useRouter } from "next/router";
import styles from "@styles/pages/register.module.scss";
import { isManagement, blobToBase64 } from "@utils/util";
import ssrWrapper from "@utils/wrapper";
import axiosInstance from "@utils/axios";
import ClubTemplate from "@components/common/Template/Club";
import Layout from "@components/common/Layout";

export default function Modification({ loginInfo, defaultInfo }) {
  const router = useRouter();

  const onSubmit = async (value) => {
    const { name, introduction, category, area, image } = value;

    await axiosInstance
      .patch("/clubs", {
        clubId: defaultInfo.id,
        name,
        introduction,
        category,
        area,
        image: image instanceof File ? await blobToBase64(image) : image,
      })
      .catch((err) => {
        console.log(err.message);
        alert("서버 오류가 발생했습니다. 잠시후 다시 시도해주세요");
        return;
      });

    router.push("/manage");
  };

  return (
    <Layout pageTitle="동아리 정보 수정">
      <div className={styles.container}>
        <div className={styles.registerContainer}>
          <ClubTemplate onSubmit={onSubmit} defaultInfo={defaultInfo} submitText="수정하기" />;
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = ssrWrapper(async ({ userId, context }) => {
  const { clubId } = context.query;

  if (!userId) throw { url: "/login" };

  if (!clubId || !(await isManagement(clubId, userId))) throw { url: "/manage" };

  const data = await axiosInstance.get(`/clubs/${clubId}`);

  return { defaultInfo: data.club };
});
