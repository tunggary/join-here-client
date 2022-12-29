import PageWrapper from "@components/common/PageWrapper";
import Banner from "@components/home/Banner";
import Category from "@components/home/Category";

export default function Home() {
  return (
    <PageWrapper theme="white">
      <Banner />
      <Category />
    </PageWrapper>
  );
}
