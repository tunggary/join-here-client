import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@styles/pages/mypage.module.scss";
import { dictClub, dictArea, mypageList, stateDict } from "@utils/util";
import Arrow from "@public/manage/arrow-right.svg";
import ssrWrapper from "@utils/wrapper";
import axiosInstance from "@utils/axios";
import PageWrapper from "@components/common/PageWrapper";
import PersonalInfo from "@components/MyPage/PersonalInfo";
import BelongClub from "@components/MyPage/BelongClub";

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
            <BelongClub clubData={clubData} />
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
