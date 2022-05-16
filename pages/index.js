import styles from "../styles/pages/index.module.scss";
import Header from "../components/Header";
import Banner from "../components/home/Banner";
import Category from "../components/home/Category";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <Banner />
      <Category />
    </main>
  );
}
