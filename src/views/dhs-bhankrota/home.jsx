import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function DHSBhankrota() {
    const navigate = useNavigate();

    return (
        <div className="mainContent">
            <div className="banner-header">
                <h3>Choose Workplace (Bhankrota)</h3>
                <button className="btn btn-secondary" onClick={() => navigate("/dashboard")}>Back</button>
            </div>

            <div className="section">
                <h4 className="section-title">Home</h4>
                <div className="row">
                    <Card link="/dhs-bhankrota/content-image-heading/about" title="About Content" description="Heading, Content & Image" />
                    <Card link="/dhs-bhankrota/content-image-heading/infrastructure" title="Infrastructure" description="Heading, Content & Image" />
                </div>
            </div>
            <div className="section">
                <h4 className="section-title">About Us</h4>
                <div className="row">
                    <Card link="/dhs-bhankrota/banner-content/our-school" title="Our School" description="Banner Image & Content"/>
                    <Card link="/dhs-bhankrota/banner-content/vision-n-mission" title="Vision & Mission" description="Banner Image & Content"/>
                    <Card link="/dhs-bhankrota/leadership" title="Leadership" description="Leadership"/>
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
                    <Card link="/dhs-bhankrota/banner-content-image/pedagogy" title="Pedagogy" description="Banner Image, Content & Multiple Images"/>
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
                    <Card link="/dhs-bhankrota/banner-content-image/health-n-wellness" title="Health and Wellness"description="Banner Image, Content & Multiple Images"/>
                </div>
            </div>
            <div className="section">
                <h4 className="section-title">Boarding</h4>
                <div className="row">
                    <Card link="/dhs-bhankrota/banner-content-image/boarding-house" title="Boarding House"description="Banner Image, Content & Multiple Images"/>
                    <Card link="/dhs-bhankrota/banner-content-image/a-day-in-life-of-boarder" title="A day in life of boarder"description="Banner Image, Content & Multiple Images"/>
                    <Card link="/dhs-bhankrota/content/rules-n-regulations" title="Rules & Regulations" description="Only content"/>
                    <Card link="/dhs-bhankrota/content/meals" title="Meals" description="Only content"/>
                    <Card link="/dhs-bhankrota/boarding-faqs" title="Boarding FAQs" description="Boarding FAQs"/>
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
        </div>
    );
}

function Card({ link, title, description }) {
    return (
        <div className="col-md-4 mb-4">
            <Link to={link} className="card custom-card text-decoration-none">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <h6 className="card-text mt-4">{description}</h6>
                </div>
            </Link>
        </div>
    );
}
