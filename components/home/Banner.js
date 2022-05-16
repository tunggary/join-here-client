import Image from "next/image";
import styles from "../../styles/components/home/Banner.module.scss";

export default function Banner() {
  return (
    <section className={styles.container}>
      <Image src="/home/banner1.png" alt="배너 이미지" width={1200} height={370} quality={100} />
    </section>
  );
}
