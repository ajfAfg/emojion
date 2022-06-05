import { Editor } from "@/components/Editor";
import { Header } from "@/components/Header";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Header />

      <main className="my-12">
        <Editor />
      </main>
    </>
  );
};

export default Home;
