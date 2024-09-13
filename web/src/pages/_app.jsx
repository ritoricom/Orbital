import { useState } from "react";
import Router from "next/router";
import NextApp from "next/app";
import withYM from "next-ym";
import { appWithTranslation } from "next-i18next";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import "@splidejs/react-splide/css";

import { YM_CODE } from "@/config/ym";
import { getMediaContext, MediaProvider } from "@/lib/media";
import { CookieNotify } from "@/lib/cookie-notify";
import { isNonNullable } from "@/utils/equals";

import "@/styles/main.css";

const _App = ({ Component, pageProps, media }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <MediaProvider media={media}>
          <CookieNotify />
          <Component {...pageProps} />
        </MediaProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

const AppWithYM = isNonNullable(YM_CODE) ? withYM(YM_CODE, Router)(_App) : _App;

const App = appWithTranslation(AppWithYM);

App.getInitialProps = async (appCtx) => {
  const mediaCtx = getMediaContext(appCtx.ctx);
  const appProps = await NextApp.getInitialProps(appCtx);

  return {
    ...appProps,
    media: mediaCtx,
  };
};

export default App;
