import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@styles/pages/mypage.module.scss";
import Header from "@components/common/Header";
import Location from "@public/clublist/location.svg";
import { dictClub, dictArea, mypageList, stateDict } from "@utils/util";
import Input from "@components/common/inputTemplate/Input";
import Form from "@components/common/inputTemplate/Form";
import Arrow from "@public/manage/arrow-right.svg";
import ssrWrapper from "@utils/wrapper";
import axiosInstance from "@utils/axios";

export default function Home({ loginInfo, userData, clubData, applicationData }) {
  const [index, setIndex] = useState(0);

  const [data, setData] = useState({
    name: userData.name,
    birth: userData.birthday.replaceAll("-", ""),
    phone: userData.phone,
  });

  const [check, setCheck] = useState({
    password: false,
  });

  const { name, birth, phone } = data;

  const onChange = (e) => {
    const { value, id } = e.target;

    if (id === "birth" && value.length > 8) return;
    if (id === "phone" && value.length > 11) return;

    if (id === "confirm" || id === "password") {
      if (value === "") {
        setCheck({
          ...check,
          password: false,
        });
      } else {
        setCheck({
          ...check,
          password: (id === "confirm" && password === value) || (id === "password" && confirm === value),
        });
      }
    }

    setData({
      ...data,
      [id]: value,
    });
  };

  const onSubmit = () => {
    if (name === "") {
      alert("이름을 입력해주세요.");
      return;
    }
    if (birth.length !== 8) {
      alert("생년월일 8자리를 입력해주세요.");
      return;
    }
    if (phone.length < 10 || phone.length > 11) {
      alert("핸드폰 번호를 입력해주세요");
      return;
    }
    signup();
  };

  const signup = async () => {
    try {
      await axiosInstance.patch("/members", {
        id: userData.id,
        name,
        password: userData.password,
        birthday: `${birth.slice(0, 4)}-${birth.slice(4, 6)}-${birth.slice(6, 8)}`,
        phone,
      });
      alert("성공적으로 수정했습니다.");
    } catch (error) {
      alert("잠시후 다시 시도해주세요.");
    }
  };

  return (
    <div className={styles.container}>
      <Header loginInfo={loginInfo} />
      <Tabs selectedIndex={index} onSelect={(index) => setIndex(index)}>
        <div className={styles.tabListContainer}>
          <TabList className={styles.tabList}>
            {mypageList.map((ele, idx) => (
              <Tab key={idx}>
                <div className={index == idx ? styles.active : undefined}>{ele.title}</div>
              </Tab>
            ))}
          </TabList>
        </div>
        <div className={styles.tabPannelContainer}>
          <TabPanel>
            <section className={styles.userDataContainer}>
              <Form button="수정하기" onClick={onSubmit}>
                <Input id="name" name="name" label="이름" value={name} placeholder="이름을 입력해주세요" onChange={onChange} />
                <Input id="birth" name="birth" label="생년월일" value={birth} placeholder="생년월일을 입력해주세요" onChange={onChange} />
                <Input id="phone" name="phone" label="핸드폰" value={phone} placeholder="핸드폰 번호를 입력해주세요" onChange={onChange} />
              </Form>
            </section>
          </TabPanel>
          <TabPanel>
            <section className={styles.clubContainer}>
              {clubData.map(({ belong: { club } }) => (
                <div key={club.id} className={styles.club}>
                  <div className={styles.poster}>
                    <Image src={club.image || "/clublist/default.png"} alt="동아리 사진" width={115} height={163} />
                  </div>
                  <div className={styles.clubInfo}>
                    <div className={styles.title}>{club.name}</div>
                    <div className={styles.category}>{dictClub[club.category][0]}</div>
                    <div className={styles.location}>
                      <Location />
                      {dictArea[club.area]}
                    </div>
                    <div className={styles.desc}>{club.introduction}</div>
                    <div className={styles.view}>
                      <span>조회수 {club.view}</span> <span>찜한수 {club.scrap}</span>
                    </div>
                    <Link href={`/manage/${club.id}/member`}>
                      <div className={styles.link}>
                        동아리원 보기
                        <Arrow />
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </section>
          </TabPanel>
          <TabPanel>
            <section className={styles.applicationContainer}>
              {applicationData.map((club) => (
                <div className={styles.club} key={club.clubId}>
                  <div className={styles.name}>{club.clubName}</div>
                  <div className={`${styles.state} ${styles[club.passState]}`}>{club.passState === "hold" ? "심사중" : stateDict[club.passState]}</div>
                  <Link href={`/manage/${club.clubId}/applicant/${club.applicationId}/${loginInfo.userName}/resume`}>
                    <div className={styles.resume}>
                      지원서 보기 <Arrow />
                    </div>
                  </Link>
                </div>
              ))}
            </section>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
}

export const getServerSideProps = ssrWrapper(async ({ userId }) => {
  if (!userId) {
    throw { url: "/login" };
  }

  return await Promise.all([
    axiosInstance.get(`/members/${userId}`), //
    axiosInstance.get(`/members/${userId}/belongs`),
    axiosInstance.get(`/members/${userId}/applications`),
  ]).then(([userData, clubData, applicationData]) => ({
    userData,
    clubData: clubData || [],
    applicationData,
  }));
});
