import styles from "../../styles/pages/manage.module.scss";
import Header from "../../components/Header";
import Location from "../../public/clublist/location.svg";
import Arrow from "../../public/clublist/arrow-right.svg";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

export default function Manage({ loginInfo }) {
  return (
    <div className={styles.container}>
      <Header loginInfo={loginInfo} />
      <div className={styles.titleContainer}>동아리 관리</div>
      <div className={styles.contentContainer}>
        <div className={styles.clubContainer}>
          <Image
            src="https://images.unsplash.com/photo-1663841226199-a35e5b9c7261?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=192&q=80"
            alt=""
            width={192}
            height={192}
          ></Image>
          <div className={styles.info}>
            <div className={styles.title}>해커즈</div>
            <div className={styles.badge}>
              <div className={styles.category}>학술</div>
              <div className={styles.location}>
                <Location />
                서울
              </div>
              <div className={`${styles.class}`}>회장</div>
            </div>
          </div>
          <ul className={styles.list}>
            <li className={styles.element}>
              모집공고 등록
              <Arrow />
            </li>
            <li className={styles.element}>
              지원자 관리
              <Arrow />
            </li>
            <li className={styles.element}>
              동아리원 보기
              <Arrow />
            </li>
            <li className={styles.element}>
              동아리 정보 수정
              <Arrow />
            </li>
          </ul>
        </div>
        <div className={styles.clubContainer}>
          <Image
            src="https://images.unsplash.com/photo-1663841226199-a35e5b9c7261?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=192&q=80"
            alt=""
            width={192}
            height={192}
          ></Image>
          <div className={styles.info}>
            <div className={styles.title}>해커즈</div>
            <div className={styles.badge}>
              <div className={styles.category}>학술</div>
              <div className={styles.location}>
                <Location />
                서울
              </div>
              <div className={`${styles.class}`}>회장</div>
            </div>
          </div>
          <ul className={styles.list}>
            <li className={styles.element}>
              모집공고 등록
              <Arrow />
            </li>
            <li className={styles.element}>
              지원자 관리
              <Arrow />
            </li>
            <li className={styles.element}>
              동아리원 보기
              <Arrow />
            </li>
            <li className={styles.element}>
              동아리 정보 수정
              <Arrow />
            </li>
          </ul>
        </div>
        <div className={styles.clubContainer}>
          <Image
            src="https://images.unsplash.com/photo-1663841226199-a35e5b9c7261?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=192&q=80"
            alt=""
            width={192}
            height={192}
          ></Image>
          <div className={styles.info}>
            <div className={styles.title}>해커즈</div>
            <div className={styles.badge}>
              <div className={styles.category}>학술</div>
              <div className={styles.location}>
                <Location />
                서울
              </div>
              <div className={`${styles.class}`}>회장</div>
            </div>
          </div>
          <ul className={styles.list}>
            <li className={styles.element}>
              모집공고 등록
              <Arrow />
            </li>
            <li className={styles.element}>
              지원자 관리
              <Arrow />
            </li>
            <li className={styles.element}>
              동아리원 보기
              <Arrow />
            </li>
            <li className={styles.element}>
              동아리 정보 수정
              <Arrow />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { data } = await axios.get("http://3.36.36.87:8080/clubs");
  return {
    props: {
      data,
    },
  };
}
