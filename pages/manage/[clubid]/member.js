import { useState } from "react";
import Layout from "@components/common/Layout";
import styles from "@styles/pages/member.module.scss";
import Option from "@public/manage/option.svg";
import Input from "@components/common/inputTemplate/Input";
import axios from "axios";

export default function Member({ loginInfo, data, clubId }) {
  const [plusId, setPlusId] = useState("");
  const [memberList, setMemberList] = useState(data);

  const getMyPosition = (memberList) => {
    for (const { memberId, position } of memberList) {
      if (memberId === loginInfo.userName) return position;
    }
    return null;
  };
  const [myPosition, setMyPosition] = useState(getMyPosition(data));

  const positionList = {
    pre: "회장",
    man: "매니저",
    nor: "부원",
  };

  const onClickAddButton = async () => {
    const newMemberList = await addMember(plusId);
    if (newMemberList === null) return setPlusId("");
    updateMember(newMemberList);
  };

  const onClickModal = async ({ target }) => {
    const position = target.dataset.position || target.parentNode.dataset.position;
    const index = target.dataset.index || target.parentNode.dataset.index;

    if (!position || !index) return;
    const newMemberList = await changePosition(position, Number(index));
    updateMember(newMemberList);
  };

  const onClickDelete = async ({ target }) => {
    const index = target.dataset.index;
    const newMemberList = await deleteMember(index);
    updateMember(newMemberList);
  };

  const updateMember = (newMemberList) => {
    if (newMemberList === null) return;
    setMemberList(newMemberList);
    setMyPosition(getMyPosition(newMemberList));
  };

  const deleteMember = async (index) => {
    try {
      const { data } = await axios.delete(`http://3.36.36.87:8080/clubs/${clubId}/belong`, {
        data: {
          belongId: memberList[index].belongId,
        },
      });
      return data;
    } catch (error) {
      alert("회장은 최소 1명 이상입니다");
      return null;
    }
  };

  const addMember = async (memberId) => {
    try {
      const { data } = await axios.post(`http://3.36.36.87:8080/clubs/${clubId}/belong`, {
        memberId,
      });
      return data;
    } catch (error) {
      alert("해당 ID가 존재하지 않습니다.");
      return null;
    }
  };

  const changePosition = async (newPosition, index) => {
    try {
      const { data } = await axios.patch(`http://3.36.36.87:8080/clubs/${clubid}/belong`, {
        belongId: memberList[index].belongId,
        position: newPosition,
      });
      return data;
    } catch (error) {
      alert("회장은 최소 1명 이상이어야 합니다.");
      return null;
    }
  };

  return (
    <Layout loginInfo={loginInfo} pageTitle="동아리원 보기">
      <div className={styles.memberContainer}>
        {myPosition === "pre" || myPosition === "man" ? (
          <div className={styles.top}>
            <Input id="plus" placeholder="ID로 동아리원 추가" value={plusId} onChange={(e) => setPlusId(e.target.value)} />
            <button className={styles.plusButton} onClick={onClickAddButton}>
              추가하기
            </button>
          </div>
        ) : null}
        <div className={styles.listContainer}>
          <ul>
            {memberList.map(({ memberName, memberId, position }, index) => (
              <div key={memberId} className={styles.member}>
                <h1 className={styles.name}>{memberName}</h1>
                <h3 className={styles.id}>{memberId}</h3>
                <h1 className={styles.class}>{positionList[position]}</h1>
                {myPosition === "pre" && (
                  <div className={styles.option}>
                    <input type="checkbox" id={memberId} />
                    <label htmlFor={memberId}>
                      <Option />
                      <div className={styles.modal}>
                        {Object.keys(positionList)
                          .filter((p) => p !== position)
                          .map((p, idx) => (
                            <div key={idx} className={styles.modalElement} data-position={p} data-index={index} onClick={onClickModal}>
                              <span>{positionList[p]}</span>으로 변경
                            </div>
                          ))}
                        {position !== "pre" && (
                          <div className={`${styles.modalElement} ${styles.error}`} data-index={index} onClick={onClickDelete}>
                            동아리 내보내기
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                )}
              </div>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { clubId } = ctx.params;
  const { data } = await axios.get(`http://3.36.36.87:8080/clubs/${clubId}/belongs`);

  return {
    props: {
      clubId,
      data: data || [],
    },
  };
}
