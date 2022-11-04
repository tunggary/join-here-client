import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "@styles/pages/club.module.scss";
import Header from "@components/common/Header";
import Location from "@public/clublist/location.svg";
import Apply from "@public/clublist/apply.svg";
import Scrap from "@public/clublist/scrap.svg";
import NonScrap from "@public/clublist/nonscrap.svg";

import axios from "axios";
import { categoryList, dictClub, dictArea, isMember } from "@utils/util";
import Link from "next/link";
import cookies from "next-cookies";

export default function Club({ data, loginInfo, isBelong }) {
  const { area, category, introduction, name, scrap: scrapCount, view: viewCount } = data.club;

  const [index, setIndex] = useState(0);

  const [scrap, setScrap] = useState(false);
  const [currentDate, startDate, endDate] = [new Date(), new Date(data.announcement?.startDate), new Date(data.announcement?.endDate)];
  const categoryList = data.announcement ? ["모집공고", "후기", "Q&A"] : ["후기", "Q&A"];
  return (
    <div className={styles.container}>
      <Header loginInfo={loginInfo} />
      <div className={styles.topContainer}>
        <div className={styles.title}>
          {name}
          {!loginInfo.isLoggedIn ? null : scrap ? (
            <Scrap className={`${styles.scrap} ${styles.bounce}`} onClick={() => setScrap((prev) => !prev)} />
          ) : (
            <NonScrap className={styles.scrap} onClick={() => setScrap((prev) => !prev)} />
          )}
        </div>
        <div className={styles.info}>
          <div className={styles.category}>{dictClub[category][0]}</div>
          <div className={styles.location}>
            <Location />
            {dictArea[area]}
          </div>
        </div>
        <div className={styles.view}>
          <span>조회수 {viewCount}</span>
          <span>찜한수 {scrapCount}</span>
        </div>
        <div className={`${styles.desc} ${introduction.length < 60 ? styles.center : undefined}`}>{introduction}</div>
        {currentDate >= startDate && currentDate <= endDate && !isBelong ? (
          <Link href={`/clublist/${data.announcement?.id}/apply`}>
            <input type="button" value="지원하기" className={styles.applyButton} />
          </Link>
        ) : null}
      </div>
      <Tabs selectedIndex={index} onSelect={(index) => setIndex(index)}>
        <div className={styles.tabListContainer}>
          <TabList className={styles.tabList}>
            {categoryList.map((category, idx) => {
              return (
                <Tab key={idx}>
                  <div className={index == idx ? styles.active : undefined}>{category}</div>
                </Tab>
              );
            })}
          </TabList>
        </div>
        <div className={styles.tabPannelContainer}>
          {data.announcement && (
            <TabPanel>
              <div className={styles.introContainer}>
                {data.announcement.poster && (
                  <div className={styles.poster}>
                    <Image src={data.announcement.poster} alt="포스터" width={890} height={780} quality={100} />
                  </div>
                )}
                <div className={styles.date}>
                  모집 공고 시작일 : <strong>{data.announcement.startDate}</strong>
                </div>
                <div className={styles.date}>
                  모집 공고 종료일 : <strong>{data.announcement.endDate}</strong>
                </div>
                <ReactMarkdown remarkPlugins={[remarkGfm]} className={styles.description}>
                  {data.announcement.description}
                </ReactMarkdown>
              </div>
            </TabPanel>
          )}

          <TabPanel>
            <div className={styles.reviewContainer}>
              <input type="button" value="후기 등록하기" className={styles.reviewAssignButton} />
              <div className={styles.reviewList}>
                <section className={styles.review}>
                  <div className={styles.info}>
                    <div className={styles.name}>세오칸</div>
                    <div className={styles.date}>05/29 03:22</div>
                  </div>
                  <div className={styles.text}>아무 생각 없이 들어갔는데 유익하고 재밌었습니다!</div>
                </section>
                <section className={styles.review}>
                  <div className={styles.info}>
                    <div className={styles.name}>세오칸</div>
                    <div className={styles.date}>05/29 03:22</div>
                  </div>
                  <div className={styles.text}>아무 생각 없이 들어갔는데 유익하고 재밌었습니다!</div>
                </section>
                <section className={styles.review}>
                  <div className={styles.info}>
                    <div className={styles.name}>세오칸</div>
                    <div className={styles.date}>05/29 03:22</div>
                  </div>
                  <div className={styles.text}>아무 생각 없이 들어갔는데 유익하고 재밌었습니다!</div>
                </section>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className={styles.reviewContainer}>
              <input type="button" value="질문 등록하기" className={styles.reviewAssignButton} />
              <div className={styles.reviewList}>
                <section className={styles.review}>
                  <div className={styles.info}>
                    <div className={styles.name}>세오칸</div>
                    <div className={styles.date}>05/29 03:22</div>
                  </div>
                  <div className={styles.text}>회비는 얼마 정도인가요?</div>
                  <div className={styles.apply}>
                    <Apply />
                    <div className={styles.info}>
                      <div className={styles.name}>담당자</div>
                      <div className={styles.date}>05/29 09:22</div>
                    </div>
                    <div className={styles.text}>학기당 10만원 입니다!</div>
                  </div>
                  <div className={styles.apply}>
                    <Apply />
                    <div className={styles.info}>
                      <div className={styles.name}>세오칸</div>
                      <div className={styles.date}>05/29 10:01</div>
                    </div>
                    <div className={styles.text}>감사합니다😄</div>
                  </div>
                </section>
              </div>
            </div>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { id } = cookies(ctx);
  const { clubid: clubId } = ctx.params;
  const { data } = await axios.get(`http://3.36.36.87:8080/clubs/${clubId}`);
  const isBelong = await isMember(clubId, id);
  return {
    props: {
      isBelong,
      data,
    },
  };
}
