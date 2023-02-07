import { useState } from "react";
import Link from "next/link";
import styles from "@styles/pages/applicant.module.scss";
import Arrow from "@public/clublist/arrow-right.svg";
import ssrWrapper from "@utils/wrapper";
import { formatting, isManagement, stateDict } from "@utils/util";
import axiosInstance from "@utils/axios";
import PageWrapper from "@components/common/PageWrapper";

export default function Applicant({ data, clubId }) {
  const [tab, setTab] = useState("all");
  const [applicantList, setApplicantList] = useState(
    data.map((applicant) => {
      return {
        ...applicant,
        checked: false,
      };
    })
  );

  const onClickTemporarySave = async () => {
    if (confirm("임시저장 하시겠습니까?")) {
      const submitData = applicantList.map(({ applicationId, passState }) => {
        return { applicationId, passState };
      });
      try {
        await axiosInstance.patch(`/clubs/${clubId}/applications`, submitData);
        alert("성공적으로 저장했습니다.");
      } catch (error) {
        alert("임시 저장에 실패했습니다. 잠시후 다시 시도해주세요.");
      }
    }
  };

  const onClickPermanentSave = async () => {
    if (confirm("최종 완료하시겠습니까?\n미결정자는 불합격 처리됩니다. 이후 최종 결과는 지원자들에게 카카오톡으로 전송됩니다.")) {
      const submitData = applicantList.map(({ memberId, applicationId, passState }) => {
        return { applicationId, passState, memberId };
      });
      try {
        await axiosInstance.post(`/clubs/${clubId}/applications/publish`, submitData);
        alert("성공적으로 완료했습니다.");
      } catch (error) {
        alert("최종 결과 저장에 실패했습니다. 잠시후 다시 시도해주세요.");
      }
    }
  };

  const onClickApplicant = ({ target }) => {
    const index = target.dataset.index;
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
        return applicant.checked ? { ...newApplicantData, passState: newState } : newApplicantData;
      });
    });
  };
  return (
    <PageWrapper>
      <div className={styles.container}>
        <div className={styles.tab}>
          {Object.entries(stateDict).map(([ele, kor], index) => (
            <div key={index} className={`${styles.tabElement} ${tab === ele ? styles.active : null}`} onClick={() => setTab(ele)}>
              {kor}
            </div>
          ))}
        </div>
        <div className={styles.applicantContainer}>
          <h1 className={styles.total}>총 {applicantList.length}명</h1>
          <ul className={styles.applicantList}>
            {applicantList
              .filter(({ passState }) => passState === tab || tab === "all")
              .map(({ memberName, memberId, applicationTime, applicationId, passState, checked }, index) => (
                <label key={index} htmlFor={`id-${index}`} className={styles.applicant}>
                  <div className={styles.checkbox}>
                    <input type="checkbox" checked={checked} id={`id-${index}`} data-index={index} onChange={onClickApplicant} />
                  </div>
                  <h2 className={styles.name}>{memberName}</h2>
                  <h3 className={styles.date}>{formatting(new Date(applicationTime))}</h3>
                  <h3 className={`${styles[passState]}`}>{stateDict[passState]}</h3>
                  <Link
                    href={{
                      pathname: `/club/${clubId}/applicant/${applicationId}`,
                      query: { id: memberId },
                    }}
                  >
                    <h3 className={styles.resume}>
                      <p>상세보기</p> <Arrow />
                    </h3>
                  </Link>
                </label>
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
        <div className={styles.submit}>
          <button className={styles.submitButton} onClick={onClickTemporarySave}>
            임시 저장하기
          </button>
          <button className={styles.submitButton} onClick={onClickPermanentSave}>
            최종 완료하기
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}

export const getServerSideProps = ssrWrapper(async ({ context, userId }) => {
  const { clubid: clubId } = context.params;

  if (!userId) throw { url: "/login" };
  if (!(await isManagement(clubId, userId))) throw { url: "/manage" };

  const data = await axiosInstance.get(`/clubs/${clubId}/applications`);

  return {
    clubId,
    data: data || [],
  };
});
