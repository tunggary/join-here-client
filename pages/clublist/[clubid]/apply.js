import { useState } from "react";
import { useRouter } from "next/router";
import ssrWrapper from "@utils/wrapper";
import axiosInstance from "@utils/axios";
import PageWrapper from "@components/common/PageWrapper";
import TemplateWrapper from "@components/common/Template/TemplateWrapper";
import { useForm } from "@hooks/useForm";
import Form from "@components/common/Form";

export default function Apply({ data, userId, clubId }) {
  const { push } = useRouter();

  const { value, onChange } = useForm(
    data.reduce((prev, { questionId, content }) => ({ ...prev, [questionId]: { answerContent: "", content } }), {}),
    (e) => ({ answerContent: e.target.value, content: e.target.dataset.content })
  );

  const onSubmit = async () => {
    const submitData = Object.entries(value).map(([questionId, { answerContent }]) => ({ answerContent, questionId, memberId: userId }));

    if (confirm("해당 지원서를 지원하겠습니까?")) {
      try {
        await axiosInstance.post(`/announcements/${clubId}/answers`, submitData);
        alert("해당 지원서를 성공적으로 지원했습니다.");
        push("/mypage");
      } catch (error) {
        alert("지원에 실패했습니다. 잠시후 다시 시도해주세요.");
      }
    }
  };

  return (
    <PageWrapper pageTitle="지원서 작성">
      <TemplateWrapper>
        <Form onSubmit={onSubmit}>
          <h2>지원서 양식</h2>
          {Object.entries(value).map(([questionId, { answerContent, content }]) => (
            <Form.Text key={questionId} name={questionId} value={answerContent} onChange={onChange} title={content} data-content={content} multiline />
          ))}
          <Form.Submit>지원하기</Form.Submit>
        </Form>
      </TemplateWrapper>
    </PageWrapper>
  );
}

export const getServerSideProps = ssrWrapper(async ({ userId, context }) => {
  if (!userId) {
    throw { url: "/login" };
  }
  const { clubid: clubId } = context.params;
  const data = await axiosInstance.get(`/announcements/${clubId}/questions`);
  return {
    userId,
    clubId,
    data: data || [],
  };
});
