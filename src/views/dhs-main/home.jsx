import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function DHSmain() {
    const navigate = useNavigate();

    return (
        <div className="mainContent">
            {/* Header Section */}
            <div className="banner-header">
                <h3>Choose Workplace</h3>
                <button className="btn btn-secondary" onClick={() => navigate("/dashboard")}>Back</button>
            </div>

            {/* Sections */}
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
        </div>
    );
}

// Reusable Card Component
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
