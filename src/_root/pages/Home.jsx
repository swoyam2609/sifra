import { FloatingNav } from "../layouts/Home/FloatingHeader";
import Header from "../layouts/Home/Header";
import Hero from "../layouts/Home/Hero";

const Home = () => {
  return (
    <>
      <Header />
      <FloatingNav />
      <Hero />
      <div className="min-h-dvh bg-black1"></div>
    </>
  );
};

export default Home;
