import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./views/dashboard";
import Sidebar from "./components/sidebar";
import DHSmain from "./common-screens/home";
import Content from "./common-screens/content";
import BannerContent from "./common-screens/banner-content";
import BannerContentMultipleImage from "./common-screens/banner-content-multipleImage";
import BoardManagement from "./common-screens/board-of-management";
import Login from "./auth/login";
import ContentImageHeading from "./common-screens/content-image-heading";
import FAQs from "./common-screens/faq";
import AddFAQs from "./common-screens/addFaq";
import ProtectedRoute from "./utils/protectedRoutes";
import UserManagement from "./views/user-management";
import ManagementList from "./common-screens/management-list";
import LeadershipList from "./common-screens/leadership-list";
import Leadership from "./common-screens/leadership";
import Enquiry from "./views/enquiry";
import InfrastructureList from "./common-screens/infrastructure-list";
import InfrastrucureAdd from "./common-screens/infrastructure";

function AppContent() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/login";
  const path = location.pathname;
  const extractedPath = path.split("/")[1];
  const accessRights = localStorage.getItem("access") ? localStorage.getItem("access").split(",") : [];

  // if (!accessRights.includes(extractedPath) && extractedPath !== "login") {
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <div className="d-flex">
      {!hideSidebar && <Sidebar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        {accessRights.includes("user-management") && (
          <Route path="/user-management" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
          )}
        {accessRights.includes("enquiry") && (
          <Route path="/enquiry" element={<ProtectedRoute><Enquiry /></ProtectedRoute>} />
        )} 
        
        {accessRights.includes("dhs-main") && (
          <>
            <Route path="/dhs-main" element={<ProtectedRoute><DHSmain /></ProtectedRoute>} />
            <Route path="/dhs-main/content/:id" element={<ProtectedRoute><Content /></ProtectedRoute>} />
            <Route path="/dhs-main/banner-content/:id" element={<ProtectedRoute><BannerContent /></ProtectedRoute>} />
            <Route path="/dhs-main/banner-content-image/:id" element={<ProtectedRoute><BannerContentMultipleImage /></ProtectedRoute>} />
            <Route path="/dhs-main/board-of-management-list" element={<ProtectedRoute><ManagementList /></ProtectedRoute>} />
            <Route path="/dhs-main/board-of-management/:id" element={<ProtectedRoute><BoardManagement /></ProtectedRoute>} />
          </>
        )}

        {/* DHS Gurugram */}
        {accessRights.includes("dhs-gurugram") && (
          <>
            <Route path="/dhs-gurugram" element={<ProtectedRoute><DHSmain/></ProtectedRoute>} />
            <Route path="/dhs-gurugram/content/:id" element={<ProtectedRoute><Content/></ProtectedRoute>} />
            <Route path="/dhs-gurugram/banner-content/:id" element={<ProtectedRoute><BannerContent /></ProtectedRoute>} />
            <Route path="/dhs-gurugram/banner-content-image/:id" element={<ProtectedRoute><BannerContentMultipleImage /></ProtectedRoute>} />
            <Route path="/dhs-gurugram/board-of-management-list" element={<ProtectedRoute><ManagementList /></ProtectedRoute>} />
            <Route path="/dhs-gurugram/board-of-management/:id" element={<ProtectedRoute><BoardManagement /></ProtectedRoute>} />
            <Route path="/dhs-gurugram/leadership-list" element={<ProtectedRoute><LeadershipList /></ProtectedRoute>} />
            <Route path="/dhs-gurugram/leadership/:id" element={<ProtectedRoute><Leadership /></ProtectedRoute>} />
            <Route path="/dhs-gurugram/content-image-heading/:id" element={<ProtectedRoute><ContentImageHeading/></ProtectedRoute>} />
            <Route path="/dhs-gurugram/faq" element={<ProtectedRoute><FAQs /></ProtectedRoute>} />
            <Route path="/dhs-gurugram/faq/:id" element={<ProtectedRoute><AddFAQs /></ProtectedRoute>} />
            <Route path="/dhs-gurugram/infrastructure" element={<ProtectedRoute><InfrastructureList /></ProtectedRoute>} />
            <Route path="/dhs-gurugram/infrastructure/:id" element={<ProtectedRoute><InfrastrucureAdd /></ProtectedRoute>} />
          </>
        )}

        {/* DHS Bhankrota */}
        {accessRights.includes("dhs-bhankrota") && (
          <>
            <Route path="/dhs-bhankrota" element={<ProtectedRoute><DHSmain/></ProtectedRoute>} />
            <Route path="/dhs-bhankrota/content/:id" element={<ProtectedRoute><Content/></ProtectedRoute>} />
            <Route path="/dhs-bhankrota/banner-content/:id" element={<ProtectedRoute><BannerContent /></ProtectedRoute>} />
            <Route path="/dhs-bhankrota/banner-content-image/:id" element={<ProtectedRoute><BannerContentMultipleImage /></ProtectedRoute>} />
            <Route path="/dhs-bhankrota/board-of-management-list" element={<ProtectedRoute><ManagementList /></ProtectedRoute>} />
            <Route path="/dhs-bhankrota/board-of-management/:id" element={<ProtectedRoute><BoardManagement /></ProtectedRoute>} />
            <Route path="/dhs-bhankrota/leadership-list" element={<ProtectedRoute><LeadershipList /></ProtectedRoute>} />
            <Route path="/dhs-bhankrota/leadership/:id" element={<ProtectedRoute><Leadership /></ProtectedRoute>} />
            <Route path="/dhs-bhankrota/content-image-heading/:id" element={<ProtectedRoute><ContentImageHeading/></ProtectedRoute>} />
            <Route path="/dhs-bhankrota/faq" element={<ProtectedRoute><FAQs /></ProtectedRoute>} />
            <Route path="/dhs-bhankrota/faq/:id" element={<ProtectedRoute><AddFAQs /></ProtectedRoute>} />
            <Route path="/dhs-bhankrota/infrastructure" element={<ProtectedRoute><InfrastructureList /></ProtectedRoute>} />
            <Route path="/dhs-bhankrota/infrastructure/:id" element={<ProtectedRoute><InfrastrucureAdd /></ProtectedRoute>} />
          </>
        )}

        {/* If route is not accessible, redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
      <AppContent />
  );
}
