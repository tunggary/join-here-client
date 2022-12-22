import { useState } from "react";
import Apply from "@public/clublist/apply.svg";
import axiosInstance from "@utils/axios";

export default function Reply({ clubId, memberId, questionId, setQnaList }) {
  const [reply, setReply] = useState("");
  const submitReply = async () => {
    try {
      const { data } = await axiosInstance.post(`/clubs/${clubId}/qnas/answers`, {
        memberId,
        questionId,
        answerContent: reply,
      });
      setQnaList(data);
      setReply("");
    } catch (error) {
      alert("다시 시도해주세요");
    }
  };
  return (
    <>
      <Apply />
      <input type="text" value={reply} placeholder="대댓글을 입력하세요" onChange={(e) => setReply(e.target.value)} />
      <button type="button" onClick={submitReply}>
        댓글달기
      </button>
    </>
  );
}
