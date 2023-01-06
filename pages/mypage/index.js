import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styles from "@styles/pages/mypage.module.scss";
import { dictTab, mypageList } from "@utils/util";
import ssrWrapper from "@utils/wrapper";
import axiosInstance from "@utils/axios";
import PageWrapper from "@components/common/PageWrapper";
import PersonalInfo from "@components/MyPage/PersonalInfo";
import BelongClub from "@components/MyPage/BelongClub";
import AppliedClub from "@components/MyPage/AppliedClub";
import { useRouter } from "next/router";

export default function MyPage({ loginInfo, clubData, applicationData }) {
  const router = useRouter();

  const defaultTab = dictTab[router.query.tab] || 0;
  const [index, setIndex] = useState(defaultTab);

  const onClickTabList = (index) => {
    setIndex(index);
    const tab = Object.keys(dictTab).find((key) => dictTab[key] === index);
    router.push(`/mypage?tab=${tab}`, undefined, { shallow: true });
  };

  return (
    <PageWrapper>
      <Tabs selectedIndex={index} onSelect={onClickTabList}>
        <div className={styles.tabListContainer}>
          <TabList className={styles.tabList}>
            {mypageList.map((ele, idx) => (
              <Tab key={idx}>
                <div className={index === idx ? styles.active : null}>{ele.title}</div>
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
            <AppliedClub applicationData={applicationData} userId={loginInfo.userName} />
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
