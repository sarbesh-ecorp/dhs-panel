import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ContentImageHeadingBhankrota() {
    const {id} = useParams();
    const [heading, setHeading] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const apiUrl = id === "about" 
        ? "https://api.example.com/about" 
        : "https://api.example.com/infrastructure";

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("heading", heading);
        formData.append("content", content);
        formData.append("image", image);

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                body: formData,
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
                <h3>{id === 'about' ? 'About' : 'Infrastructure'} (Home Page)</h3>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
            </div>

            {/* Card Layout */}
            <div className="banner-card">
                
                
                    
                    <div className="col-md-6">
                        <label className="form-label">Heading</label>
                        <input type="text" className="form-control" placeholder="Enter heading..." value={heading} onChange={(e) => setHeading(e.target.value)} />
                    </div>

                {/* Details */}
                <div className="mt-4">
                    <label className="form-label">Content</label>
                    <textarea className="form-control" rows={3} placeholder="Enter content..." value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                </div>

                {/* Image Upload */}
                <div className="image-upload mt-4 text-center">
                    <label className="form-label">Upload Image</label>
                    <div className="image-preview">
                        {image && <img src={image} alt="Preview" />}
                    </div>
                    <input type="file" className="form-control mt-2" accept="image/*" onChange={handleImageChange} />
                </div>

                {/* Submit Button */}
                <div className="mt-4">
                    <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
}
