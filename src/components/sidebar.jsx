import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/authContext';

function Sidebar() {
  const { isLoggedIn, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();
  const path = location.pathname;

  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--header-width', isCollapsed ? '80px' : '280px');
  }, [isCollapsed]);

  return (
    <>
      <button
        type="button"
        id="sidebarCollapse"
        className="sidebar_toggle"
        onClick={toggleSidebar}
      >
        <i className={`fa-solid ${isCollapsed ? 'fa-bars' : 'fa-xmark'}`} aria-hidden="true"></i>
      </button>

      <header className={`header ${isCollapsed ? 'collapsed' : ''}`}>
        {isCollapsed ? <div className="logo">DHS</div> : <div className="logo">Dharav High School</div>}
        
        <nav className="sidebar navi">
          <ul className="list-inline">
              <li>
                <Link to={'/dashboard'}>
                  <i className={`fa fa-home`}></i> 
                  <span className={isCollapsed ? 'hidden' : ''}>Dashboard</span>
                </Link>
              </li>
              {path.includes("dhs-main") && (
                <>
                  <li>
                    <Link to={'/dhs-main'}>
                      <i className="fa fa-home"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Home (Main)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/dhs-main/content/history-dhs-home'}>
                      <i className="fa fa-book"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>History (Home)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/dhs-main/content/our-approach-dhs-home'}>
                      <i className="fa fa-book"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Our Approach (Home)</span>
                    </Link>
                  </li>
                  {/* Who we are */}
                  <li>
                    <Link to={'/dhs-main/banner-content/history'}>
                      <i className="fa fa-book"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>History (Who we are)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/dhs-main/banner-content/vision-n-mission'}>
                      <i className="fa fa-bullseye"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Vision & Mission (Who we are)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/dhs-main/board-of-member'}>
                      <i className="fa fa-bullseye"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Board of Member (Who we are)</span>
                    </Link>
                  </li>
                  {/* Academics Section */}
                  <li>
                    <Link to={'/dhs-main/banner-content-image/curriculum'}>
                      <i className="fa fa-graduation-cap"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Curriculum (Academics)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/dhs-main/banner-content-image/our-approach'}>
                      <i className="fa fa-lightbulb"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Our Approach (Academics)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/dhs-main/banner-content-image/life-at-dharav'}>
                      <i className="fa fa-users"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Life at Dharav (Academics)</span>
                    </Link>
                  </li>
                </>
              )}
              {path.includes("dhs-gurugram") && (
                <>
                  <li>
                    <Link to={'/dhs-gurugram'}>
                      <i className="fa fa-home"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Home (Gurugram)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/dhs-gurugram/content-image-heading/about'}>
                      <i className="fa fa-book"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>About (Home)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/dhs-gurugram/content-image-heading/infrastructure'}>
                      <i className="fa fa-book"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Infrastructure (Home)</span>
                    </Link>
                  </li>
                  {/* About Us */}
                  <li>
                    <Link to={'/dhs-gurugram/banner-content/our-school'}>
                      <i className="fa fa-home"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Our School (About US)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/dhs-gurugram/banner-content/vision-n-mission'}>
                      <i className="fa fa-book"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Vision & Mission (About Us)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/dhs-gurugram/leadership'}>
                      <i className="fa fa-book"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Leadership (About Us)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/dhs-gurugram/board-of-member'}>
                      <i className="fa fa-book"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Board of Member (About Us)</span>
                    </Link>
                  </li>
                  {/* Infrastructure */}
                  <li>
                    <Link to={'/dhs-gurugram/banner-content-image/school-campus'}>
                      <i className="fa fa-home"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>School Campus (Infrastructure)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/dhs-gurugram/banner-content-image/labs'}>
                      <i className="fa fa-book"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Labs (Infrastructure)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/dhs-gurugram/banner-content-image/sports'}>
                      <i className="fa fa-book"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Sports (Infrastructure)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/dhs-gurugram/banner-content-image/other-facilities'}>
                      <i className="fa fa-book"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Other Facilities (Infrastructure)</span>
                    </Link>
                  </li>
                  {/* Academics */}
                  <li>
                    <Link to={'/dhs-gurugram/banner-content-image/primary'}>
                      <i className="fa fa-home"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Primary (Academics)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/dhs-gurugram/banner-content-image/pedagogy'}>
                      <i className="fa fa-book"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Pefagogy (Academics)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/dhs-gurugram/banner-content-image/curriculum'}>
                      <i className="fa fa-book"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Curriculum (Academics)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/dhs-gurugram/banner-content-image/technology'}>
                      <i className="fa fa-book"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Technology (Academics)</span>
                    </Link>
                  </li>
                  {/* Beyond Academics */}
                  <li>
                    <Link to={'/dhs-gurugram/banner-content-image/visual-art'}>
                      <i className="fa fa-book"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Visual Art (Beyond Academics)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/dhs-gurugram/banner-content-image/performing-arts'}>
                      <i className="fa fa-book"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Performing Arts (Beyond Academics)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/dhs-gurugram/content/theatre'}>
                      <i className="fa fa-book"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Theatre (Beyond Academics)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/dhs-gurugram/banner-content-image/music'}>
                      <i className="fa fa-home"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Music (Beyond Academics)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/dhs-gurugram/content/dance'}>
                      <i className="fa fa-book"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Dance (Beyond Academics)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/dhs-gurugram/content/sports'}>
                      <i className="fa fa-book"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Sports (Beyond Academics)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/dhs-gurugram/banner-content-image/health-n-wellness'}>
                      <i className="fa fa-book"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Health & Wellness (Beyond Academics)</span>
                    </Link>
                  </li>
                  {/* Admissions */}
                  <li>
                    <Link to={'/dhs-gurugram/content/pre-nursery-to-class-1'}>
                      <i className="fa fa-book"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Pre-Nursery to Class 1 (Admissions)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/dhs-gurugram/content/class-2-to-5'}>
                      <i className="fa fa-book"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Class 2 to 5 (Admissions)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/dhs-gurugram/content/fees'}>
                      <i className="fa fa-book"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>Fees (Admissions)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/dhs-gurugram/faq'}>
                      <i className="fa fa-book"></i> 
                      <span className={isCollapsed ? 'hidden' : ''}>FAQs (Admissions)</span>
                    </Link>
                  </li>

                </>
              )}
          </ul>
        </nav>

        <div className="navi header-bottom">
          <ul className="list-inline">
            <li><a href="#" onClick={logout}><i className="fa-solid fa-right-from-bracket"></i> <span className={isCollapsed ? 'hidden' : ''}>Logout</span></a></li>
          </ul>
        </div>
      </header>
    </>
  );
}

export default Sidebar;
