import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import styles from "../../styles/pages/register.module.scss";
import { dictClub, dictArea } from "../../utils/util";

export default function Register({ loginInfo }) {
  const { push } = useRouter();

  const [submitData, setSubmitData] = useState({
    clubName: "",
    clubDesc: "",
    clubCategory: "",
    clubLocation: "",
    clubImage: null,
  });

  const { clubName, clubDesc, clubCategory, clubLocation, clubImage } = submitData;

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "clubImage") {
      if (!e.target.files || e.target.files.length === 0) {
        return;
      }
      setSubmitData({
        ...submitData,
        [name]: URL.createObjectURL(e.target.files[0]),
      });
    } else {
      setSubmitData({
        ...submitData,
        [name]: value,
      });
    }
  };
  const onSubmit = async () => {
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

    push("/clublist?tab=all");
  };

  return (
    <div className={styles.container}>
      <Header loginInfo={loginInfo} />
      <div className={styles.registerContainer}>
        <div className={styles.title}>동아리 등록</div>
        <div className={styles.box}>
          <div className={styles.label}>동아리 이름</div>
          <input type="text" placeholder="동아리 이름을 입력하세요" name="clubName" value={clubName} onChange={onChange}></input>
        </div>
        <div className={styles.box}>
          <div className={styles.label}>동아리 소개</div>
          <textarea placeholder="동아리 소개를 입력하세요" name="clubDesc" value={clubDesc} onChange={onChange}></textarea>
        </div>
        <div className={styles.box}>
          <div className={styles.label}>분야</div>
          <div className={styles.categoryContainer}>
            {Object.keys(dictClub).map((ele, idx) =>
              idx === 0 ? null : (
                <div key={ele}>
                  <input type="radio" name="clubCategory" id={ele} value={ele} onChange={onChange} />
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
                <input type="radio" name="clubLocation" id={ele} value={ele} onChange={onChange} />
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

        <div className={styles.box}>
          <input type="button" value="등록하기" onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
}
