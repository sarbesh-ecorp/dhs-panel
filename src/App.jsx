import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./views/dashboard";
import Sidebar from "./components/sidebar";
import DHSmain from "./views/dhs-main/home";
import Content from "./views/dhs-main/components/content";
import BannerContent from "./views/dhs-main/components/banner-content";
import BannerContentMultipleImage from "./views/dhs-main/components/banner-content-multipleImage";
import BoardMember from "./views/dhs-main/components/board-of-member";
import Login from "./auth/login";
import DHSGurugram from "./views/dhs-gurugram/home";
import ContentGurugram from "./views/dhs-gurugram/components/content";
import BannerContentMultipleImageGurugram from "./views/dhs-gurugram/components/banner-content-multipleImage";
import BannerContentGurugram from "./views/dhs-gurugram/components/banner-content";
import BoardMemberGurugram from "./views/dhs-gurugram/components/board-of-member";
import Leadership from "./views/dhs-gurugram/components/leadership";
import ContentImageHeading from "./views/dhs-gurugram/components/content-image-heading";
import FAQs from "./views/dhs-gurugram/components/faq";
import AddFAQs from "./views/dhs-gurugram/components/addFaq";
import DHSBhankrota from "./views/dhs-bhankrota/home";
import ProtectedRoute from "./utils/protectedRoutes";
import ContentBhankrota from "./views/dhs-bhankrota/components/content";
import BannerContentMultipleImageBhankrota from "./views/dhs-bhankrota/components/banner-content-multipleImage";
import BannerContentBhankrota from "./views/dhs-bhankrota/components/banner-content";
import BoardMemberBhankrota from "./views/dhs-bhankrota/components/board-of-member";
import BhankrotaLeadership from "./views/dhs-bhankrota/components/leadership";
import ContentImageHeadingBhankrota from "./views/dhs-bhankrota/components/content-image-heading";
import BoardingFAQs from "./views/dhs-bhankrota/components/faq";
import AddFAQsBhankrota from "./views/dhs-bhankrota/components/addFaq";

function AppContent() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/login";

  return (
    <div className="d-flex">
      {!hideSidebar && <Sidebar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        
        {/* DHS Main */}
        <Route path="/dhs-main" element={<ProtectedRoute><DHSmain /></ProtectedRoute>} />
        <Route path="/dhs-main/content/:id" element={<ProtectedRoute><Content /></ProtectedRoute>} />
        <Route path="/dhs-main/banner-content/:id" element={<ProtectedRoute><BannerContent /></ProtectedRoute>} />
        <Route path="/dhs-main/banner-content-image/:id" element={<ProtectedRoute><BannerContentMultipleImage /></ProtectedRoute>} />
        <Route path="/dhs-main/board-of-member" element={<ProtectedRoute><BoardMember /></ProtectedRoute>} />

        {/* DHS Gurugram */}
        <Route path="/dhs-gurugram" element={<ProtectedRoute><DHSGurugram/></ProtectedRoute>}/>
        <Route path="/dhs-gurugram/content/:id" element={<ProtectedRoute><ContentGurugram/></ProtectedRoute>}/>
        <Route path="/dhs-gurugram/banner-content-image/:id" element={<ProtectedRoute><BannerContentMultipleImageGurugram /></ProtectedRoute>} />
        <Route path="/dhs-gurugram/banner-content/:id" element={<ProtectedRoute><BannerContentGurugram /></ProtectedRoute>} />
        <Route path="/dhs-gurugram/board-of-member" element={<ProtectedRoute><BoardMemberGurugram /></ProtectedRoute>} />
        <Route path="/dhs-gurugram/leadership" element={<ProtectedRoute><Leadership /></ProtectedRoute>} />
        <Route path="/dhs-gurugram/content-image-heading/:id" element={<ProtectedRoute><ContentImageHeading/></ProtectedRoute>}/>
        <Route path="/dhs-gurugram/faq" element={<ProtectedRoute><FAQs /></ProtectedRoute>} />
        <Route path="/dhs-gurugram/faq/:id" element={<ProtectedRoute><AddFAQs/></ProtectedRoute>} />

        {/* DHS Bhankrota */}
        <Route path="/dhs-bhankrota" element={<ProtectedRoute><DHSBhankrota/></ProtectedRoute>}/>
        <Route path="/dhs-bhankrota/content/:id" element={<ProtectedRoute><ContentBhankrota/></ProtectedRoute>}/>
        <Route path="/dhs-bhankrota/banner-content-image/:id" element={<ProtectedRoute><BannerContentMultipleImageBhankrota /></ProtectedRoute>} />
        <Route path="/dhs-bhankrota/banner-content/:id" element={<ProtectedRoute><BannerContentBhankrota /></ProtectedRoute>} />
        <Route path="/dhs-bhankrota/board-of-member" element={<ProtectedRoute><BoardMemberBhankrota /></ProtectedRoute>} />
        <Route path="/dhs-bhankrota/leadership" element={<ProtectedRoute><BhankrotaLeadership /></ProtectedRoute>} />
        <Route path="/dhs-bhankrota/content-image-heading/:id" element={<ProtectedRoute><ContentImageHeadingBhankrota/></ProtectedRoute>}/>
        <Route path="/dhs-bhankrota/boarding-faqs" element={<ProtectedRoute><BoardingFAQs /></ProtectedRoute>} />
        <Route path="/dhs-bhankrota/boarding-faq/:id" element={<ProtectedRoute><AddFAQsBhankrota/></ProtectedRoute>} />

      </Routes>
    </div>
  );
}

export default function App() {
  return (
      <AppContent />
  );
}
