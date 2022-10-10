import { useState } from "react";
import Layout from "@components/common/Layout";
import styles from "@styles/pages/member.module.scss";
import Option from "@public/manage/option.svg";
import Input from "@components/common/inputTemplate/Input";

export default function Member({ loginInfo }) {
  const [plusId, setPlusId] = useState("");

  const [memberList, setMemberList] = useState([
    {
      name: "이호석",
      id: "tunggary",
      rank: "회장",
    },
    {
      name: "이호석",
      id: "tunggary2",
      rank: "회장",
    },
  ]);

  const rankList = ["회장", "운영진", "부원"];

  const onClickModal = ({ target }) => {
    const rank = target.dataset.rank || target.parentNode.dataset.rank;
    const index = target.dataset.index || target.parentNode.dataset.index;

    if (!rank || !index) return;
    changeRank(rank, Number(index));
  };

  const changeRank = (newRank, index) => {
    setMemberList((prev) => {
      const newMemberData = {
        ...prev[index],
        rank: newRank,
      };
      return prev.map((member, idx) => (index === idx ? newMemberData : member));
    });
  };

  return (
    <Layout loginInfo={loginInfo} pageTitle="동아리원 보기">
      <div className={styles.memberContainer}>
        <div className={styles.top}>
          <Input id="plus" placeholder="ID로 동아리원 추가" value={plusId} onChange={(e) => setPlusId(e.target.value)} />
          <button className={styles.plusButton}>추가하기</button>
        </div>
        <div className={styles.listContainer}>
          <ul>
            {memberList.map(({ name, id, rank }, index) => (
              <div key={id} className={styles.member}>
                <h1 className={styles.name}>{name}</h1>
                <h3 className={styles.id}>{id}</h3>
                <h1 className={styles.class}>{rank}</h1>
                <div className={styles.option}>
                  <input type="checkbox" id={id} />
                  <label htmlFor={id}>
                    <Option />
                    <div className={styles.modal}>
                      {rankList
                        .filter((r) => r !== rank)
                        .map((r, idx) => (
                          <div key={idx} className={styles.modalElement} data-rank={r} data-index={index} onClick={onClickModal}>
                            <span>{r}</span>으로 변경
                          </div>
                        ))}
                    </div>
                  </label>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
