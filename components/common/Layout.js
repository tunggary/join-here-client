import Header from "@components/common/Header";
import styles from "@styles/components/common/Layout.module.scss";

export default function Layout({ children, loginInfo, pageTitle = "" }) {
  return (
    <div className={styles.container}>
      <main className={styles.contentContainer}>
        <h1 className={styles.pageTitle}>{pageTitle}</h1>
        <article className={styles.content}> {children}</article>
      </main>
    </div>
  );
}
