import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import ThemeToggle from "./Components/ThemeToggle/ThemeToggle";

function App() {
  return (
    <>
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
