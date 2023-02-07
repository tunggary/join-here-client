import { useRouter } from "next/router";
import { isManagement } from "@utils/util";
import ssrWrapper from "@utils/wrapper";
import axiosInstance from "@utils/axios";
import PageWrapper from "@components/common/PageWrapper";
import TemplateWrapper from "@components/common/Template/TemplateWrapper";
import Form from "@components/common/Form";

export default function Resume({ data }) {
  const router = useRouter();

  return (
    <PageWrapper>
      <TemplateWrapper>
        <Form onSubmit={router.back}>
          <h2>지원서</h2>
          {data.map(({ questionId, questionContent, answerContent }) => (
            <Form.Text key={questionId} title={questionContent} value={answerContent} readonly />
          ))}
          <Form.Submit>목록으로</Form.Submit>
        </Form>
      </TemplateWrapper>
    </PageWrapper>
  );
}

export const getServerSideProps = ssrWrapper(async ({ context, userId }) => {
  const { applicationid: applicationId, clubid: clubId } = context.params;
  const { id: resumeId } = context.query;

  if (!userId) throw { url: "/login" };
  if (!(await isManagement(clubId, userId)) && userId !== resumeId) throw { url: "/manage" };

  const data = await axiosInstance.get(`/members/${resumeId}/applications/${applicationId}`);

  return { data: data || [] };
});
