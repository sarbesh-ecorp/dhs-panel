import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import ErrorToast from "../utils/error";

export default function ContentImageHeading() {
    const {id} = useParams();
    const [contentLoading, setContentLoading] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [heading, setHeading] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [validated, setValidated] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const extractedPath = path.split("/")[1];

    useEffect(() => {
        const fetchData = async () => {            
            try {
                setContentLoading(true);
                const response = await axiosInstance.get(`/heading-content-image/${extractedPath}/${id}`);
                setHeading(response.data[0].heading);
                setContent(response.data[0].content);
                const fetchedImage = response.data[0].image ? 
                    `http://localhost:5000/uploads/heading-content-image/${response.data[0].image}` : null;
                setImage(fetchedImage);
            } catch (error) {
                setErrorMessage('Data not found');
            } finally {
                setContentLoading(false);
            }
        };
        if (id !== 'new') {
            fetchData();        
        }        
    },[id])

    const handleImageChange = (event) => {
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
        if (!heading || !content || !image) {
            setValidated(true);
            return;
        }
        const imageFile = await convertBlobToFile(image, `${extractedPath}-${id}`);
        const formData = new FormData();
        formData.append("website", extractedPath);
        formData.append("content_type", id);
        formData.append("heading", heading);
        formData.append("content", content);
        formData.append("image", imageFile);

        try {
            setLoading(true);
            const response = await axiosInstance.post(`/heading-content-image/${id}`, formData, {
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
                <h3>{id === 'about' ? 'About' : 'Infrastructure'} (Home Page) ({extractedPath})</h3>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
            </div>
            <div className="banner-card">
                {contentLoading ? <div className="loading">Loading...</div> :
                <form noValidate onSubmit={handleSubmit} className={validated ? "was-validated" : ""}>
                <div className="col-md-6">
                    <label className="form-label">Heading</label>
                    <input type="text" className="form-control" placeholder="Enter heading..." value={heading} onChange={(e) => setHeading(e.target.value)} required/>
                    <div className="invalid-feedback">Heading is required.</div>
                </div>
                <div className="mt-4">
                    <label className="form-label">Content</label>
                    <textarea className="form-control" rows={3} placeholder="Enter content..." value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
                    <div className="invalid-feedback">Content is required.</div>
                </div>
                <div className="image-upload mt-4 text-center">
                    <label className="form-label">Upload Image</label>
                    <div className="image-preview">
                        {image && <img src={image} alt="Preview" />}
                    </div>
                    <input type="file" className="form-control mt-2" accept="image/*" onChange={handleImageChange} required/>
                    <div className="invalid-feedback">Image is required.</div>
                </div>
                <div className="mt-4">
                    <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>{loading ? 'Submitting' : 'Submit'}</button>
                </div>
                </form>
                }
            </div>
        </div>
    );
}
