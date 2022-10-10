import { useState } from "react";
import Layout from "@components/common/Layout";
import Form from "@components/common/inputTemplate/Form";
import Title from "@components/common/inputTemplate/Title";
import Input from "@components/common/inputTemplate/Input";

export default function Apply({ loginInfo }) {
  const [resume, setResume] = useState({
    resume1: {
      question: "이름",
      answer: "",
    },
    resume2: {
      question: "연락처",
      answer: "",
    },
    resume3: {
      question: "학번",
      answer: "",
    },
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setResume((prev) => {
      return {
        ...prev,
        [name]: {
          question: prev[name].question,
          answer: value,
        },
      };
    });
  };
  return (
    <Layout loginInfo={loginInfo} pageTitle="동아리 지원하기">
      <Form>
        <Title>지원서 작성</Title>
        {Object.entries(resume).map(([id, { question, answer }]) => (
          <Input key={id} id={id} label={question} value={answer} onChange={onChange} />
        ))}
      </Form>
    </Layout>
  );
}
