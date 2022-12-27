import Header from "@components/common/Header";
import styles from "@styles/components/common/Layout.module.scss";

export default function Layout({ children, pageTitle = "" }) {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <h1 className={styles.pageTitle}>{pageTitle}</h1>
        <article className={styles.content}> {children}</article>
      </div>
    </div>
  );
}
