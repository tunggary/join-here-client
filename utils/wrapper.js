import { INTERNAL_SERVER_ERROR_PAGE } from "@utils/constant";
import cookies from "next-cookies";

const isErrorRedirectable = (error) => {
  return typeof error === "object" && Object.prototype.hasOwnProperty.call(error, "url");
};

const ssrWrapper = (callback) => {
  return async (context) => {
    let returnData = {
      props: {
        isLoggedIn: false,
        userId: null,
      },
    };
    try {
      const { user_id: userId } = cookies(context);
      if (userId) {
        returnData.props.isLoggedIn = true;
        returnData.props.userId = userId;
      }
      returnData.props = { ...returnData.props, ...(await callback({ userId, context })) };
      return returnData;
    } catch (error) {
      const redirectUrl = isErrorRedirectable(error) ? error.url : INTERNAL_SERVER_ERROR_PAGE;
      return {
        redirect: {
          destination: redirectUrl,
          permanent: false,
        },
      };
    }
  };
};

export default ssrWrapper;
