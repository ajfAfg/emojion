import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Editor } from "@/features/Editor";
import { Header } from "@/features/Header";
import { Footer } from "@/features/Footer";

type Props = {
  host: string;
  emoji: string;
  text: string;
};

const Home: NextPage<Props> = (props) => {
  const [imageUrl, setImageUrl] = useState(
    `https://${props.host}/api/og?emoji=${props.emoji}&text=${props.text}`
  );
  const imageAlt = `${props.emoji}: ${props.text}`;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setImageUrl(
        `${window.location.origin}/api/og?emoji=${props.emoji}&text=${props.text}`
      );
    }
  }, [props]);

  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:title" content="Emojion" />
        <meta
          property="og:description"
          content="Create and share images combined emoji and text"
        />
        <meta property="og:image" content={imageUrl}></meta>
        <meta property="og:image:alt" content={imageAlt}></meta>
      </Head>

      <Header />

      <main className="my-12">
        <Editor />
      </main>

      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
  query,
}) => {
  const [emoji, text] = [query.emoji, query.text].map((v) => {
    if (Array.isArray(v)) {
      return v[0];
    } else if (typeof v === "undefined") {
      return "";
    } else {
      return v;
    }
  });
  return { props: { host: req.headers.host ?? "", emoji, text } };
};

export default Home;
