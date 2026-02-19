import "./App.css";
import { Outlet, useNavigation } from "react-router-dom"; // 1. Imported useNavigation
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import ThemeToggle from "./Components/ThemeToggle/ThemeToggle";

function App() {
  const navigation = useNavigation();

  return (
    <>
      {navigation.state === "loading" && (
        <div className="fixed top-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.7)] z-[9999] animate-pulse"></div>
      )}

      <Header></Header>
      <main>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
      <ThemeToggle></ThemeToggle>
    </>
  );
}

export default App;
