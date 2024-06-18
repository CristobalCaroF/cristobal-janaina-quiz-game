import friendsTheme from "@/themes/friendsTheme.js";
import { ThemeProvider } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import GlobalStyle from "../styles.js";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <SWRConfig>
        <GlobalStyle />
        <ThemeProvider theme={friendsTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </SWRConfig>
    </SessionProvider>
  );
}
