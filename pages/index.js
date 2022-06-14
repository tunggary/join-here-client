import styles from "../styles/pages/index.module.scss";
import Header from "../components/Header";
import Banner from "../components/home/Banner";
import Category from "../components/home/Category";

export default function Home({ loginInfo }) {
  return (
    <main className={styles.main}>
      <Header loginInfo={loginInfo} />
      <Banner />
      <Category />
    </main>
  );
}
