import Footer from "@components/common/Footer";
import Header from "@components/common/Header";
import styles from "./Layout.module.scss";

export default function Layout({ children, ...props }) {
  return (
    <div className={styles.container}>
      <Header {...props} />
      <main className={styles.page_content}>{children}</main>
      <Footer />
    </div>
  );
}
