import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ErrorToast from "../utils/error";
import axiosInstance from "../utils/axiosInstance";

export default function BoardManagement() {
    const [contentLoading, setContentLoading] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const extractedPath = path.split("/")[1];
    const {id} = useParams();

    useEffect(() => {
        const fetchData = async () => {            
            try {
                setContentLoading(true);
                const response = await axiosInstance.get(`/board-of-management//byID/${id}`);
                setName(response.data[0].name);
                setDesignation(response.data[0].designation);
                setContent(response.data[0].content);
                const fetchedImage = response.data[0].member_image ? 
                    `http://localhost:5000/uploads/board-of-management/${response.data[0].member_image}` : null;
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
        return new File([blob], fileName, { type: blob.type });
    };   

    const handleSubmit = async () => {
        const imageFile = await convertBlobToFile(image, `${extractedPath}-${id}-${name}.jpg`);
        const formData = new FormData();
        formData.append("website", extractedPath);
        formData.append("name", name);
        formData.append("designation", designation);
        formData.append("content", content);
        formData.append("image", imageFile );

        try {
            setLoading(true);
            let response;
            id === 'new' ? response = await axiosInstance.post(`/board-of-management`, formData,
                {
                headers: { 
                    "Content-Type": "multipart/form-data"
                }}
            ) : response = await axiosInstance.put(`/board-of-management/${id}`, formData,
                {
                headers: { 
                    "Content-Type": "multipart/form-data"
                }}
            );
            alert(response.data.message);
            navigate(-1);
        } catch (error) {
            setErrorMessage("Error submitting data");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="mainContent">
            {errorMessage && <ErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />}
            {/* Header Section */}
            <div className="banner-header">
                <h3>Board Member ({extractedPath})</h3>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
            </div>           

            {/* Card Layout */}
            <div className="banner-card">
            {contentLoading ? <div className="loading">Loading...</div> :
                 <>

                <div className="row mt-4">
                    {/* Name */}
                    <div className="col-md-6">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" placeholder="Enter name..." value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    {/* Designation */}
                    <div className="col-md-6">
                        <label className="form-label">Designation</label>
                        <input type="text" className="form-control" placeholder="Enter designation..." value={designation} onChange={(e) => setDesignation(e.target.value)} />
                    </div>
                </div>

                {/* Details */}
                <div className="mt-4">
                    <label className="form-label">Details (Semi-colon-Separated)</label>
                    <textarea className="form-control" rows={3} placeholder="Enter details separated by semi-colons..." value={content} onChange={(e) => setContent(e.target.value)}></textarea>
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
                    <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>{loading ? 'Submitting' : 'Submit'}</button>
                </div>
                </>}
            </div>
        </div>
    );
}
