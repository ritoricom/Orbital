import { Html, Head, Main, NextScript } from "next/document";

import { Favicon } from "@/lib/meta";

const Document = () => (
  <Html prefix="og: http://ogp.me/ns#">
    <Head>
      <meta charSet="utf-8" />
      <Favicon />
    </Head>
    <body>
      <Main />
      <NextScript />
      {/* this container needs to show modal*/}
      <div id="modal" />
    </body>
  </Html>
);

export default Document;
