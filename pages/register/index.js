import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import styles from "../../styles/pages/register.module.scss";
import { dictClub, dictArea } from "../../utils/util";

export default function Register({ loginInfo }) {
  const [imgPreview, setImgPreview] = useState(null);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    setImgPreview(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className={styles.container}>
      <Header loginInfo={loginInfo} />
      <div className={styles.registerContainer}>
        <div className={styles.title}>동아리 등록</div>
        <div className={styles.box}>
          <div className={styles.label}>동아리 이름</div>
          <input type="text" placeholder="동아리 이름을 입력하세요"></input>
        </div>
        <div className={styles.box}>
          <div className={styles.label}>동아리 소개</div>
          <textarea placeholder="동아리 소개를 입력하세요"></textarea>
        </div>
        <div className={styles.box}>
          <div className={styles.label}>분야</div>
          <div className={styles.categoryContainer}>
            {Object.keys(dictClub).map((ele, idx) =>
              idx === 0 ? null : (
                <div key={ele}>
                  <input type="radio" name="category" id={ele} />
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
                <input type="radio" name="area" id={ele} />
                <label htmlFor={ele}>{dictArea[ele]}</label>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.label}>동아리 대표사진</div>
          <input type="file" id="img" onChange={onSelectFile} accept="image/*" />
          <label htmlFor="img">{imgPreview ? <Image src={imgPreview} alt="배너 이미지" objectFit="contain" width={115} height={163} /> : "사진선택"}</label>
        </div>

        <div className={styles.box}>
          <input type="button" value="등록하기" />
        </div>
      </div>
    </div>
  );
}
