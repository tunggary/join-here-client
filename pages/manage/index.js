import styles from "@styles/pages/manage.module.scss";
import Header from "@components/common/Header";
import Location from "@public/clublist/location.svg";
import Arrow from "@public/clublist/arrow-right.svg";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { categoryList, dictArea, dictPosition } from "@utils/util";
import ssrWrapper from "@utils/wrapper";

export default function Manage({ loginInfo, data }) {
  return (
    <div className={styles.container}>
      <Header loginInfo={loginInfo} />
      <div className={styles.titleContainer}>동아리 관리</div>
      <div className={styles.contentContainer}>
        {data.map(({ belong, hasAnnouncement }, index) => {
          const {
            club: { id: clubId, name, category, area, image },
            position,
          } = belong;
          return (
            <div key={index} className={styles.clubContainer}>
              <Image src={image || "/clublist/default.png"} alt="" width={192} height={192} />
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
                {position === "pre" && hasAnnouncement ? (
                  <Link href={`/manage/${clubId}/applicant`}>
                    <li className={styles.element}>
                      지원자 관리
                      <Arrow />
                    </li>
                  </Link>
                ) : null}
                <Link href={`/manage/${clubId}/member`}>
                  <li className={styles.element}>
                    동아리원 보기
                    <Arrow />
                  </li>
                </Link>
                {position === "pre" ? (
                  <Link href={`/register?update=yes&clubId=${clubId}`}>
                    <li className={styles.element}>
                      동아리 정보 수정
                      <Arrow />
                    </li>
                  </Link>
                ) : null}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const getServerSideProps = ssrWrapper(async ({ userId }) => {
  if (!userId) {
    throw { url: "/login" };
  }
  const { data } = await axios.get(`http://3.36.36.87:8080/members/${userId}/belongs`);
  return {
    data: data || [],
  };
});
