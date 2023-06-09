import { type NextPage } from "next";
import Head from "next/head";

import Todos from "@/components/Todos";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-white">
        <NavBar />
        <Todos />
      </main>
      <Footer />
    </>
  );
};

export default Home;

