import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, Globe, MapPin, User2Icon } from "lucide-react";

export default function Dashboard() {
    return (
        <div className="dashboard-container mainContent">
            <div className="dashboard-header">
                <h1>Welcome to DHS Admin Panel</h1>
                <p>Manage and control different branches from a single place.</p>
            </div>
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
                <WorkplaceCard 
                    link="/user-management" 
                    title="User Management"
                    description="Manage users and their roles."
                    icon={<User2Icon size={40} />}
                />
            </div>
        </div>
    );
}

function WorkplaceCard({ link, title, description, icon }) {
    return (
        <Link to={link} className="workplace-card">
            <div className="card-icon">{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
        </Link>
    );
}
