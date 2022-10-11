import styles from "@styles/pages/manage.module.scss";
import Header from "@components/common/Header";
import Location from "@public/clublist/location.svg";
import Arrow from "@public/clublist/arrow-right.svg";
import cookies from "next-cookies";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { categoryList, dictArea, dictPosition } from "@utils/util";

export default function Manage({ loginInfo, data }) {
  return (
    <div className={styles.container}>
      <Header loginInfo={loginInfo} />
      <div className={styles.titleContainer}>동아리 관리</div>
      <div className={styles.contentContainer}>
        {data.map(({ belong }, index) => {
          const {
            club: { id: clubId, name, category, area, image },
            position,
          } = belong;
          return (
            <div key={index} className={styles.clubContainer}>
              <Image
                src={image || "https://images.unsplash.com/photo-1663841226199-a35e5b9c7261?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=192&q=80"}
                alt=""
                width={192}
                height={192}
              ></Image>
              <div className={styles.info}>
                <div className={styles.title}>{name}</div>
                <div className={styles.badge}>
                  <div className={styles.category}>{categoryList.find(({ id }) => id === category).title}</div>
                  <div className={styles.location}>
                    <Location />
                    {dictArea[area]}
                  </div>
                  <div className={`${styles.class}`}>{dictPosition[position]}</div>
                </div>
              </div>
              <ul className={styles.list}>
                {position === "pre" ? (
                  <Link href={`/register/recruitment/${clubId}`}>
                    <li className={styles.element}>
                      모집공고 등록
                      <Arrow />
                    </li>
                  </Link>
                ) : null}
                {position === "pre" ? (
                  <li className={styles.element}>
                    지원자 관리
                    <Arrow />
                  </li>
                ) : null}
                <Link href={`/manage/${clubId}/member`}>
                  <li className={styles.element}>
                    동아리원 보기
                    <Arrow />
                  </li>
                </Link>
                {position === "pre" ? (
                  <li className={styles.element}>
                    동아리 정보 수정
                    <Arrow />
                  </li>
                ) : null}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { id: userId } = cookies(ctx);
  const { data } = await axios.get(`http://3.36.36.87:8080/members/${userId}/clubs`);
  return {
    props: {
      data: data || [],
    },
  };
}
