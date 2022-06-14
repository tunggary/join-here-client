import "../styles/global.scss";
import cookies from "next-cookies";
import jwt from "jsonwebtoken";

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const { joinhere } = cookies(ctx);

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  pageProps = {
    ...pageProps,
    loginInfo: {
      isLoggedIn: joinhere ? true : false,
      userName: joinhere ? jwt.decode(joinhere).name.toString() : "조인히어",
    },
  };

  return { pageProps };
};
