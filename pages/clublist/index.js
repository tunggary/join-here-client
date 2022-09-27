import styles from "../../styles/pages/clublist.module.scss";
import Header from "../../components/Header";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useState } from "react";
import Image from "next/image";
import Location from "../../public/clublist/location.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { categoryList, dictClub, dictArea } from "../../utils/util";

export default function Home({ data, loginInfo }) {
  const {
    query: { tab },
    push,
  } = useRouter();

  const [index, setIndex] = useState(dictClub[tab][1]);

  const filterClubList = (category) => {
    console.log(data);
    return data
      .filter((club) => category === "all" || club.category == category)
      .map((club) => (
        <Link href={`clublist/${club.id}`} key={club.id}>
          <div className={styles.clubContainer}>
            <div className={styles.poster}>
              <Image src={club.logo || "/clublist/default.png"} alt="동아리 사진" width={115} height={163} />
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
              <div className={styles.dDay}>{club.endDate ? "D - " + Math.floor((new Date(club.endDate) - new Date()) / (1000 * 60 * 60 * 24)) : null}</div>
            </div>
          </div>
        </Link>
      ));
  };
  return (
    <div className={styles.container}>
      <Header loginInfo={loginInfo} />
      <Tabs selectedIndex={index} onSelect={(index) => setIndex(index)}>
        <div className={styles.tabListContainer}>
          <TabList className={styles.tabList}>
            {categoryList.map((category, idx) => (
              <Tab key={idx}>
                <div
                  className={index == idx ? styles.active : undefined}
                  onClick={() => {
                    push(`clublist?tab=${category.id}`, undefined, {
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

export async function getServerSideProps(ctx) {
  const { data } = await axios.get("http://3.36.36.87:8080/clubs");
  return {
    props: {
      data,
    },
  };
}
