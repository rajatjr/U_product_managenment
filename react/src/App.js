import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Publiclayout from "./publiclayout";
import LoginPage from "./pages/login";
import SignUp from "./pages/signup";
import Privatelayout from "./privatelayout";
import Home from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Publiclayout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="Signup" element={<SignUp />} />
        </Route>

        <Route path="/home" element={<Privatelayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
export default App;