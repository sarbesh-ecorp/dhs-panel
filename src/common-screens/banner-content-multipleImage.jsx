import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ErrorToast from "../utils/error";
import axiosInstance from "../utils/axiosInstance";

export default function BannerContentMultipleImage() {
    const { id } = useParams();    
    const [contentLoading, setContentLoading] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [bannerDesktop, setBannerDesktop] = useState(null);
    const [bannerMobile, setBannerMobile] = useState(null);    
    const [content, setContent] = useState("");
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [metaKeyword, setMetaKeyword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();    
    const [validated, setValidated] = useState(false);
    const location = useLocation();
    const path = location.pathname;
    const extractedPath = path.split("/")[1];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setContentLoading(true);
                const response = await axiosInstance.get(`/banner-content-images/${extractedPath}/${id}`);
                
                const fetchedDesktop = response.data[0].desktop_banner ? 
                    `http://localhost:5000/uploads/banner-content-images/${response.data[0].desktop_banner}` : null;
                const fetchedMobile = response.data[0].mobile_banner ? 
                    `http://localhost:5000/uploads/banner-content-images/${response.data[0].mobile_banner}` : null;
                
                setContent(response.data[0].content);
                setMetaTitle(response.data[0].meta_title);
                setMetaDescription(response.data[0].meta_description);
                setMetaKeyword(response.data[0].meta_keywords);
                setBannerDesktop(fetchedDesktop);
                setBannerMobile(fetchedMobile);               
            } catch (error) {
                setErrorMessage('Data not found');
                console.log(error)
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
        
        const mimeType = blob.type;
        const extension = mimeType.split("/")[1];
    
        return new File([blob], `${fileName}.${extension}`, { type: mimeType });
    };    

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!content || !metaTitle || !content || !metaKeyword || !metaDescription || !bannerDesktop || !bannerMobile) {
            setValidated(true);
            return;
        }
        const formData = new FormData();
        formData.append("website", extractedPath);
        formData.append("content_type", id);
        formData.append("content", content);
        formData.append("meta_title", metaTitle);
        formData.append("meta_keywords", metaKeyword);
        formData.append("meta_description", metaDescription);

        if (bannerDesktop && bannerDesktop.startsWith("blob:")) {
            const bannerDesktopFile = await convertBlobToFile(bannerDesktop, `${extractedPath}-${id}-desktop_banner`);
            formData.append("images", bannerDesktopFile);
        }
    
        if (bannerMobile && bannerMobile.startsWith("blob:")) {
            const bannerMobileFile = await convertBlobToFile(bannerMobile, `${extractedPath}-${id}-mobile_banner`);
            formData.append("images", bannerMobileFile);
        }
        
        
        try {
            setLoading(true);
            const response = await axiosInstance.post(`/banner-content-images/${id}`, formData, {
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
                        : id === "life-at-dharav" ? "Life At Dharav" : id === "school-campus"
                        ? "School Campus"
                        : id === "labs" ? 'Labs' : id === "sports" ? 'Sports' : id === 'other-facilities' ? 'Other Facilities' : id === "primary" ? 'Primary' : id === 'pedagogy' ? 'Pedagogy' : id === 'technology' ? 'Technology' : id === 'visual-art' ? 'Visual Art' : id === 'performing-arts' ? 'Performing Arts' : id === 'music' ? 'Music' : id === 'health-n-wellness' ? 'Health and Wellness'
                        : id === "boarding-house" ? 'Boarding House' : id === "scholarship" ? 'Scholarship' : id === 'foreign-language' ? 'Foreign Language' : id === 'sports' ? 'Sports' : id === 'boarding-house' ? 'Boarding House' : id === 'a-day-in-life-of-boarder' ? 'A Day in Life of Boarder' : 'UNDEFINED' } ({extractedPath})
                </h3>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                    Back
                </button>
            </div>
            <div className="banner-card">
                {contentLoading ? <div className="loading">Loading...</div> :
                <form noValidate onSubmit={handleSubmit} className={validated ? "was-validated" : ""}>
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
                            required
                        />
                        <div className="invalid-feedback">Desktop Banner is required.</div>
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
                            required
                        />
                        <div className="invalid-feedback">Mobile Banner is required.</div>
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
                            required
                        />
                        <div className="invalid-feedback">Meta title is required.</div>
                    </div>
                    <div className="col-md-6 mt-4">
                        <label className="form-label">Meta Description</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter meta description..."
                            value={metaDescription}
                            onChange={(e) => setMetaDescription(e.target.value)}
                            required
                        />
                        <div className="invalid-feedback">Meta description is required.</div>
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
                        required
                    ></textarea>
                    <div className="invalid-feedback">Meta keywords is required.</div>
                </div>
                <div className="mt-4">
                    <label className="form-label">Content</label>
                    <textarea
                        className="form-control"
                        rows={5}
                        placeholder="Enter details..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                    <div className="invalid-feedback">Content is required.</div>
                </div>
                <div className="mt-4">
                    <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Submitting' : 'Submit'}</button>
                </div>
                </form>
                }
            </div>
        </div>
    );
}
