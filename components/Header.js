import Link from "next/link";
import styles from "../styles/components/Header.module.scss";

export default function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.logo}>
          <Link href="/">join here</Link>
        </div>
        <div className={styles.searchBar}>
          <input type="text" placeholder="어떤 동아리를 검색할까요?" />
        </div>
        <div className={styles.information}>
          <div>로그인</div>
          <div>회원가입</div>
        </div>
      </div>
      <nav className={styles.navContainer}>
        <ul>
          <li className={styles.navList}>홈</li>
          <li className={styles.navList}>동아리 목록</li>
          <li className={styles.navList}>동아리 등록</li>
          <li className={styles.navList}>동아리 관리</li>
          <li className={styles.navList}>마이페이지</li>
        </ul>
      </nav>
    </header>
  );
}
