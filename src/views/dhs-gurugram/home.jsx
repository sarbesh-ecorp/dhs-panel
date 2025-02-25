import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function DHSGurugram() {
    const navigate = useNavigate();

    return (
        <div className="mainContent">
            <div className="banner-header">
                <h3>Choose Workplace (Gurugram)</h3>
                <button className="btn btn-secondary" onClick={() => navigate("/dashboard")}>Back</button>
            </div>

            <div className="section">
                <h4 className="section-title">Home</h4>
                <div className="row">
                    <Card link="/dhs-gurugram/content-image-heading/about" title="About Content" description="Heading, Content & Image"/>
                    <Card link="/dhs-gurugram/content-image-heading/infrastructure" title="Infrastructure" description="Heading, Content & Image"/>
                </div>
            </div>
            <div className="section">
                <h4 className="section-title">About Us</h4>
                <div className="row">
                    <Card link="/dhs-gurugram/banner-content/our-school" title="Our School" description="Banner Image & Content"/>
                    <Card link="/dhs-gurugram/banner-content/vision-n-mission" title="Vision & Mission" description="Banner Image & Content"/>
                    <Card link="/dhs-gurugram/leadership" title="Leadership" description="Leadership"/>
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
                    <Card link="/dhs-gurugram/banner-content-image/health-n-wellness" title="Health and Wellness" description="Banner Image, Content & Multiple Images"/>
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
