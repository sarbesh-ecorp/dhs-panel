import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ErrorToast from "../utils/error";

export default function BannerContentMultipleImage() {
    const { id } = useParams();    
    const [contentLoading, setContentLoading] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [bannerDesktop, setBannerDesktop] = useState(null);
    const [bannerMobile, setBannerMobile] = useState(null);    
    const [originalBannerDesktop, setOriginalBannerDesktop] = useState(null);
    const [originalBannerMobile, setOriginalBannerMobile] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const [content, setContent] = useState("");
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [metaKeyword, setMetaKeyword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const extractedPath = path.split("/")[1];

    const apiUrl =
        id === "curriculum"
            ? "https://api.example.com/history"
            : id === "our-approach"
            ? "https://api.example.com/vision-mission"
            : "https://api.example.com/life-at-dharav";

    useEffect(() => {
        const fetchData = async () => {
            try {
                setContentLoading(true);
                const response = await axiosInstance.get(`/banner-content-multipleImage/${extractedPath}/${apiUrl}`);
                
                const fetchedDesktop = response.data[0].desktop_banner ? 
                    `http://localhost:5000/uploads/banner-content-multipleImage/${response.data[0].desktop_banner}` : null;
                const fetchedMobile = response.data[0].mobile_banner ? 
                    `http://localhost:5000/uploads/banner-content-multipleImage/${response.data[0].mobile_banner}` : null;
                
                setContent(response.data[0].content);
                setMetaTitle(response.data[0].meta_title);
                setMetaDescription(response.data[0].meta_description);
                setMetaKeyword(response.data[0].meta_keywords);
                setBannerDesktop(fetchedDesktop);
                setBannerMobile(fetchedMobile);
    
                // Store original images
                setOriginalBannerDesktop(fetchedDesktop);
                setOriginalBannerMobile(fetchedMobile);
    
            } catch (error) {
                setErrorMessage('Data not found');
            } finally {
                setContentLoading(false);
            }
        };
        fetchData();
    }, []);

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

    const convertBlobToFile = async (blobUrl, fileName) => {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        return new File([blob], fileName, { type: blob.type });
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        galleryImages.forEach((image, index) => {
            formData.append(`galleryImage${index + 1}`, image);
        });
        formData.append("content", content);
        formData.append("metaTitle", metaTitle);
        formData.append("metaKeyword", metaKeyword);
        formData.append("metaDescription", metaDescription);

        if (bannerDesktop && bannerDesktop.startsWith("blob:")) {
            const bannerDesktopFile = await convertBlobToFile(bannerDesktop, `${extractedPath}-${id}-desktop_banner.jpg`);
            formData.append("images", bannerDesktopFile);
        }
    
        if (bannerMobile && bannerMobile.startsWith("blob:")) {
            const bannerMobileFile = await convertBlobToFile(bannerMobile, `${extractedPath}-${id}-mobile_banner.jpg`);
            formData.append("images", bannerMobileFile);
        }

        try {
            setLoading(true);
            const response = await axiosInstance.post(`/banner-content-multipleImage/${apiUrl}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            alert(response.data.message);
            navigate(-1);
        } catch (error) {
            console.log(error);
            setErrorMessage("Error submitting data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mainContent">
            {errorMessage && <ErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />}
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
            <div className="banner-card">
                {contentLoading ? <div className="loading">Loading...</div> :
                <>
                <div className="row">
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
                <div className="mt-4">
                    <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>{loading ? 'Submitting' : 'Submit'}</button>
                </div>
                </>
                }
            </div>
        </div>
    );
}
