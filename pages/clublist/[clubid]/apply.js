import { useState } from "react";
import Layout from "@components/common/Layout";
import Form from "@components/common/inputTemplate/Form";
import Title from "@components/common/inputTemplate/Title";
import Input from "@components/common/inputTemplate/Input";
import axios from "axios";
import { useRouter } from "next/router";
import ssrWrapper from "@utils/wrapper";

export default function Apply({ loginInfo, data, userId, clubId }) {
  const { push } = useRouter();
  const [resume, setResume] = useState(
    data.map((resumeData) => {
      return { ...resumeData, memberId: userId, answerContent: "" };
    })
  );

  const onChange = (e) => {
    const { name, value, id } = e.target;
    setResume((prev) => {
      const newResumeData = {
        questionId: Number(id),
        content: name,
        memberId: userId,
        answerContent: value,
      };

      return prev.map((data) => (data.questionId === Number(id) ? newResumeData : data));
    });
  };

  const onSubmit = async () => {
    const submitData = resume.map(({ questionId, memberId, answerContent }) => {
      return { questionId, memberId, answerContent };
    });
    if (confirm("해당 지원서를 지원하겠습니까?")) {
      try {
        await axios.post(`http://3.36.36.87:8080/announcements/${clubId}/answers`, submitData);
        alert("해당 지원서를 성공적으로 지원했습니다.");
        push("/clublist?tab=all");
      } catch (error) {
        alert("지원에 실패했습니다. 잠시후 다시 시도해주세요.");
      }
    }
  };
  return (
    <Layout loginInfo={loginInfo} pageTitle="동아리 지원하기">
      <Form onClick={onSubmit} button="지원하기">
        <Title>지원서 작성</Title>
        {resume.map(({ questionId, content, answerContent }) => (
          <Input key={questionId} id={questionId} name={content} label={content} value={answerContent} onChange={onChange} />
        ))}
      </Form>
    </Layout>
  );
}

export const getServerSideProps = ssrWrapper(async ({ userId, context }) => {
  if (!userId) {
    throw { url: "/login" };
  }
  const { clubid: clubId } = context.params;
  const { data } = await axios.get(`http://3.36.36.87:8080/announcements/${clubId}/questions`);
  return {
    userId,
    clubId,
    data: data || [],
  };
});
