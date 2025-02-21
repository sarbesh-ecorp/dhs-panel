import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, Globe, MapPin } from "lucide-react"; // For icons

export default function Dashboard() {
    return (
        <div className="dashboard-container mainContent">
            {/* Welcome Section */}
            <div className="dashboard-header">
                <h1>Welcome to DHS Admin Panel</h1>
                <p>Manage and control different branches from a single place.</p>
            </div>

            {/* Workplace Cards */}
            <div className="workplace-grid">
                <WorkplaceCard 
                    link="/dhs-main" 
                    title="DHS Main Website" 
                    description="Manage the primary DHS website."
                    icon={<Globe size={40} />}
                />
                <WorkplaceCard 
                    link="/dhs-gurugram" 
                    title="DHS Gurugram" 
                    description="Oversee the Gurugram branch."
                    icon={<MapPin size={40} />}
                />
                <WorkplaceCard 
                    link="/dhs-bhankrota" 
                    title="DHS Bhankrota" 
                    description="Control operations at Bhankrota."
                    icon={<Briefcase size={40} />}
                />
            </div>
        </div>
    );
}

// Reusable Workplace Card Component
function WorkplaceCard({ link, title, description, icon }) {
    return (
        <Link to={link} className="workplace-card">
            <div className="card-icon">{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
        </Link>
    );
}
