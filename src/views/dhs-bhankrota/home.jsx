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
                    <Card link="/dhs-bhankrota/content-image-heading/about" title="About Content" />
                    <Card link="/dhs-bhankrota/content-image-heading/infrastructure" title="Infrastructure" />
                </div>
            </div>
            <div className="section">
                <h4 className="section-title">About Us</h4>
                <div className="row">
                    <Card link="/dhs-bhankrota/banner-content/our-school" title="Our School" />
                    <Card link="/dhs-bhankrota/banner-content/vision-n-mission" title="Vision & Mission" />
                    <Card link="/dhs-bhankrota/leadership" title="Leadership" />
                    <Card link="/dhs-bhankrota/board-of-member" title="Board Of Member" />
                </div>
            </div>

            <div className="section">
                <h4 className="section-title">Infrastructure</h4>
                <div className="row">
                    <Card link="/dhs-bhankrota/banner-content-image/school-campus" title="School Campus" />
                    <Card link="/dhs-bhankrota/banner-content-image/labs" title="Labs" />
                    <Card link="/dhs-bhankrota/banner-content-image/sports" title="Sports" />
                    <Card link="/dhs-bhankrota/banner-content-image/other-facilities" title="Other Facilities" />
                    <Card link="/dhs-bhankrota/content/smart-classroom" title="Smart Classroom" />
                    <Card link="/dhs-bhankrota/banner-content-image/boarding-house" title="Boarding House" />
                </div>
            </div>
            <div className="section">
                <h4 className="section-title">Academics</h4>
                <div className="row">
                    <Card link="/dhs-bhankrota/banner-content-image/scholarship" title="Scholarship"/>
                    <Card link="/dhs-bhankrota/banner-content-image/pedagogy" title="Pedagogy"/>
                    <Card link="/dhs-bhankrota/banner-content-image/curriculum" title="Curriculum"/>
                    <Card link="/dhs-bhankrota/banner-content-image/foreign-language" title="Foreign Language"/>
                    <Card link="/dhs-bhankrota/content/career-counselling" title="Career Counselling"/>
                </div>
            </div>
            <div className="section">
                <h4 className="section-title">Beyond Academics</h4>
                <div className="row">
                    <Card link="/dhs-bhankrota/banner-content-image/visual-art" title="Visual Art"/>
                    <Card link="/dhs-bhankrota/banner-content-image/performing-arts" title="Performing Arts"/>
                    <Card link="/dhs-bhankrota/banner-content-image/music" title="Music"/>                    
                    <Card link="/dhs-bhankrota/banner-content/house-system" title="House System"/>
                    <Card link="/dhs-bhankrota/banner-content-image/sports" title="Sports"/>
                    <Card link="/dhs-bhankrota/banner-content-image/health-n-wellness" title="Health and Wellness"/>
                </div>
            </div>
            <div className="section">
                <h4 className="section-title">Boarding</h4>
                <div className="row">
                    <Card link="/dhs-bhankrota/banner-content-image/boarding-house" title="Boarding House"/>
                    <Card link="/dhs-bhankrota/banner-content-image/a-day-in-life-of-boarder" title="A day in life of boarder"/>
                    <Card link="/dhs-bhankrota/content/rules-n-regulations" title="Rules & Regulations"/>
                    <Card link="/dhs-bhankrota/content/meals" title="Meals"/>
                    <Card link="/dhs-bhankrota/boarding-faqs" title="Boarding FAQs"/>
                </div>
            </div>
            <div className="section">
                <h4 className="section-title">Admissions</h4>
                <div className="row">
                    <Card link="/dhs-bhankrota/content/admission-information" title="Admission Information"/>
                    <Card link="/dhs-bhankrota/content/transport" title="Transport"/>
                    <Card link="/dhs-bhankrota/content/fees" title="Fees"/>
                </div>
            </div>
            <div className="section">
                <h4 className="section-title">Quick Links</h4>
                <div className="row">
                    <Card link="/dhs-bhankrota/banner-content/pravaah" title="Pravaah" />
                    <Card link="/dhs-bhankrota/banner-content/shiksha-kendra" title="Shiksha Kendra" />
                    <Card link="/dhs-bhankrota/banner-content/learner-centric-programmes" title="Learner Centric Programmes" />
                </div>
            </div>
        </div>
    );
}

function Card({ link, title }) {
    return (
        <div className="col-md-4 mb-4">
            <Link to={link} className="card custom-card text-decoration-none">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                </div>
            </Link>
        </div>
    );
}
