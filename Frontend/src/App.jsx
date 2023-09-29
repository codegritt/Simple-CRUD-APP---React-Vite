import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Edit from "./components/Edit";
import Header from "./components/Header";
import Loader from "./reusableComponents/Loader/Loader";
function App() {
  return (
    <>
      <div className="bg-[#e5e7eb] h-screen bg-gradient-to-r from-gray-300">
        <Loader />
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
