import GlobalStyle from "../styles.js";
import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <SWRConfig value={{ fetcher }}>
        <GlobalStyle />
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </SWRConfig>
    </SessionProvider>
  );
}
