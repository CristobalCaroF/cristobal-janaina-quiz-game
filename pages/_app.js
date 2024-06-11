import { useState } from "react";
// import GlobalStyle from "../styles.js";
import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <SWRConfig>
        {/* <GlobalStyle /> */}
        <Component {...pageProps} />
      </SWRConfig>
    </SessionProvider>
  );
}
