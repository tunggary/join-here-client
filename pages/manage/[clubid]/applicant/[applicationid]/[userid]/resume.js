import { useRouter } from "next/router";
import axios from "axios";
import cookies from "next-cookies";
import Layout from "@components/common/Layout";
import Form from "@components/common/inputTemplate/Form";
import Title from "@components/common/inputTemplate/Title";
import Input from "@components/common/inputTemplate/Input";
import { isManagement } from "@utils/util";
import ssrWrapper from "@utils/wrapper";

export default function Resume({ loginInfo, data, clubId }) {
  const { push } = useRouter();

  const backToList = () => {
    push(`/manage/${clubId}/applicant`);
  };
  return (
    <Layout loginInfo={loginInfo} pageTitle="지원자 상세보기">
      <Form onClick={backToList} button="목록으로 돌아가기">
        <Title>지원서</Title>
        {data.map(({ questionId, questionContent, answerContent }) => (
          <Input key={questionId} id={questionId} label={questionContent} value={answerContent} readOnly />
        ))}
      </Form>
    </Layout>
  );
}

export const getServerSideProps = ssrWrapper(async ({ context, userId }) => {
  const { userid: resumeId, applicationid: applicationId, clubid: clubId } = context.params;

  if (!userId) throw { url: "/login" };
  if (!(await isManagement(clubId, userId)) && userId !== resumeId) throw { url: "/manage" };

  const { data } = await axios.get(`http://3.36.36.87:8080/members/${resumeId}/applications/${applicationId}`);

  return {
    clubId,
    data: data || [],
  };
});
