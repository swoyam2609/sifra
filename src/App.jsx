import { Outlet } from "react-router-dom";
import Loading from "./_root/layouts/Loading";
import { Suspense } from "react";

const App = () => {
  return (
    <div id="App">
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default App;
