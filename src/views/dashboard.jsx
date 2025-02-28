import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, Contact2Icon, Globe, MapPin, User2Icon } from "lucide-react";

export default function Dashboard() {

    const accessRights = localStorage.getItem("access") ? localStorage.getItem("access").split(",") : [];

    return (
        <div className="dashboard-container mainContent">
            <div className="dashboard-header">
                <h1>Welcome to DHS Admin Panel</h1>
                <p>Manage and control different branches from a single place.</p>
            </div>
            <div className="workplace-grid">
                {accessRights.includes('dhs-main') && (
                <WorkplaceCard 
                    link="/dhs-main" 
                    title="DHS Main Website" 
                    description="Manage the primary DHS website."
                    icon={<Globe size={40} />}
                />)}
                 {accessRights.includes('dhs-gurugram') && (
                <WorkplaceCard 
                    link="/dhs-gurugram" 
                    title="DHS Gurugram" 
                    description="Oversee the Gurugram branch."
                    icon={<MapPin size={40} />}
                />)}
                {accessRights.includes('dhs-bhankrota') && (
                <WorkplaceCard 
                    link="/dhs-bhankrota" 
                    title="DHS Bhankrota" 
                    description="Control operations at Bhankrota."
                    icon={<Briefcase size={40} />}
                />)}
                {accessRights.includes('user-management') && (
                <WorkplaceCard 
                    link="/user-management" 
                    title="User Management"
                    description="Manage users and their roles."
                    icon={<User2Icon size={40} />}
                />)}
                {accessRights.includes('enquiry') && (
                <WorkplaceCard 
                    link="/enquiry" 
                    title="Enquiry"
                    description="Manage enquiries."
                    icon={<Contact2Icon size={40} />}
                />)}
            </div>
        </div>
    );
}

function WorkplaceCard({ link, title, description, icon}) {
    return (   
    <Link to={`${link}`} className="workplace-card">
        <div className="card-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
    </Link>        
    );
}
