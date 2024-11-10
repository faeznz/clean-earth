import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/user/Sidebar";
import Header from "../components/dashboard/user/Header";
import Auth from "../middleware/Auth";
import User from "../middleware/User";

const DashboardUserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Auth>
      <User>
        <div className='flex h-screen overflow-hidden'>
          {/* Sidebar */}

          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/*  Site header */}

          <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <Outlet setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
          </div>
        </div>
      </User>
    </Auth>
  );
};

export default DashboardUserLayout;
