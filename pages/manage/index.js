import styles from "@styles/pages/manage.module.scss";
import Location from "@public/clublist/location.svg";
import Arrow from "@public/clublist/arrow-right.svg";
import Image from "next/image";
import Link from "next/link";
import { categoryList, dictArea, dictPosition } from "@utils/util";
import ssrWrapper from "@utils/wrapper";
import axiosInstance from "@utils/axios";
import PageWrapper from "@components/common/PageWrapper";

export default function Manage({ data }) {
  return (
    <PageWrapper pageTitle="동아리 관리">
      <div className={styles.contentContainer}>
        {data.map(({ belong, hasAnnouncement }, index) => {
          const {
            club: { id: clubId, name, category, area, image },
            position,
          } = belong;
          return (
            <section key={index} className={styles.clubContainer}>
              <div className={styles.left_section}>
                <Image src={image || "/clublist/default.png"} alt={"동아리 포스터"} layout={"fill"} objectFit={"contain"} />
              </div>
              <div className={styles.center_section}>
                <div className={styles.title}>{name}</div>
                <div className={styles.badge}>
                  <div className={styles.category}>{categoryList.find(({ id }) => id === category)?.title}</div>
                  <div className={styles.location}>
                    <Location />
                    {dictArea[area]}
                  </div>
                  <div className={`${styles.class}`}>{dictPosition[position]}</div>
                </div>
              </div>
              <ul className={styles.right_section}>
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
                  <Link href={`/club/modification?clubId=${clubId}`}>
                    <li className={styles.element}>
                      동아리 정보 수정
                      <Arrow />
                    </li>
                  </Link>
                ) : null}
              </ul>
            </section>
          );
        })}
      </div>
    </PageWrapper>
  );
}

export const getServerSideProps = ssrWrapper(async ({ userId }) => {
  if (!userId) throw { url: "/login" };

  const data = await axiosInstance.get(`/members/${userId}/belongs`);
  return { data: data || [] };
});
