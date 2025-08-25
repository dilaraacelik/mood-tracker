import MainPage from "../../components/MainPage";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function Home() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-slate-50 to-gray-100">
      <Navbar/> 
      <div className="flex flex-1 h-full">
        <div className="w-1/3 bg-white/80 backdrop-blur-sm border-r border-gray-200 shadow-lg">
            <Sidebar/>
        </div>
        <div className="w-2/3 bg-gradient-to-br from-gray-50 to-white">
            <MainPage/>
        </div>
      </div>
    </div>
  );
}
