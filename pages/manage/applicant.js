import { useState } from "react";
import Layout from "../../components/common/Layout";
import styles from "../../styles/pages/applicant.module.scss";
import { formatting } from "../../utils/util";
import Arrow from "../../public/clublist/arrow-right.svg";

export default function Applicant({ loginInfo }) {
  const tabElement = {
    all: "전체",
    pass: "합격",
    fail: "불합격",
    hold: "미결정",
  };

  const props = [
    {
      name: "이호석",
      createdAt: new Date("2022-01-01"),
      state: "pass",
      resume: [],
    },
    {
      name: "정성윤",
      createdAt: new Date("2022-01-01"),
      state: "fail",
      resume: [],
    },
    {
      name: "정석환",
      createdAt: new Date("2022-01-01"),
      state: "hold",
      resume: [],
    },
  ];
  const [tab, setTab] = useState("all");
  const [applicantList, setApplicantList] = useState(
    props.map((each) => {
      return { ...each, checked: false };
    })
  );
  const onClickApplicant = ({ target }) => {
    const index = target.parentNode.dataset.index || target.parentNode.parentNode.dataset.index;
    if (!index) return;
    updateApplicantsChecked(Number(index));
  };

  const updateApplicantsChecked = (index) => {
    setApplicantList((prev) => {
      const newApplicantData = {
        ...prev[index],
        checked: !prev[index].checked,
      };
      return prev.map((applicant, idx) => (idx === index ? newApplicantData : applicant));
    });
  };

  const onClickStateButton = ({ target }) => {
    const newState = target.dataset.state;
    if (!newState) return;
    updateCheckedApplicantsState(newState);
  };

  const updateCheckedApplicantsState = (newState) => {
    setApplicantList((prev) => {
      return prev.map((applicant) => {
        const newApplicantData = {
          ...applicant,
          checked: false,
        };
        return applicant.checked ? { ...newApplicantData, state: newState } : newApplicantData;
      });
    });
  };
  return (
    <Layout loginInfo={loginInfo} pageTitle="지원자 관리">
      <div className={styles.container}>
        <div className={styles.tab}>
          {Object.entries(tabElement).map(([ele, kor], index) => (
            <div key={index} className={`${styles.tabElement} ${tab === ele ? styles.active : null}`} onClick={() => setTab(ele)}>
              {kor}
            </div>
          ))}
        </div>
        <div className={styles.applicantContainer}>
          <h1 className={styles.total}>총 {applicantList.length}명</h1>
          <ul className={styles.applicantList}>
            {applicantList
              .filter(({ state }) => state === tab || tab === "all")
              .map(({ name, createdAt, state, checked }, index) => (
                <div key={index} className={styles.applicant} data-index={index} onClick={onClickApplicant}>
                  <div className={styles.checkbox}>
                    <input type="checkbox" checked={checked} />
                  </div>
                  <h2 className={styles.name}>{name}</h2>
                  <h3 className={styles.date}>{formatting(createdAt)}</h3>
                  <h3 className={`${styles.state} ${styles[state]}`}>{tabElement[state]}</h3>
                  <h3 className={styles.resume}>
                    <p>상세보기</p> <Arrow />
                  </h3>
                </div>
              ))}
          </ul>
          <div className={styles.buttonContainer} onClick={onClickStateButton}>
            <button className={`${styles.button} ${styles.pass}`} data-state="pass">
              합격
            </button>
            <button className={`${styles.button} ${styles.fail}`} data-state="fail">
              불합격
            </button>
            <button className={`${styles.button} ${styles.hold}`} data-state="hold">
              미결정
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
