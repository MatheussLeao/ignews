import { PrismicPreview } from "@prismicio/next";
import { PrismicProvider } from "@prismicio/react";
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Link from "next/link";
import { Header } from "../components/Header";
import { linkResolver, repositoryName } from "../services/prismic";
import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <PrismicProvider
        linkResolver={linkResolver}
        internalLinkComponent={({ href, ...props }) => (
          <Link href={href}>
            <a {...props} />
          </Link>
        )}
      >
        <PrismicPreview repositoryName={repositoryName}>
          <Header />
          <Component {...pageProps} />
        </PrismicPreview>
      </PrismicProvider>
    </NextAuthProvider>
  );
}

export default MyApp;
