import parser from "ua-parser-js";

export const getMediaContext = (ctx) => {
  const {
    device: { type: deviceType },
  } = parser(ctx.req?.headers["user-agent"]);

  switch (deviceType) {
    case "mobile":
      return {
        width: 479,
      };
    case "tablet":
      return {
        width: 1023,
      };
    default:
      return {
        width: 1440,
      };
  }
};
