import cookie from "cookie";

export function ProtectedPage(gssp) {
  return async (ctx) => {
    const { req } = ctx;
    const hCookie = req.headers.cookie;
    if (hCookie) {
      const { access } = cookie.parse(hCookie);

      if (access) {
        return await gssp(ctx);
      } else {
        return {
          redirect: {
            permanent: false,
            destination: "/",
          },
        };
      }
    } else {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }
  };
}
