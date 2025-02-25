import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import ErrorToast from "../utils/error";

export default function Content() {
    const { id } = useParams();
    const [errorMessage, setErrorMessage] = useState("");
    const [contentLoading, setContentLoading] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const extractedPath = path.split("/")[1];

    const apiUrl = id === "history-dhs-home" ? "history" :  id === "our-approach-dhs-home" ? 'our-approach' : id === "theatre"
    ? "theatre"
    : id === "dance" ? 'dance' : id === "sports" ? 'sports' : id === 'pre-nursery-to-class-1' ? 'pre-nursery-to-class-1' : id === "class-2-to-5" ? 'class-2-to-5' : id === 'fees' ? 'fees' : id === "smart-classroom"
    ? "smart-classroom"
    : id === "career-counselling" ? 'career-counselling' : id === "rules-n-regulations" ? 'rules-n-regulations' : id === 'meals' ? 'meals' : id === "admission-information" ? 'admission-information' : id === 'fees' ? 'fees' : id === 'transport' ? 'transport' : null;

    useEffect(() => {
        const fetchData = async () => {            
            try {
                setContentLoading(true);
                const response = await axiosInstance.get(`/content/${extractedPath}/${apiUrl}`);
                setContent(response.data[0].content);
            } catch (error) {
                setErrorMessage('Data not found');
            } finally {
                setContentLoading(false);
            }
        };
        fetchData();
    },[id])    

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.post(`/content/${apiUrl}`, {content, website : extractedPath});
            alert(response.data.message);
            navigate(-1);
        } catch (error) {
            setErrorMessage("Error submitting data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mainContent">
            {errorMessage && <ErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />}
            {/* Header Section */}
            <div className="banner-header">
                <h3>{id === "history-dhs-home" ? "History (Home Page)" : id === "our-approach-dhs-home" ? 'Our Approach (Home Page)' : id === "theatre" ? "Theatre" : id === "dance" ? 'Dance' : id === "sports" ? 'Sports' : id === 'pre-nursery-to-class-1' ? 'Pre Nursery to Class 1' : id === "class-2-to-5" ? 'Class 2 to 5' : id === 'fees' ? 'Fees' : id === "smart-classroom"
            ? "Smart Classroom"
            : id === "career-counselling" ? 'Career Counselling' : id === "rules-n-regulations" ? 'Rules & Regulations' : id === 'meals' ? 'Meals' : id === "admission-information" ? 'Admission Information' : id === 'fees' ? 'Fees' : id === 'transport' ? 'Transport' : 'UNDEFINED'} ({extractedPath}) </h3>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
            </div>

            <div className="banner-card">
                 {contentLoading ? <div className="loading">Loading...</div> :
                 <>
                 <label className="form-label">Enter Content</label>
                <textarea
                    className="form-control"
                    rows={5}
                    placeholder="Enter content details..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>

                <div className="mt-4">
                    <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>{loading ? 'Submitting' : 'Submit'}</button>
                </div>
                </>}
            </div>
        </div>
    );
}
