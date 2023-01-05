import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@styles/pages/mypage.module.scss";
import Location from "@public/clublist/location.svg";
import { dictClub, dictArea, mypageList, stateDict } from "@utils/util";
import Arrow from "@public/manage/arrow-right.svg";
import ssrWrapper from "@utils/wrapper";
import axiosInstance from "@utils/axios";
import PageWrapper from "@components/common/PageWrapper";
import PersonalInfo from "@components/MyPage/PersonalInfo";

export default function Home({ loginInfo, clubData, applicationData }) {
  const [index, setIndex] = useState(0);
  return (
    <PageWrapper>
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
            <PersonalInfo userId={loginInfo.userName} />
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
                    <div className={styles.category}>{dictClub[club.category] ? dictClub[club.category][0] : club.category}</div>
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
                  <Link href={`/manage/${club.clubId}/applicant/${club.applicationId}/${loginInfo.userName}`}>
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
    </PageWrapper>
  );
}

export const getServerSideProps = ssrWrapper(async ({ userId }) => {
  if (!userId) {
    throw { url: "/login" };
  }

  return await Promise.all([
    axiosInstance.get(`/members/${userId}/belongs`), //
    axiosInstance.get(`/members/${userId}/applications`),
  ]).then(([clubData, applicationData]) => ({
    clubData: clubData || [],
    applicationData,
  }));
});
