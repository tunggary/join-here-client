import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styles from "@styles/pages/mypage.module.scss";
import { mypageList } from "@utils/util";
import ssrWrapper from "@utils/wrapper";
import axiosInstance from "@utils/axios";
import PageWrapper from "@components/common/PageWrapper";
import PersonalInfo from "@components/MyPage/PersonalInfo";
import BelongClub from "@components/MyPage/BelongClub";
import ApplyClub from "@components/MyPage/ApplyClub";

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
            <ApplyClub applicationData={applicationData} />
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
    applicationData: applicationData || [],
  }));
});
