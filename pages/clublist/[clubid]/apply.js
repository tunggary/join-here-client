import { useState } from "react";
import Layout from "@components/common/Layout";
import Form from "@components/common/inputTemplate/Form";
import Title from "@components/common/inputTemplate/Title";
import Input from "@components/common/inputTemplate/Input";
import axios from "axios";

export default function Apply({ loginInfo, data }) {
  const [resume, setResume] = useState(
    data.map((resumeData) => {
      return { ...resumeData, answer: "" };
    })
  );

  const onChange = (e) => {
    const { name, value, id } = e.target;
    setResume((prev) => {
      const newResumeData = {
        questionId: Number(id),
        content: name,
        answer: value,
      };

      return prev.map((data) => (data.questionId === Number(id) ? newResumeData : data));
    });
  };
  return (
    <Layout loginInfo={loginInfo} pageTitle="동아리 지원하기">
      <Form>
        <Title>지원서 작성</Title>
        {resume.map(({ questionId, content, answer }) => (
          <Input key={questionId} id={questionId} name={content} label={content} value={answer} onChange={onChange} />
        ))}
      </Form>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { clubid } = ctx.params;
  const { data } = await axios.get(`http://3.36.36.87:8080/announcements/${clubid}/questions`);
  console.log(data);
  return {
    props: {
      data: data || [],
    },
  };
}
