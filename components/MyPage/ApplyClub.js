import Link from "next/link";
import styles from "@styles/pages/mypage.module.scss";
import Arrow from "@public/manage/arrow-right.svg";
import { stateDict } from "@utils/util";

export default function ApplyClub({ applicationData, userId }) {
  return (
    <section className={styles.applicationContainer}>
      {applicationData.map((club) => (
        <div className={styles.club} key={club.clubId}>
          <div className={styles.name}>{club.clubName}</div>
          <div className={`${styles.state} ${styles[club.passState]}`}>{club.passState === "hold" ? "심사중" : stateDict[club.passState]}</div>
          <Link href={`/manage/${club.clubId}/applicant/${club.applicationId}/${userId}`}>
            <div className={styles.resume}>
              지원서 보기 <Arrow />
            </div>
          </Link>
        </div>
      ))}
    </section>
  );
}
