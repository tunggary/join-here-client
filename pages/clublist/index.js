import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@styles/pages/clublist.module.scss";
import Header from "@components/common/Header";
import Location from "@public/clublist/location.svg";
import { categoryList, dictClub, dictArea } from "@utils/util";
import ssrWrapper from "@utils/wrapper";
import axiosInstance from "@utils/axios";

export default function Home({ data, search, loginInfo }) {
  const {
    query: { tab },
    push,
  } = useRouter();

  const [index, setIndex] = useState(dictClub[tab][1]);

  const filterClubList = (category) => {
    return data
      .filter((club) => category === "all" || club.category == category)
      .map((club) => {
        let dDay = club.endDate ? Math.floor((new Date(club.endDate) - new Date().setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24)) : -1;
        return (
          <Link href={`clublist/${club.id}`} key={club.id}>
            <div className={styles.clubContainer}>
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
                {dDay >= 0 && <div className={styles.dDay}>D - {dDay}</div>}
              </div>
            </div>
          </Link>
        );
      });
  };
  return (
    <div className={styles.container}>
      <Header loginInfo={loginInfo} searchValue={search ? decodeURI(search) : null} />
      <Tabs selectedIndex={index} onSelect={(index) => setIndex(index)}>
        <div className={styles.tabListContainer}>
          <TabList className={styles.tabList}>
            {categoryList.map((category, idx) => (
              <Tab key={idx}>
                <div
                  className={index == idx ? styles.active : undefined}
                  onClick={() => {
                    push(`clublist?tab=${category.id}${search ? `&search=${search}` : ""}`, undefined, {
                      shallow: true,
                    });
                  }}
                >
                  {category.title}
                </div>
              </Tab>
            ))}
          </TabList>
        </div>
        <div className={styles.tabPannelContainer}>
          {categoryList.map((category, idx) => (
            <TabPanel key={idx} className={styles.tabPannel}>
              {filterClubList(category.id)}
            </TabPanel>
          ))}
        </div>
      </Tabs>
    </div>
  );
}

export const getServerSideProps = ssrWrapper(async ({ context }) => {
  const { search } = context.query;
  const encodeURISearch = encodeURI(search);
  if (search) {
    const { data } = await axiosInstance.get(`/clubs/search?query=${encodeURISearch}`);
    return {
      search: encodeURISearch,
      data,
    };
  } else {
    const { data } = await axiosInstance.get("/clubs");
    return { data };
  }
});
