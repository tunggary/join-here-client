import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import styles from "../../../styles/pages/register.module.scss";
import Plus from "../../../public/clublist/plus.svg";
import Minus from "../../../public/clublist/minus.svg";

export default function Recruitment({ loginInfo }) {
  const { push } = useRouter();

  const [recruitmentData, setRecruitmentData] = useState({
    recruitmentName: "",
    recruitmentDesc: "",
    recruitmentStart: "",
    recruitmentEnd: "",
    recruitmentImage: null,
  });
  const [resumeCount, setResumeCount] = useState(1);
  const [resumeData, setResumeData] = useState({
    name: {
      question: "이름",
    },
    phone: {
      question: "연락처",
    },
    question1: {
      question: "",
    },
  });

  const { recruitmentName, recruitmentDesc, recruitmentStart, recruitmentEnd, recruitmentImage } = recruitmentData;

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "recruitmentImage") {
      if (!e.target.files || e.target.files.length === 0) {
        return;
      }
      setRecruitmentData({
        ...recruitmentData,
        [name]: URL.createObjectURL(e.target.files[0]),
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

  const onSubmit = async () => {};

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
