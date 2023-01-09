import { useState } from "react";
import styles from "@styles/pages/member.module.scss";
import ssrWrapper from "@utils/wrapper";
import { isMember, isManagement } from "@utils/util";
import axiosInstance from "@utils/axios";
import PageWrapper from "@components/common/PageWrapper";
import MemberTemplate from "@components/common/Template/Member";
import User from "@components/Manage/User";

export default function Member({ userId, data, clubId }) {
  const [memberList, setMemberList] = useState(data);

  const getMyPosition = (memberList) => {
    for (const { memberId, position } of memberList) {
      if (memberId === userId) return position;
    }
    return null;
  };
  const [myPosition, setMyPosition] = useState(getMyPosition(data));

  const updateMember = (newMemberList) => {
    if (newMemberList === null) return;
    setMemberList(newMemberList);
    setMyPosition(getMyPosition(newMemberList));
  };

  const onClickModal = ({ currentTarget }) => {
    const element = currentTarget.dataset.element;
    const memberId = currentTarget.dataset.memberid;
    const newPosition = currentTarget.dataset.position;

    switch (element) {
      case "delete":
        onSubmitDeleteMember(memberId);
        break;
      case "change":
        onSubmitChangePosition(newPosition, memberId);
        break;
    }
  };

  const onSubmitDeleteMember = async (memberId) => {
    try {
      const data = await axiosInstance.delete(`/clubs/${clubId}/belongs`, {
        data: {
          belongId: memberList.find((member) => member.memberId === memberId).belongId,
        },
      });
      updateMember(data);
    } catch {
      alert("회원을 내보낼 수 없습니다.");
    }
  };

  const onSubmitChangePosition = async (newPosition, memberId) => {
    try {
      const data = await axiosInstance.patch(`/clubs/${clubId}/belongs`, {
        belongId: memberList.find((member) => member.memberId === memberId).belongId,
        position: newPosition,
      });
      updateMember(data);
    } catch {
      alert("직책을 변경할 수 없습니다.");
    }
  };

  const onSubmitUserId = async (input) => {
    try {
      const data = await axiosInstance.post(`/clubs/${clubId}/belongs`, {
        memberId: input,
      });
      updateMember(data);
    } catch {
      alert("해당 ID가 존재하지 않습니다.");
    }
  };
  console.log(memberList);
  return (
    <PageWrapper>
      <div className={styles.memberContainer}>
        {isManagement(clubId, userId) && <MemberTemplate onSubmit={onSubmitUserId} />}
        <div className={styles.listContainer}>
          {memberList.map((data) => (
            <User key={data.memberId} {...data} isOption={myPosition === "pre"} onClickModal={onClickModal} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

export const getServerSideProps = ssrWrapper(async ({ context, userId }) => {
  const { clubid: clubId } = context.params;

  if (!userId) throw { url: "/login" };
  if (!isMember(clubId, userId)) throw { url: "/manage" };

  const data = await axiosInstance.get(`/clubs/${clubId}/belongs`);

  return {
    userId,
    clubId,
    data: data || [],
  };
});
