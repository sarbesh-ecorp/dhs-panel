import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ContentGurugram() {
    const { id } = useParams();
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const apiUrl =
        id === "theatre"
            ? ""
            : id === "dance" ? '' : id === "sports" ? '' : id === 'pre-nursery-to-class-1' ? '' : id === "class-2-to-5" ? '' : id === 'fees' ? '' : '';

    const handleSubmit = async () => {
        const data = { content };

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log("Response:", result);
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    return (
        <div className="mainContent">
            {/* Header Section */}
            <div className="banner-header">
                <h3>{id === "theatre" ? "Theatre" : id === "dance" ? 'Dance' : id === "sports" ? 'Sports' : id === 'pre-nursery-to-class-1' ? 'Pre Nursery to Class 1' : id === "class-2-to-5" ? 'Class 2 to 5' : id === 'fees' ? 'Fees' : ''}</h3>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
            </div>

            {/* Card Layout */}
            <div className="banner-card">
                <label className="form-label">Enter Content</label>
                <textarea
                    className="form-control"
                    rows={5}
                    placeholder="Enter content details..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>

                {/* Submit Button */}
                <div className="text-center mt-4">
                    <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
}
