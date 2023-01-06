import Image from "next/image";
import Link from "next/link";
import styles from "@styles/pages/mypage.module.scss";
import Location from "@public/clublist/location.svg";
import Arrow from "@public/manage/arrow-right.svg";
import { dictClub, dictArea } from "@utils/util";

export default function BelongClub({ clubData }) {
  return (
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
  );
}
