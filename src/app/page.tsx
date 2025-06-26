import MainPage from "./components/MainPage";
import Sidebar from "./components/Sidebar";
import Title from "./components/Navbar";

export default function Home() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Title/> 
      <div className="flex flex-1 h-full">
        <div className="w-1/4 border-r border-gray-300 bg-white">
            <Sidebar/>
        </div>
        <div className="w-3/4 bg-gray-50">
            <MainPage/>
        </div>
      </div>
    </div>
  );
}
