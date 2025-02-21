import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BhankrotaLeadership() {
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [details, setDetails] = useState("");
    const [image, setImage] = useState(null);
    const [school, setSchool] = useState("");
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [metaKeyword, setMetaKeyword] = useState("");
    const navigate = useNavigate();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("designation", designation);
        formData.append("details", details);
        formData.append("image", image);
        formData.append("school", school);
        formData.append("metaTitle", metaTitle);
        formData.append("metaKeyword", metaKeyword);
        formData.append("metaDescription", metaDescription);

        try {
            const apiUrl = "https://localhost";
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
                <h3>Leadership</h3>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
            </div>

            {/* Card Layout */}
            <div className="banner-card">
                <div className="row">
                    {/* Meta Title */}
                    <div className="col-md-6">
                        <label className="form-label">Meta Title</label>
                        <input type="text" className="form-control" placeholder="Enter meta title..." value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
                    </div>

                    {/* Meta Description */}
                    <div className="col-md-6">
                        <label className="form-label">Meta Description</label>
                        <input type="text" className="form-control" placeholder="Enter meta description..." value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />
                    </div>
                </div>

                {/* Meta Keywords */}
                <div className="mt-4">
                    <label className="form-label">Meta Keywords</label>
                    <textarea className="form-control" rows={2} placeholder="Enter meta keywords..." value={metaKeyword} onChange={(e) => setMetaKeyword(e.target.value)}></textarea>
                </div>

                <div className="row mt-4">
                    {/* Name */}
                    <div className="col-md-4">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" placeholder="Enter name..." value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    {/* Designation */}
                    <div className="col-md-4">
                        <label className="form-label">Designation</label>
                        <input type="text" className="form-control" placeholder="Enter designation..." value={designation} onChange={(e) => setDesignation(e.target.value)} />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">School</label>
                        <input type="text" className="form-control" placeholder="Enter school..." value={school} onChange={(e) => setSchool(e.target.value)} />
                    </div>
                </div>

                {/* Details */}
                <div className="mt-4">
                    <label className="form-label">Details (Comma-Separated)</label>
                    <textarea className="form-control" rows={3} placeholder="Enter details separated by commas..." value={details} onChange={(e) => setDetails(e.target.value)}></textarea>
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
                <div className="text-center mt-4">
                    <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
}
