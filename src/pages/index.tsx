import { Editor } from "@/components/Editor";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Header />

      <main className="my-12">
        <Editor />
      </main>

      <Footer />
    </>
  );
};

export default Home;
