import LandingPage from "./pages/LandingPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

import Please from "./components/DashboardComponent/Please";
import FileViewPage from "./pages/FileViewPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/dashboard/*" element={<DashboardPage />}></Route>
        <Route path="/f/:id" element={<FileViewPage />}></Route>
        <Route path="*" element={<Please />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
