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

  const text = `토론모임 🏛 아고라, 서울🏛 부원 모집
  \n\n&nbsp;\n\n

  ‘아고라는 시민들이 사교 활동을 하면서 여론을 형성하던 의사소통의 중심지였으며 학문과 사상 등에 대한 토론이 이루어지던 문화와 예술의 중심지였다’
  \n\n&nbsp;\n\n
  책, 영화, 연극등의 작품을 감상하고 여러가지를 말하고 들으며 기존 생각의 틀을 깨고 넓은 생각을 할 수 있는 모임이 되는 것이 목표입니다
  어떤 얘기든 할 수 있어요! 본인이 겪은 이야기, 사회와 관련된 이야기, 개인적인 감상 등등
  누군가는 공상적이고 이상적이라고 할 이야기들도 환영합니다!
  좋은 작품들을 통해 우리가 당연히 받아들이던 것에 의문을 제기하고 다른 사람을 이해하고 스스로 사고하려는 모임입니다.
  \n\n&nbsp;\n\n

  🏛 운영 주체 🏛 : 건국대 학생이 자체적으로 운영하는 모임입니다. 정치 종교 시민단체와 아무 상관이 없습니다. 특정 목적을 갖고 가입하시려는 분들을 환영하지 않아요.
  \n\n&nbsp;\n\n

  🏛 활동 내용 🏛 : 2주에 한 번 오프라인으로 일요일에 모여 정해진 작품을 주제로 해서 서로의 의견을 나누어요
  \n\n&nbsp;\n\n

  장소는 서울 내에서 매 번 바뀔예정입니다! 5~8인정도 수용 가능한 스터디룸 및 세미나실에서 주로 모일 예정입니다.
  \n\n&nbsp;\n\n

  🏛 모집 절차 🏛 : 5.26~ 5.30 모집
  6.4 발표 및 연락
  기말고사가 끝난 후 6월 4째주 일요일 예정
  (부원이 모이면 상의후 확정)
  \n\n&nbsp;\n\n

  🏛 회비 🏛 : 따로 없고 모이는 스터디룸 비용을 n분의 1해서 낼 계획입니다.
  \n\n&nbsp;\n\n

  아고라에 모일 부원들을 기다립니다.
  `;
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
                <div className={styles.poster}>
                  <Image src={"" || "/clublist/dummy.png"} alt="포스터" width={890} height={780} quality={100} />
                </div>
                <div className={styles.date}>모집 공고 시작일 {data.announcement.startDate}</div>
                <div className={styles.date}>모집 공고 종료일 {data.announcement.endDate}</div>
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
  const { clubId } = ctx.params;
  const { data } = await axios.get(`http://3.36.36.87:8080/clubs/${clubId}`);
  const isBelong = await isMember(clubId, id);
  return {
    props: {
      isBelong,
      data,
    },
  };
}
