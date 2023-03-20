import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Editor } from "@/components/Editor";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useEmojiState } from "@/hooks/useEmojiState";
import { useTextState } from "@/hooks/useTextState";

const Home: NextPage = () => {
  const [url, setUrl] = useState("");
  const emoji = useEmojiState()[0];
  const text = useTextState()[0];

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(`${window.location.origin}/api/og?emoji=${emoji}&text=${text}`);
    }
  }, [emoji, text]);

  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@ajfAfg" />
        <meta name="twitter:title" content="Emojion" />
        <meta
          name="twitter:description"
          content="Create and share images combined emoji and text"
        />
        <meta name="twitter:image" content={url}></meta>
        <meta name="twitter:image:alt" content={`${emoji}: ${text}`}></meta>
      </Head>

      <Header />

      <main className="my-12">
        <Editor />
      </main>

      <Footer />
    </>
  );
};

export default Home;
