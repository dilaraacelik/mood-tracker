import MainPage from "./components/MainPage";
import Sidebar from "./components/Sidebar";
import Title from "./components/Navbar";

export default function Home() {
  return (
    <>
    <div>
      <Title/> 
      <div className="flex h-screen">
        <div className="w-1/4 border-r border-gray-300 bg-white py-6">
            <Sidebar/>
        </div>
        <div className="w-3/4 bg-gray-50 py-6">
            <MainPage/>
        </div>
      </div>
    </div>
    </>

  );
}
