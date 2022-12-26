import { useRouter } from "next/router";
import styles from "@styles/pages/register.module.scss";
import Header from "@components/common/Header";
import ClubTemplate from "@components/common/Template/Club";
import axiosInstance from "@utils/axios";
import ssrWrapper from "@utils/wrapper";

export default function Registration({ loginInfo }) {
  const router = useRouter();

  const onSubmit = async (value) => {
    const { name, introduction, category, area, image } = value;

    await axiosInstance
      .post("/clubs", {
        id: loginInfo.userName,
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
    <>
      <Header loginInfo={loginInfo} />
      <ClubTemplate title="동아리 등록" onSubmit={onSubmit} submitText="등록하기" />
    </>
  );
}

export const getServerSideProps = ssrWrapper(async ({ userId }) => {
  if (!userId) throw { url: "/login" };
});
