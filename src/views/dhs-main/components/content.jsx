import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";

export default function Content() {
    const { id } = useParams();
    const [contentLoading, setContentLoading] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const apiUrl = id === "history-dhs-home" ? "history" : "our-approach";

    useEffect(() => {
        const fetchData = async () => {            
            try {
                setContentLoading(true);
                const response = await axiosInstance.get(`/content/dhs-main/${apiUrl}`);
                setContent(response.data[0].content);
            } catch (error) {
                alert('Data not found');
            } finally {
                setContentLoading(false);
            }
        };
        fetchData();
    },[id])    

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.post(`/content/${apiUrl}`, {content, website : 'dhs-main'});
            alert(response.data.message);
            navigate(-1);
        } catch (error) {
            alert("Error submitting data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mainContent">
            {/* Header Section */}
            <div className="banner-header">
                <h3>{id === "history-dhs-home" ? "History" : "Our Approach"} (Home Page)</h3>
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
