import styles from "./PageWrapper.module.scss";

export default function PageWrapper({ children, pageTitle, theme }) {
  return (
    <section className={`${styles.container} ${styles[theme]}`}>
      {pageTitle && <h1 className={styles.page_title}>{pageTitle}</h1>}
      {children}
    </section>
  );
}
