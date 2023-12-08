import { Route, Routes } from "react-router-dom";

import Files from "../components/DashboardComponent/Files";
import Sidebar from "../components/DashboardComponent/Sidebar";
import Upload from "../components/DashboardComponent/Upload";
import Upgrade from "../components/DashboardComponent/Upgrade";
import TopSidebar from "../components/DashboardComponent/TopSidebar";
import MobileNavigation from "../components/DashboardComponent/MobileNavigation";
import { useState } from "react";
import Account from "../components/DashboardComponent/Account";
import FilePreviewPage from "./FilePreviewPage";
import Please from "../components/DashboardComponent/Please";

function DashboardPage() {
  const [mobileNavVisible, setMobileNavVisible] = useState(false);
  const [accountNavVisible, setAccountNavVisible] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavVisible(!mobileNavVisible);
  };

  const toggleAccountNav = () => {
    setAccountNavVisible(!accountNavVisible);
  };
  return (
    <div>
      <div className="hidden md:block h-full md:w-64 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <TopSidebar
        toggleMobileNav={toggleMobileNav}
        toggleAccountNav={toggleAccountNav}
      />
      {mobileNavVisible && (
        <MobileNavigation toggleMobileNav={toggleMobileNav} />
      )}
      {accountNavVisible && (
        <div className="mt-16 border h-full md:w-72 flex-col fixed inset-y-0 right-0 z-50">
          <Account toggleAccountNav={toggleAccountNav} />
        </div>
      )}

      {/* Mobile Sidebar */}

      <div className="md:ml-64">
        <Routes>
          <Route index element={<Files />}></Route>
          <Route path="upload" element={<Upload />}></Route>
          <Route path="upgrade" element={<Upgrade />}></Route>
          <Route path="file-preview/" element={<Please />}></Route>
          <Route path="file-preview/:id" element={<FilePreviewPage />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default DashboardPage;
