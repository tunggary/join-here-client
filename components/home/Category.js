import styles from "../../styles/components/home/Category.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Category1 from "../../public/home/category1.svg";
import Category2 from "../../public/home/category2.svg";
import Category3 from "../../public/home/category3.svg";
import Category4 from "../../public/home/category4.svg";
import Category5 from "../../public/home/category5.svg";
import Category6 from "../../public/home/category6.svg";
import Category7 from "../../public/home/category7.svg";
import Category8 from "../../public/home/category8.svg";
import Category9 from "../../public/home/category9.svg";
import Left from "../../public/home/left.svg";
import Right from "../../public/home/right.svg";
import Link from "next/link";

export default function Category() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplaySpeed: 10,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <section className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.title}>원하는 카테고리를 둘러보세요!</div>
        <div className={styles.subtitle}>전체 카테고리 보기</div>
      </div>
      <div className={styles.categoryContainer}>
        <Slider {...settings} className={styles.slides}>
          <Link href="/clublist?tab=all">
            <div className={styles.slideContent}>
              <div>
                <Category1 />
                <div>전체</div>
              </div>
            </div>
          </Link>
          <Link href="/clublist?tab=stu">
            <div className={styles.slideContent}>
              <div>
                <Category2 />
                <div>학술</div>
              </div>
            </div>
          </Link>
          <Link href="/clublist?tab=art">
            <div className={styles.slideContent}>
              <div>
                <Category3 />
                <div>예술</div>
              </div>
            </div>
          </Link>
          <Link href="/clublist?tab=fri">
            <div className={styles.slideContent}>
              <div>
                <Category4 />
                <div>친목</div>
              </div>
            </div>
          </Link>
          <Link href="/clublist?tab=phy">
            <div className={styles.slideContent}>
              <div>
                <Category9 />
                <div>운동</div>
              </div>
            </div>
          </Link>
          <Link href="/clublist?tab=vac">
            <div className={styles.slideContent}>
              <div>
                <Category5 />
                <div>여행</div>
              </div>
            </div>
          </Link>
          <Link href="/clublist?tab=vol">
            <div className={styles.slideContent}>
              <div>
                <Category6 />
                <div>봉사</div>
              </div>
            </div>
          </Link>
          <Link href="/clublist?tab=bus">
            <div className={styles.slideContent}>
              <div>
                <Category7 />
                <div>창업</div>
              </div>
            </div>
          </Link>
          <Link href="/clublist?tab=etc">
            <div className={styles.slideContent}>
              <div>
                <Category8 />
                <div>기타</div>
              </div>
            </div>
          </Link>
        </Slider>
      </div>
    </section>
  );
}

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div>
      <Right onClick={onClick} className={styles.slickButton} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div>
      <Left onClick={onClick} className={styles.slickButton} />
    </div>
  );
}
