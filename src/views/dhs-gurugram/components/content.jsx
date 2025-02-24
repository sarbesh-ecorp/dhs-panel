import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";

export default function ContentGurugram() {
    const { id } = useParams();
    const [content, setContent] = useState("");
    const [contentLoading, setContentLoading] = useState(false); 
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const apiUrl =
        id === "theatre"
            ? "theatre"
            : id === "dance" ? 'dance' : id === "sports" ? 'sports' : id === 'pre-nursery-to-class-1' ? 'pre-nursery-to-class-1' : id === "class-2-to-5" ? 'class-2-to-5' : id === 'fees' ? 'fees' : '';

    useEffect(() => {
        const fetchData = async () => {            
            try {
                setContentLoading(true);
                const response = await axiosInstance.get(`/content/dhs-gurugram/${apiUrl}`);
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
            const response = await axiosInstance.post(`/content/${apiUrl}`, {content, website : 'dhs-gurugram'});
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
                <h3>{id === "theatre" ? "Theatre" : id === "dance" ? 'Dance' : id === "sports" ? 'Sports' : id === 'pre-nursery-to-class-1' ? 'Pre Nursery to Class 1' : id === "class-2-to-5" ? 'Class 2 to 5' : id === 'fees' ? 'Fees' : 'UNDEFINED'}</h3>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
            </div>

            {/* Card Layout */}
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

                {/* Submit Button */}
                <div className="mt-4">
                    <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>{loading ? 'Submitting' : 'Submit'}</button>
                </div>
                </>}
            </div>
        </div>
    );
}
