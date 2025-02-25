import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import ErrorToast from "../utils/error";

export default function BannerContent() {
    const { id } = useParams();
    const [contentLoading, setContentLoading] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [originalBannerDesktop, setOriginalBannerDesktop] = useState(null);
    const [originalBannerMobile, setOriginalBannerMobile] = useState(null);
    const [bannerDesktop, setBannerDesktop] = useState(null);
    const [bannerMobile, setBannerMobile] = useState(null);
    const [content, setContent] = useState("");
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [metaKeyword, setMetaKeyword] = useState("");    
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const extractedPath = path.split("/")[1];

    const apiUrl = id === "history" 
        ? "history" 
        : id === 'vision-n-mission' ? "vision-mission" : id === "house-system" 
        ? "house-system" 
        : id === 'pravaah' ? "pravaah" : id === 'shiksha-kendra' ? 'shiksha-kendra' : id === 'learner-centric-programmes' ? 'learner-centric-programmes' : id === 'our-school' ? "our-school" : null;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setContentLoading(true);
                const response = await axiosInstance.get(`/banner-content/${extractedPath}/${apiUrl}`);
                
                const fetchedDesktop = response.data[0].desktop_banner ? 
                    `http://localhost:5000/uploads/banner-content/${response.data[0].desktop_banner}` : null;
                const fetchedMobile = response.data[0].mobile_banner ? 
                    `http://localhost:5000/uploads/banner-content/${response.data[0].mobile_banner}` : null;
                
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

    const convertBlobToFile = async (blobUrl, fileName) => {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        return new File([blob], fileName, { type: blob.type });
    };   

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("website", extractedPath);
        formData.append("content_type", id);
        formData.append("content", content);
        formData.append("meta_title", metaTitle);
        formData.append("meta_keywords", metaKeyword);
        formData.append("meta_description", metaDescription);
    
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
            const response = await axiosInstance.post(`/banner-content/${apiUrl}`, formData, {
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
                <h3>{id === "history" ? "History" : id === "house-system" ? "House System" : id === 'pravaah' ? "Pravaah" : id === 'shiksha-kendra' ? 'Shiksha Kendra' : id === 'learner-centric-programmes' ? 'Learner Centric Programmes' : id === 'our-school' ? "Our School" : id === 'vision-n-mission' ? "Vision & MIssion" : 'UNDEFINED'} ({extractedPath})</h3>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
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
                <div className="mt-4">
                    <label className="form-label">Content</label>
                    <textarea className="form-control" rows={5} placeholder="Enter content details..." value={content} onChange={(e) => setContent(e.target.value)}></textarea>
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
