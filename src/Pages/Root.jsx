import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import ThemeToggle from "../Components/ThemeBtn";

const Root = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <div className="fixed bottom-5 right-4 z-50">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Root;
