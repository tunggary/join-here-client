import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import cookies from "next-cookies";
import Header from "@components/common/Header";
import styles from "@styles/pages/register.module.scss";
import { dictClub, dictArea, isManagement, blobToBase64 } from "@utils/util";
import Form from "@components/common/inputTemplate/Form";
import Input from "@components/common/inputTemplate/Input";
import Title from "@components/common/inputTemplate/Title";

const message = [
  {
    //
    q: "회비는 보통 얼마정도",
    reply: [
      {
        id: "tunggary",
        position: "nor",
        sendedAt: "1112",
        content: "학기당 십만원",
      },
      "ㄴㅇㄹㄴㅇㄹㄴㄹ",
    ],
  },
  {},
];

export default function Register({ loginInfo, defaultInfo = false }) {
  const { push } = useRouter();

  const [submitData, setSubmitData] = useState({
    clubName: defaultInfo ? defaultInfo.name : "",
    clubDesc: defaultInfo ? defaultInfo.introduction : "",
    clubCategory: defaultInfo ? defaultInfo.category : "",
    clubLocation: defaultInfo ? defaultInfo.area : "",
    clubImage: defaultInfo ? defaultInfo.image : null,
    clubImageBase64: null,
  });

  const { clubName, clubDesc, clubCategory, clubLocation, clubImage, clubImageBase64 } = submitData;

  const onChange = async (e) => {
    const { name, value } = e.target;
    if (name === "clubImage") {
      if (!e.target.files || e.target.files.length === 0) {
        return;
      }

      const base64Array = await blobToBase64(e.target.files[0]);
      setSubmitData({
        ...submitData,
        [name]: URL.createObjectURL(e.target.files[0]),
        clubImageBase64: base64Array,
      });
    } else {
      setSubmitData({
        ...submitData,
        [name]: value,
      });
    }
  };

  const onSubmit = async () => {
    if (defaultInfo) {
      await axios
        .patch("http://3.36.36.87:8080/clubs", {
          clubId: defaultInfo.id,
          name: clubName,
          introduction: clubDesc,
          category: clubCategory,
          area: clubLocation,
          image: clubImageBase64,
        })
        .catch((err) => {
          console.log(err.message);
          alert("서버 오류가 발생했습니다. 잠시후 다시 시도해주세요");
          return;
        });
    } else {
      await axios
        .post("http://3.36.36.87:8080/clubs", {
          id: loginInfo.userName,
          name: clubName,
          introduction: clubDesc,
          category: clubCategory,
          area: clubLocation,
          image: "",
        })
        .catch((err) => {
          console.log(err.message);
          alert("서버 오류가 발생했습니다. 잠시후 다시 시도해주세요");
          return;
        });
    }
    push("/manage");
  };

  return (
    <div className={styles.container}>
      <Header loginInfo={loginInfo} />
      <div className={styles.registerContainer}>
        <Form button={defaultInfo ? "수정하기" : "등록하기"} onClick={onSubmit}>
          <Title>{defaultInfo ? "동아리 정보 수정" : "동아리 등록"}</Title>
          <Input id="clubName" name="clubName" label="동아리 이름" value={clubName} onChange={onChange} placeholder="동아리 이름을 입력하세요" />
          <Input id="clubDesc" name="clubDesc" label="동아리 소개" value={clubDesc} onChange={onChange} placeholder="동아리 소개를 입력하세요" />
          <div className={styles.box}>
            <div className={styles.label}>분야</div>
            <div className={styles.categoryContainer}>
              {Object.keys(dictClub).map((ele, idx) =>
                idx === 0 ? null : (
                  <div key={ele}>
                    <input type="radio" name="clubCategory" id={ele} value={ele} onChange={onChange} checked={clubCategory === ele} />
                    <label htmlFor={ele}>{dictClub[ele][0]}</label>
                  </div>
                )
              )}
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.label}>활동지역</div>
            <div className={styles.areaContainer}>
              {Object.keys(dictArea).map((ele) => (
                <div key={ele}>
                  <input type="radio" name="clubLocation" id={ele} value={ele} onChange={onChange} checked={clubLocation === ele} />
                  <label htmlFor={ele}>{dictArea[ele]}</label>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.label}>동아리 대표사진</div>
            <input type="file" id="img" name="clubImage" onChange={onChange} accept="image/*" />
            <label htmlFor="img">{clubImage ? <Image src={clubImage} alt="배너 이미지" objectFit="contain" width={115} height={163} /> : "사진선택"}</label>
          </div>
        </Form>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { id: userId } = cookies(ctx);
  const { update, clubId } = ctx.query;

  if (update) {
    const isManager = await isManagement(clubId, userId);
    if (!isManager) {
      return {
        redirect: {
          destination: "/manage",
          permanent: false,
        },
      };
    } else {
      const { data } = await axios.get(`http://3.36.36.87:8080/clubs/${clubId}`);
      return {
        props: {
          defaultInfo: data.club,
        },
      };
    }
  } else {
    return {
      props: {},
    };
  }
}
