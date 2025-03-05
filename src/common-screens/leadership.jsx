import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ErrorToast from "../utils/error";
import axiosInstance from "../utils/axiosInstance";

export default function Leadership() {
    const [contentLoading, setContentLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [school, setSchool] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const extractedPath = path.split("/")[1];
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setContentLoading(true);
                const response = await axiosInstance.get(`/leadership/byID/${id}`);
                setName(response.data[0].name);
                setDesignation(response.data[0].designation);
                setContent(response.data[0].content);
                setSchool(response.data[0].school);
                const fetchedImage = response.data[0].member_image ? 
                    `https://www.dharavhighschool.org/api/uploads/leadership/${response.data[0].member_image}` : null;
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
    }, [id]);

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
        if (!name || !designation || !content || !school || !image) {
            setValidated(true);
            return;
        }

        const imageFile = await convertBlobToFile(image, `${extractedPath}-${id}-${name}`);
        const formData = new FormData();
        formData.append("website", extractedPath);
        formData.append("name", name);
        formData.append("designation", designation);
        formData.append("content", content);
        formData.append("image", imageFile);
        formData.append("school", school);

        try {
            setLoading(true);
            let response;
            id === 'new' ? response = await axiosInstance.post(`/leadership`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            }) : response = await axiosInstance.put(`/leadership/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
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
            <div className="banner-header">
                <h3>Leadership ({extractedPath})</h3>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
            </div>
            <div className="banner-card">
                {contentLoading ? <div className="loading">Loading...</div> :
                    <form noValidate onSubmit={handleSubmit} className={validated ? "was-validated" : ""}>
                        <div className="row mt-4">
                            <div className="col-md-4">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" placeholder="Enter name..." value={name} onChange={(e) => setName(e.target.value)} required />
                                <div className="invalid-feedback">Name is required.</div>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Designation</label>
                                <input type="text" className="form-control" placeholder="Enter designation..." value={designation} onChange={(e) => setDesignation(e.target.value)} required />
                                <div className="invalid-feedback">Designation is required.</div>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">School</label>
                                <input type="text" className="form-control" placeholder="Enter school..." value={school} onChange={(e) => setSchool(e.target.value)} required />
                                <div className="invalid-feedback">School is required.</div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="form-label">Details (Semi-colon-Separated)</label>
                            <textarea className="form-control" rows={3} placeholder="Enter details separated by semi-colons..." value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
                            <div className="invalid-feedback">Details are required.</div>
                        </div>
                        <div className="image-upload mt-4 text-center">
                            <label className="form-label">Upload Image</label>
                            <div className="image-preview">
                                {image && <img src={image} alt="Preview" />}
                            </div>
                            <input type="file" className="form-control mt-2" accept="image/*" onChange={handleImageChange} required />
                            <div className="invalid-feedback">Image is required.</div>
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
