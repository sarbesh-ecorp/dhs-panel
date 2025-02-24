import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function BannerContentMultipleImage() {
    const { id } = useParams();
    const [bannerDesktop, setBannerDesktop] = useState(null);
    const [bannerMobile, setBannerMobile] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const [content, setContent] = useState("");
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [metaKeyword, setMetaKeyword] = useState("");
    const navigate = useNavigate();

    const apiUrl =
        id === "curriculum"
            ? "https://api.example.com/history"
            : id === "our-approach"
            ? "https://api.example.com/vision-mission"
            : "https://api.example.com/life-at-dharav";

    const handleImageChange = (event, setImage) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleGalleryChange = (event) => {
        const files = Array.from(event.target.files);
        const imagePreviews = files.map((file) => URL.createObjectURL(file));
        setGalleryImages((prevImages) => [...prevImages, ...imagePreviews]);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("bannerDesktop", bannerDesktop);
        formData.append("bannerMobile", bannerMobile);
        galleryImages.forEach((image, index) => {
            formData.append(`galleryImage${index + 1}`, image);
        });
        formData.append("content", content);
        formData.append("metaTitle", metaTitle);
        formData.append("metaKeyword", metaKeyword);
        formData.append("metaDescription", metaDescription);

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
                <h3>
                    {id === "curriculum"
                        ? "Curriculum"
                        : id === "our-approach"
                        ? "Our Approach"
                        : "Life At Dharav"}
                </h3>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                    Back
                </button>
            </div>

            {/* Card Layout */}
            <div className="banner-card">
                <div className="row">
                    {/* Desktop Banner */}
                    <div className="col-md-6">
                        <label className="form-label">Desktop Banner Image</label>
                        <div className="image-preview">
                            {bannerDesktop && <img src={bannerDesktop} alt="Desktop Preview" />}
                        </div>
                        <input
                            type="file"
                            className="form-control mt-2"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, setBannerDesktop)}
                        />
                    </div>

                    {/* Mobile Banner */}
                    <div className="col-md-6">
                        <label className="form-label">Mobile Banner Image</label>
                        <div className="image-preview">
                            {bannerMobile && <img src={bannerMobile} alt="Mobile Preview" />}
                        </div>
                        <input
                            type="file"
                            className="form-control mt-2"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, setBannerMobile)}
                        />
                    </div>
                </div>

                {/* Meta Details */}
                <div className="row">
                    <div className="col-md-6 mt-4">
                        <label className="form-label">Meta Title</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter meta title..."
                            value={metaTitle}
                            onChange={(e) => setMetaTitle(e.target.value)}
                        />
                    </div>

                    <div className="col-md-6 mt-4">
                        <label className="form-label">Meta Description</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter meta description..."
                            value={metaDescription}
                            onChange={(e) => setMetaDescription(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <label className="form-label">Meta Keywords</label>
                    <textarea
                        className="form-control"
                        rows={2}
                        placeholder="Enter meta keywords..."
                        value={metaKeyword}
                        onChange={(e) => setMetaKeyword(e.target.value)}
                    ></textarea>
                </div>

                <div className="mt-4">
                    <label className="form-label">Content</label>
                    <textarea
                        className="form-control"
                        rows={5}
                        placeholder="Enter details..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>

                {/* Gallery Upload */}
                <div className="image-upload mt-4">
                    <label className="form-label">Gallery Images</label>
                    <input type="file" className="form-control mt-2" accept="image/*" multiple onChange={handleGalleryChange} />
                    <div className="gallery-grid mt-3">
                        {galleryImages.map((img, index) => (
                            <div key={index} className="gallery-item">
                                <img src={img} alt={`Gallery Preview ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-4">
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
