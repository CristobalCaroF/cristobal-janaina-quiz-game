import { useState } from "react";
// import GlobalStyle from "../styles.js";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }) {
  const [userId, setUserId] = useState("");

  return (
    <SWRConfig>
      {/* <GlobalStyle /> */}
      <Component
        {...pageProps}
        userId={userId}
        onLogin={(userId) => {
          setUserId(userId);
        }}
      />
    </SWRConfig>
  );
}
