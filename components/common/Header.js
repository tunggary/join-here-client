import Head from "next/head";
import Link from "next/link";
import styles from "@styles/components/Header.module.scss";

export default function Header({ loginInfo }) {
  const { isLoggedIn, userName } = loginInfo;

  return (
    <header className={styles.container}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
      </Head>
      <div className={styles.infoContainer}>
        <div className={styles.logo}>
          <Link href="/">join here</Link>
        </div>
        <div className={styles.searchBar}>
          <input type="text" placeholder="어떤 동아리를 검색할까요?" />
        </div>
        <div className={styles.information}>
          {isLoggedIn ? (
            <div>
              <span>{userName}</span>님
            </div>
          ) : (
            <>
              <Link href="/login">
                <div>로그인</div>
              </Link>
              <Link href="/login/signup">
                <div>회원가입</div>
              </Link>
            </>
          )}
        </div>
      </div>
      <nav className={styles.navContainer}>
        <ul>
          <li className={styles.navList}>
            <Link href="/">홈</Link>
          </li>
          <li className={styles.navList}>
            <Link href="/clublist?tab=all">동아리 목록</Link>
          </li>
          <li className={styles.navList}>
            <Link href="/register">동아리 등록</Link>
          </li>
          <li className={styles.navList}>
            <Link href="/manage">동아리 관리</Link>
          </li>
          <li className={styles.navList}>마이페이지</li>
        </ul>
      </nav>
    </header>
  );
}
