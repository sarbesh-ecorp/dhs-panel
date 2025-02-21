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
                    <Card link="/dhs-main/content/history-dhs-home" title="History Content" />
                    <Card link="/dhs-main/content/our-approach-dhs-home" title="Our Approach Content" />
                </div>
            </div>

            <div className="section">
                <h4 className="section-title">Who We Are</h4>
                <div className="row">
                    <Card link="/dhs-main/banner-content/history" title="History" />
                    <Card link="/dhs-main/banner-content/vision-n-mission" title="Our Vision & Mission" />
                    <Card link="/dhs-main/board-of-member" title="Board Of Member" />
                </div>
            </div>

            <div className="section">
                <h4 className="section-title">Academics</h4>
                <div className="row">
                    <Card link="/dhs-main/banner-content-image/curriculum" title="Curriculum" />
                    <Card link="/dhs-main/banner-content-image/our-approach" title="Our Approach" />
                    <Card link="/dhs-main/banner-content-image/life-at-dharav" title="Life at Dharav" />
                </div>
            </div>
        </div>
    );
}

// Reusable Card Component
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
