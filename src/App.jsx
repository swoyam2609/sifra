import { Outlet } from "react-router-dom";
import Loading from "./_root/layouts/Loading";
import { Suspense, useEffect } from "react";
import LocomotiveScroll from "locomotive-scroll";

const App = () => {
  const locomotiveScroll = new LocomotiveScroll();

  useEffect(() => {
    if (locomotiveScroll) {
      console.log("Locomotive Scroll is running");
    }
  }, []);

  return (
    <div id="App" className="bg-black1 text-white">
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default App;
