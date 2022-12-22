import Head from "next/head";
import Link from "next/link";
import styles from "@styles/components/Header.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Header({ loginInfo, searchValue }) {
  const { isLoggedIn, userName } = loginInfo;
  const { push } = useRouter();
  const [search, setSearch] = useState(searchValue || "");

  const submitSearchData = (e) => {
    e.preventDefault();
    push(`/clublist?tab=all${search ? `&search=${search}` : ""}`);
  };

  const logout = () => {
    document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.href = "/";
  };

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
        <form className={styles.searchBar} onSubmit={submitSearchData}>
          <input type="text" placeholder="어떤 동아리를 검색할까요?" value={search} onChange={(e) => setSearch(e.target.value)} />
        </form>
        <div className={styles.information}>
          {isLoggedIn ? (
            <div>
              <span>{userName}</span>님
              <div className={styles.logout} onClick={logout}>
                로그아웃
              </div>
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
          <li className={styles.navList}>
            <Link href="/mypage">마이페이지</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
