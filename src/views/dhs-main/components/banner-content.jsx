import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";

export default function BannerContent() {
    const { id } = useParams();
    const [contentLoading, setContentLoading] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [bannerDesktop, setBannerDesktop] = useState(null);
    const [bannerMobile, setBannerMobile] = useState(null);
    const [content, setContent] = useState("");
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [metaKeyword, setMetaKeyword] = useState("");
    const navigate = useNavigate();

    const apiUrl = id === "history" 
        ? "history" 
        : "vision-mission";

    useEffect(() => {
        const fetchData = async () => {            
            try {
                setContentLoading(true);
                const response = await axiosInstance.get(`/banner-content/dhs-main/${apiUrl}`);
                console.log(response)
                setContent(response.data[0].content);
                setMetaTitle(response.data[0].meta_title);
                setMetaDescription(response.data[0].meta_description);
                setMetaKeyword(response.data[0].meta_keywords);
            } catch (error) {
                alert('Data not found');
            } finally {
                setContentLoading(false);
            }
        };
        fetchData();
    },[id]) 
    
    const handleImageChange = (event, setImage) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const convertBlobToFile = async (blobUrl, fileName) => {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        return new File([blob], fileName, { type: blob.type });
    };   

    const handleSubmit = async () => {
        const bannerDesktopFile = await convertBlobToFile(bannerDesktop, `${id} + desktop_banner.jpg`);
        const bannerMobileFile = await convertBlobToFile(bannerMobile, `${id} + mobile_banner.jpg`);
        const formData = new FormData();
        formData.append("website", "dhs-main");
        formData.append("content_type", id);
        formData.append("images", bannerDesktopFile);
        formData.append("images", bannerMobileFile);
        formData.append("content", content);
        formData.append("meta_title", metaTitle);
        formData.append("meta_keywords", metaKeyword);
        formData.append("meta_description", metaDescription);
        
        try {
            setLoading(true);
            const response = await axiosInstance.post(`/banner-content/${apiUrl}`, formData, 
                {
                headers: { 
                    "Content-Type": "multipart/form-data"
                }}
            );
            alert(response.data.message);
            navigate(-1);
        } catch (error) {
            console.log(error);
            alert("Error submitting data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mainContent">
            {/* Header Section */}
            <div className="banner-header">
                <h3>{id === "history" ? "History" : "Vision & Mission"}</h3>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
            </div>

            <div className="banner-card">
            {contentLoading ? <div className="loading">Loading...</div> :
                 <>
                {/* Banner Image Upload Section */}
                <div className="row">
                    <div className="col-md-6">
                        <label className="form-label">Desktop Banner Image</label>
                        <div className="image-preview">
                            {bannerDesktop && <img src={bannerDesktop} alt="Desktop Preview" />}
                        </div>
                        <input type="file" className="form-control" accept="image/*" onChange={(e) => handleImageChange(e, setBannerDesktop)} />
                    </div>
                    
                    <div className="col-md-6">
                        <label className="form-label">Mobile Banner Image</label>
                        <div className="image-preview">
                            {bannerMobile && <img src={bannerMobile} alt="Mobile Preview" />}
                        </div>
                        <input type="file" className="form-control" accept="image/*" onChange={(e) => handleImageChange(e, setBannerMobile)} />
                    </div>
                </div>

                {/* Meta Details Section */}
                <div className="row">
                    <div className="col-md-6 mt-4">
                        <label className="form-label">Meta Title</label>
                        <input type="text" className="form-control" placeholder="Enter meta title..." value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
                    </div>

                    <div className="col-md-6 mt-4">
                        <label className="form-label">Meta Description</label>
                        <input type="text" className="form-control" placeholder="Enter meta description..." value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />
                    </div>
                </div>

                <div className="mt-4">
                    <label className="form-label">Meta Keywords</label>
                    <textarea className="form-control" rows={2} placeholder="Enter meta keywords..." value={metaKeyword} onChange={(e) => setMetaKeyword(e.target.value)}></textarea>
                </div>

                {/* Content Section */}
                <div className="mt-4">
                    <label className="form-label">Content</label>
                    <textarea className="form-control" rows={5} placeholder="Enter content details..." value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                </div>

                {/* Submit Button */}
                <div className="mt-4">
                    <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>{loading ? 'Submitting' : 'Submit'}</button>
                </div>
                </>}
            </div>
        </div>
    );
}
