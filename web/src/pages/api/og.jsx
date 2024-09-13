import { ImageResponse } from "@vercel/og";

import { isNonNullable } from "@/utils/equals";
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from "@/config/og";

const rosatomBoldFontPromise = fetch(
  new URL("../../assets/fonts/Rosatom-Bold.woff", import.meta.url)
).then((res) => res.arrayBuffer());

const handler = async (req) => {
  const rosatomBoldFont = await rosatomBoldFontPromise;
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title");
  if (!isNonNullable(title)) {
    return new Response("title in search params must be required", {
      status: 400,
    });
  }

  const logo = searchParams.get("logo");
  if (!isNonNullable(logo)) {
    return new Response("logo in search params must be required", {
      status: 400,
    });
  }

  const subtitle = searchParams.get("subtitle");
  if (!isNonNullable(subtitle)) {
    return new Response("subtitle in search params must be required", {
      status: 400,
    });
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
          height: "100%",
          padding: "60px 0 86px",
          backgroundColor: "#D1A96E",
        }}
      >
        <div
          style={{
            margin: 0,
            fontFamily: '"Rosatom"',
            fontSize: "28px",
            fontWeight: 700,
            lineHeight: "140%",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textAlign: "center",
            color: "#FFFFFF",
          }}
        >
          {logo}
        </div>
        <div
          style={{
            margin: "138px 0 0",
            fontFamily: '"Rosatom"',
            fontSize: "90px",
            fontWeight: 700,
            lineHeight: "106%",
            textAlign: "center",
            color: "#FFFFFF",
          }}
        >
          {title}
        </div>
        <hr
          style={{
            margin: "50px 0",
            width: "750px",
            borderTop: "2px solid rgba(255, 255, 255, 0.4)",
          }}
        />
        <div
          style={{
            margin: 0,
            maxWidth: "750px",
            fontFamily: '"Rosatom"',
            fontSize: "36px",
            fontWeight: 700,
            lineHeight: "120%",
            textAlign: "center",
            color: "#FFFFFF",
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    {
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      fonts: [
        {
          name: "Rosatom",
          data: rosatomBoldFont,
          style: "normal",
        },
      ],
    }
  );
};

export const config = {
  runtime: "experimental-edge",
};

export default handler;
