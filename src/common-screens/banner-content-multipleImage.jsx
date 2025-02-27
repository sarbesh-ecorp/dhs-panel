import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ErrorToast from "../utils/error";
import axiosInstance from "../utils/axiosInstance";

export default function BannerContentMultipleImage() {
    const { id } = useParams();    
    const [fetchedData, setFetchedData] = useState(false);
    const [contentLoading, setContentLoading] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [bannerDesktop, setBannerDesktop] = useState(null);
    const [bannerMobile, setBannerMobile] = useState(null);    
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                setContentLoading(true);
                const response = await axiosInstance.get(`/banner-content-images/${extractedPath}/${id}`);
                
                const fetchedDesktop = response.data[0].desktop_banner ? 
                    `http://localhost:5000/uploads/banner-content-images/${response.data[0].desktop_banner}` : null;
                const fetchedMobile = response.data[0].mobile_banner ? 
                    `http://localhost:5000/uploads/banner-content-images/${response.data[0].mobile_banner}` : null;
                const fetchedGalleryImages = response.data[0].images.map(
                    (img) => `http://localhost:5000/uploads/banner-content-images/${img}`
                );
                
                setContent(response.data[0].content);
                setMetaTitle(response.data[0].meta_title);
                setMetaDescription(response.data[0].meta_description);
                setMetaKeyword(response.data[0].meta_keywords);
                setBannerDesktop(fetchedDesktop);
                setBannerMobile(fetchedMobile);               
                setGalleryImages(fetchedGalleryImages);
                setFetchedData(true);               
    
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
        
        const mimeType = blob.type;
        const extension = mimeType.split("/")[1];
    
        return new File([blob], `${fileName}.${extension}`, { type: mimeType });
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
            const bannerDesktopFile = await convertBlobToFile(bannerDesktop, `${extractedPath}-${id}-desktop_banner`);
            formData.append("images", bannerDesktopFile);
        }
    
        if (bannerMobile && bannerMobile.startsWith("blob:")) {
            const bannerMobileFile = await convertBlobToFile(bannerMobile, `${extractedPath}-${id}-mobile_banner`);
            formData.append("images", bannerMobileFile);
        }
        
        const galleryFiles = await Promise.all(
            galleryImages.map(async (image, index) => {
                if (image.startsWith("blob:")) {
                    return await convertBlobToFile(image, `${extractedPath}-${id}-gallery-image-${index}`);
                }
                return null;
            })
        );
    
        galleryFiles.forEach((file) => {
            if (file) {
                formData.append("images", file);
            }
        }); 

        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
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
                                {fetchedData && (
                                    <div className="gallery-item-fetched">
                                        <button className="close-btn">×</button>
                                    </div>
                                )}
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
