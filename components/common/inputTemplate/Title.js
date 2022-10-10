import styles from "../../../styles/components/common/inputTemplate.module.scss";
export default function Title({ children }) {
  return <h1 className={styles.title}>{children}</h1>;
}
