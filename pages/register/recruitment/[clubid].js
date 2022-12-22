import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Header from "@components/common/Header";
import styles from "@styles/pages/register.module.scss";
import Plus from "@public/clublist/plus.svg";
import Minus from "@public/clublist/minus.svg";
import { blobToBase64, isManagement } from "@utils/util";
import ssrWrapper from "@utils/wrapper";
import axiosInstance from "@utils/axios";

export default function Recruitment({ loginInfo, clubId }) {
  const { push } = useRouter();

  const [recruitmentData, setRecruitmentData] = useState({
    recruitmentName: "",
    recruitmentDesc: "",
    recruitmentStart: "",
    recruitmentEnd: "",
    recruitmentImage: null,
    recruitmentPreview: null,
  });
  const [resumeCount, setResumeCount] = useState(1);
  const [resumeData, setResumeData] = useState({
    resume1: {
      question: "이름",
    },
    resume2: {
      question: "연락처",
    },
    resume3: {
      question: "",
    },
  });

  const { recruitmentName, recruitmentDesc, recruitmentStart, recruitmentEnd, recruitmentImage, recruitmentPreview } = recruitmentData;

  const onChange = async (e) => {
    const { name, value } = e.target;
    if (name === "recruitmentImage") {
      if (!e.target.files || e.target.files.length === 0) {
        return;
      }
      const blob = e.target.files[0];
      const base64 = await blobToBase64(blob);
      setRecruitmentData({
        ...recruitmentData,
        [name]: URL.createObjectURL(blob),
        recruitmentPreview: base64,
      });
      return;
    }
    if (name === "recruitmentStart" || name === "recruitmentEnd") {
      if (value.match(/\D/g) || value.length > 8) return;
    }
    setRecruitmentData({
      ...recruitmentData,
      [name]: value,
    });
  };

  const onChangeResume = (e) => {
    const { name, value } = e.target;
    setResumeData({
      ...resumeData,
      [name]: {
        question: value,
      },
    });
  };

  const onClickPlus = () => {
    const key = `question${resumeCount + 1}`;
    setResumeCount((current) => current + 1);
    setResumeData({
      ...resumeData,
      [key]: {
        question: "",
      },
    });
  };

  const onClickMinus = (e) => {
    const name = e.target.getAttribute("name");
    setResumeData((current) => {
      const newData = { ...current };
      delete newData[name];
      return newData;
    });
  };

  const validationCheck = () => {
    for (const key in recruitmentData) {
      if (key === "recruitmentPreview" || key === "recruitmentImage") continue;
      if (recruitmentData[key] === null || recruitmentData[key] === "") {
        alert("기본 정보를 입력해주세요");
        return false;
      }
    }
    const startDate = new Date(`${recruitmentStart.slice(0, 4)}-${recruitmentStart.slice(4, 6)}-${recruitmentStart.slice(6, 8)}`);
    const endDate = new Date(`${recruitmentEnd.slice(0, 4)}-${recruitmentEnd.slice(4, 6)}-${recruitmentEnd.slice(6, 8)}`);
    const current = new Date();
    current.setHours(0, 0, 0, 0);

    if (startDate < current || startDate > endDate) {
      alert("시작일이 현재보다 전이거나 시작일이 마감일보다 늦을 수 없습니다.");
      return false;
    }

    for (const key in resumeData) {
      if (resumeData[key].question === "") {
        alert("질문 정보를 입력해주세요");
        return false;
      }
    }
    return true;
  };

  const onSubmit = async () => {
    if (!validationCheck()) return;
    const submitData = {
      id: clubId, //
      title: recruitmentName,
      description: recruitmentDesc,
      poster: recruitmentPreview,
      startDate: `${recruitmentStart.slice(0, 4)}-${recruitmentStart.slice(4, 6)}-${recruitmentStart.slice(6, 8)}`,
      endDate: `${recruitmentEnd.slice(0, 4)}-${recruitmentEnd.slice(4, 6)}-${recruitmentEnd.slice(6, 8)}`,
      question: [...Object.values(resumeData).map(({ question }) => question)],
    };

    try {
      await axiosInstance.post(`/clubs/${clubId}/announcements`, submitData);
      alert("성공적으로 모집공고를 등록했습니다.");
      push("/clublist?tab=all");
    } catch (error) {
      alert("서버 오류입니다. 잠시후 다시 시도해주세요");
    }
  };

  return (
    <div className={styles.container}>
      <Header loginInfo={loginInfo} />
      <div className={styles.titleContainer}>모집공고 등록</div>
      <div className={styles.registerContainer}>
        <div className={styles.title}>기본정보</div>
        <div className={styles.box}>
          <div className={styles.label}>제목</div>
          <input type="text" placeholder="제목 입력" name="recruitmentName" value={recruitmentName} onChange={onChange}></input>
        </div>
        <div className={styles.box}>
          <div className={styles.label}>모집 시작일</div>
          <input type="text" placeholder="예) 20220101" name="recruitmentStart" value={recruitmentStart} onChange={onChange}></input>
        </div>
        <div className={styles.box}>
          <div className={styles.label}>모집 마감일</div>
          <input type="text" placeholder="예) 20220101" name="recruitmentEnd" value={recruitmentEnd} onChange={onChange}></input>
        </div>
        <div className={styles.box}>
          <div className={styles.label}>상세 내용</div>
          <textarea placeholder="동아리 소개를 입력하세요" name="recruitmentDesc" value={recruitmentDesc} onChange={onChange}></textarea>
        </div>
        <div className={styles.box}>
          <div className={styles.label}>모집 포스터 사진</div>
          <input type="file" id="img" name="recruitmentImage" onChange={onChange} accept="image/*" />
          <label htmlFor="img">{recruitmentImage ? <Image src={recruitmentImage} alt="배너 이미지" objectFit="contain" width={115} height={163} /> : "사진선택"}</label>
        </div>

        <div className={`${styles.title} ${styles.titleMargin}`}>질문 양식</div>
        {Object.entries(resumeData).map(([key, { question }], index) => {
          return (
            <div key={index} className={`${styles.box} ${styles.boxMargin}`}>
              <input type="text" placeholder={question ? `${question} 입력` : "질문 입력"} name={key} value={question} onChange={onChangeResume}></input>
              <div className={styles.minusBtn}>
                <Minus />
                <div name={key} onClick={onClickMinus} className={styles.barrier} />
              </div>
            </div>
          );
        })}
        <div className={styles.plus}>
          <Plus onClick={onClickPlus} />
        </div>
        <div className={styles.box}>
          <input type="button" value="등록하기" onClick={onSubmit} />
        </div>
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
