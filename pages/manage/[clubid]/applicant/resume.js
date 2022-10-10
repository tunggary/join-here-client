import Layout from "../../../../components/common/Layout";
import Form from "../../../../components/common/inputTemplate/Form";
import Title from "../../../../components/common/inputTemplate/Title";
import Input from "../../../../components/common/inputTemplate/Input";

export default function Resume({ loginInfo }) {
  return (
    <Layout loginInfo={loginInfo} pageTitle="지원자 상세보기">
      <Form>
        <Title>지원서</Title>
        <Input id="name" label="이름" value="정석환" readOnly />
        <Input id="birth" label="생년월일" value="970802" readOnly />
        <Input id="question1" label="학과" value="컴퓨터공학과asdfasdfasdfasdfa sdfasdfasdfasdfasdfasdfasdf" readOnly />
        <Input id="question2" label="학번" value="B0000000" readOnly />
      </Form>
    </Layout>
  );
}
