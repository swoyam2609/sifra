import { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard | Sifra";
  }, []);

  return (
    <div className="w-full h-full min-h-dvh bg-black2 text-white grid place-content-center">
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
