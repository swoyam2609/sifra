import { Outlet } from "react-router-dom";
import Loading from "./_root/layouts/Loading";
import { Suspense } from "react";

const App = () => {
  return (
    <div id="App" className="bg-black1 text-white">
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default App;
