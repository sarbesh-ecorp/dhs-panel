import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GalleryModal from "../components/galleryModel";


export default function DHSmain() {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const extractedPath = path.split("/")[1];

    return (
        <div className="mainContent">
            <div className="banner-header">
                <h3>Choose Workplace ({extractedPath === 'dhs-bhankrota' ? 'dhs-ajmer-road' : extractedPath}-website)</h3>
                <button className="btn btn-secondary" onClick={() => navigate("/dashboard")}>Back</button>
            </div>
            {extractedPath === 'dhs-main' && (<>
            <div className="section">
                <h4 className="section-title">Home</h4>
                <div className="row">
                    <Card link="/dhs-main/content/history-dhs-home" title="History Content" description="Only content"/>
                    <Card link="/dhs-main/content/our-approach-dhs-home" title="Our Approach Content" description="Only content" />
                </div>
            </div>
            <div className="section">
                <h4 className="section-title">Who We Are</h4>
                <div className="row">
                    <Card link="/dhs-main/banner-content/history" title="History" description="Banner Image & Content"/>
                    <Card link="/dhs-main/banner-content/vision-n-mission" title="Our Vision & Mission" description="Banner Image & Content"/>
                    <Card link="/dhs-main/board-of-management-list" title="Board Of Management" description="Board Of Management"/>
                </div>
            </div>
            <div className="section">
                <h4 className="section-title">Academics</h4>
                <div className="row">
                    <Card link="/dhs-main/banner-content-image/curriculum" title="Curriculum" description="Banner Image, Content & Multiple Images"/>
                    <Card link="/dhs-main/banner-content-image/our-approach" title="Our Approach" description="Banner Image, Content & Multiple Images"/>
                    <Card link="/dhs-main/banner-content-image/life-at-dharav" title="Life at Dharav" description="Banner Image, Content & Multiple Images"/>
                </div>
            </div>
            </>)}
            {extractedPath === 'dhs-gurugram' && (<>
            <div className="section">
                <h4 className="section-title">Home</h4>
                <div className="row">
                    <Card link="/dhs-gurugram/content-image-heading/about" title="About Content" description="Heading, Content & Image"/>
                    <Card link="/dhs-gurugram/infrastructure" title="Infrastructure" description="Heading, Content & Image"/>
                </div>
            </div>
            <div className="section">
                <h4 className="section-title">About Us</h4>
                <div className="row">
                    <Card link="/dhs-gurugram/banner-content/our-school" title="Our School" description="Banner Image & Content"/>
                    <Card link="/dhs-gurugram/banner-content/vision-n-mission" title="Vision & Mission" description="Banner Image & Content"/>
                    <Card link="/dhs-gurugram/leadership-list" title="Leadership" description="Leadership"/>
                    <Card link="/dhs-gurugram/board-of-management-list" title="Board Of Member" description="Board of Member"/>
                </div>
            </div>
            <div className="section">
                <h4 className="section-title">Infrastructure</h4>
                <div className="row">
                    <Card link="/dhs-gurugram/banner-content-image/school-campus" title="School Campus" description="Banner Image, Content & Multiple Images"/>
                    <Card link="/dhs-gurugram/banner-content-image/labs" title="Labs" description="Banner Image, Content & Multiple Images"/>
                    <Card link="/dhs-gurugram/banner-content-image/sports" title="Sports" description="Banner Image, Content & Multiple Images"/>
                    <Card link="/dhs-gurugram/banner-content-image/other-facilities" title="Other Facilities" description="Banner Image, Content & Multiple Images"/>
                </div>
            </div>
            <div className="section">
                <h4 className="section-title">Academics</h4>
                <div className="row">
                    <Card link="/dhs-gurugram/banner-content-image/primary" title="Primary" description="Banner Image, Content & Multiple Images"/>
                    <Card link="/dhs-gurugram/banner-content-image/pedagogy" title="Pedagogy" description="Banner Image, Content & Multiple Images"/>
                    <Card link="/dhs-gurugram/banner-content-image/curriculum" title="Curriculum" description="Banner Image, Content & Multiple Images"/>
                    <Card link="/dhs-gurugram/banner-content-image/technology" title="Technology" description="Banner Image, Content & Multiple Images"/>
                </div>
            </div>
            <div className="section">
                <h4 className="section-title">Beyond Academics</h4>
                <div className="row">
                    <Card link="/dhs-gurugram/banner-content-image/visual-art" title="Visual Art" description="Banner Image, Content & Multiple Images"/>
                    <Card link="/dhs-gurugram/banner-content-image/performing-arts" title="Performing Arts" description="Banner Image, Content & Multiple Images"/>
                    <Card link="/dhs-gurugram/content/theatre" title="Theatre" description="Only content"/>
                    <Card link="/dhs-gurugram/banner-content-image/music" title="Music" description="Banner Image, Content & Multiple Images"/>                    
                    <Card link="/dhs-gurugram/content/dance" title="Dance" description="Only content"/>
                    <Card link="/dhs-gurugram/content/sports" title="Sports" description="Only content"/>
                    <Card link="/dhs-gurugram/banner-content-image/health-and-well-being" title="Health and Wellness" description="Banner Image, Content & Multiple Images"/>
                </div>
            </div>
            <div className="section">
                <h4 className="section-title">Admissions</h4>
                <div className="row">
                    <Card link="/dhs-gurugram/content/pre-nursery-to-class-1" title="Pre-Nursery to Class 1" description="Only content"/>
                    <Card link="/dhs-gurugram/content/class-2-to-5" title="Class 2 to 5" description="Only content"/>
                    <Card link="/dhs-gurugram/content/fees" title="Fees" description="Only content"/>
                    <Card link="/dhs-gurugram/faq" title="FAQs" description="FAQs"/>
                </div>
            </div>
            </>)}
            {extractedPath === 'dhs-bhankrota' && (<>
            <div className="section">
                <h4 className="section-title">Home</h4>
                <div className="row">
                    <Card link="/dhs-bhankrota/content-image-heading/about" title="About Content" description="Heading, Content & Image" />
                    <Card link="/dhs-bhankrota/infrastructure" title="Infrastructure" description="Heading, Content & Image" />
                </div>
            </div>
            <div className="section">
                <h4 className="section-title">About Us</h4>
                <div className="row">
                    <Card link="/dhs-bhankrota/banner-content/our-school" title="Our School" description="Banner Image & Content"/>
                    <Card link="/dhs-bhankrota/banner-content/vision-n-mission" title="Vision & Mission" description="Banner Image & Content"/>
                    <Card link="/dhs-bhankrota/leadership-list" title="Leadership" description="Leadership"/>
                    <Card link="/dhs-bhankrota/board-of-management-list" title="Board Of Member" description="Board of Member"/>
                </div>
            </div>
            <div className="section">
                <h4 className="section-title">Infrastructure</h4>
                <div className="row">
                    <Card link="/dhs-bhankrota/banner-content-image/school-campus" title="School Campus" description="Banner Image, Content & Multiple Images"/>
                    <Card link="/dhs-bhankrota/banner-content-image/labs" title="Labs" description="Banner Image, Content & Multiple Images"/>
                    <Card link="/dhs-bhankrota/banner-content-image/sports" title="Sports" description="Banner Image, Content & Multiple Images"/>
                    <Card link="/dhs-bhankrota/banner-content-image/other-facilities" title="Other Facilities" description="Banner Image, Content & Multiple Images"/>
                    <Card link="/dhs-bhankrota/content/smart-classroom" title="Smart Classroom" description="Only content"/>
                    <Card link="/dhs-bhankrota/banner-content-image/boarding-house" title="Boarding House" description="Banner Image, Content & Multiple Images"/>
                </div>
            </div>
            <div className="section">
                <h4 className="section-title">Academics</h4>
                <div className="row">
                    <Card link="/dhs-bhankrota/banner-content-image/scholarship" title="Scholarship" description="Banner Image, Content & Multiple Images"/>
                    <Card link="/dhs-bhankrota/banner-content-image/pedagogy" title="Pedagogy*" description="Banner Image, Content & Multiple Images"/>
                    <Card link="/dhs-bhankrota/banner-content-image/curriculum" title="Curriculum" description="Banner Image, Content & Multiple Images"/>
                    <Card link="/dhs-bhankrota/banner-content-image/foreign-language" title="Foreign Language" description="Banner Image, Content & Multiple Images"/>
                    <Card link="/dhs-bhankrota/content/career-counselling" title="Career Counselling" description="Only content"/>
                </div>
            </div>
            <div className="section">
                <h4 className="section-title">Beyond Academics</h4>
                <div className="row">
                    <Card link="/dhs-bhankrota/banner-content-image/visual-art" title="Visual Art"description="Banner Image, Content & Multiple Images"/>
                    <Card link="/dhs-bhankrota/banner-content-image/performing-arts" title="Performing Arts"description="Banner Image, Content & Multiple Images"/>
                    <Card link="/dhs-bhankrota/banner-content-image/music" title="Music"description="Banner Image, Content & Multiple Images"/>                    
                    <Card link="/dhs-bhankrota/banner-content/house-system" title="House System" description="Banner Image & Content"/>
                    <Card link="/dhs-bhankrota/banner-content-image/sports" title="Sports"description="Banner Image, Content & Multiple Images"/>
                    <Card link="/dhs-bhankrota/banner-content-image/health-and-well-being" title="Health and Wellness"description="Banner Image, Content & Multiple Images"/>
                </div>
            </div>
            <div className="section">
                <h4 className="section-title">Boarding</h4>
                <div className="row">
                    <Card link="/dhs-bhankrota/banner-content-image/boarding-house" title="Boarding House"description="Banner Image, Content & Multiple Images"/>
                    <Card link="/dhs-bhankrota/banner-content-image/a-day-in-life-of-boarder" title="A day in life of boarder"description="Banner Image, Content & Multiple Images"/>
                    <Card link="/dhs-bhankrota/content/rules-n-regulations" title="Rules & Regulations" description="Only content"/>
                    <Card link="/dhs-bhankrota/content/meals" title="Meals" description="Only content"/>
                    <Card link="/dhs-bhankrota/faq" title="Boarding FAQs" description="Boarding FAQs"/>
                </div>
            </div>
            <div className="section">
                <h4 className="section-title">Admissions</h4>
                <div className="row">
                    <Card link="/dhs-bhankrota/content/admission-information" title="Admission Information" description="Only content"/>
                    <Card link="/dhs-bhankrota/content/transport" title="Transport" description="Only content"/>
                    <Card link="/dhs-bhankrota/content/fees" title="Fees" description="Only content"/>
                </div>
            </div>
            <div className="section">
                <h4 className="section-title">Quick Links</h4>
                <div className="row">
                    <Card link="/dhs-bhankrota/banner-content/pravaah" title="Pravaah" description="Banner Image & Content"/>
                    <Card link="/dhs-bhankrota/banner-content/shiksha-kendra" title="Shiksha Kendra" description="Banner Image & Content"/>
                    <Card link="/dhs-bhankrota/banner-content/learner-centric-programmes" title="Learner Centric Programmes" description="Banner Image & Content"/>
                </div>
            </div>
            </>)}
        </div>
    );
}

function Card({ link, title, description }) {
    const [showModal, setShowModal] = useState(false);
    const [pressed, setPressed] = useState(false);

    const handleShow = () => {setShowModal(true); setPressed(true)};
    const handleClose = () => {setShowModal(false); setPressed(false)};
    
    return (
    <div className="col-md-4 mb-4">
        {description === 'Banner Image, Content & Multiple Images' ? (
            <div className="card custom-card">
                <Link to={link} className="text-decoration-none">
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <h6 className="card-text mt-4">{description}</h6>
                    </div>
                </Link>
                <div className="gallery-button">
                    <div className="mt-4">
                        <button className="btn gallery-btn" onClick={handleShow}>Gallery Images</button>
                    </div>
                </div>
            </div>
        ) : (
        <Link to={link} className="card custom-card text-decoration-none">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <h6 className="card-text mt-4">{description}</h6>
            </div>
        </Link>
    )}
    {pressed && 
    <GalleryModal show={showModal} handleClose={handleClose} link={link} />}
    </div>
    );
}
