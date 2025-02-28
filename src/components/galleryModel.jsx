import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axiosInstance from "../utils/axiosInstance";
import ErrorToast from "../utils/error";

function GalleryModal({ show, handleClose, link }) {
    const website = link.split("/")[1];
    const contentType = link.split("/")[3];

    const [fetchedImages, setFetchedImages] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);
    const [contentLoading, setContentLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setContentLoading(true);
            try {
                const response = await axiosInstance.get(`/banner-content-images/gallery-images/${website}/${contentType}`);
                const fetchedGalleryImages = response.data[0].images ? response.data[0].images.map(
                        (img) => `http://localhost:5000/uploads/banner-content-images/${img}`
                    ) : '';
                setFetchedImages(fetchedGalleryImages);
            } catch (error) {
                console.log(error);
                setErrorMessage("Data not found");
            } finally {
                setContentLoading(false);
            }
        };
        if (website && contentType) {
            fetchData();
        }
    }, [website, contentType]);

    const handleGalleryChange = (event) => {
        const files = Array.from(event.target.files);
        if (fetchedImages.length + galleryImages.length + files.length > 5) {
            setErrorMessage("You can upload up to 5 images only.");
            return;
        }

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!galleryImages.length) {
            setValidated(true);
            return;
        }

        const formData = new FormData();
        formData.append("website", website);
        formData.append("content_type", contentType);

        const galleryFiles = await Promise.all(
            galleryImages
                .filter((image) => image.startsWith("blob:"))
                .map(async (image, index) => convertBlobToFile(image, `${website}-${contentType}-gallery-image-${index}`))
        );

        galleryFiles.forEach((file) => {
            if (file) {
                formData.append("images", file);
            }
        });

        try {
            setLoading(true);
            const response = await axiosInstance.post(`/banner-content-images/gallery-images/${website}/${contentType}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            alert(response.data.message);
        } catch (error) {
            setErrorMessage("Error submitting data");
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await axiosInstance.put(`/banner-content-images/gallery-images/status/${id}`, { status: status === 1 ? 0 : 1 });
            const updatedData = fetchedImages.map((data) => {
                if (data.id === id) {
                    data.status = status === 1 ? 0 : 1;
                }
                return data;
            });
            setFetchedImages(updatedData);
        } catch (error) {
            setErrorMessage('Failed to update status');
        }
    };

    const deleteData = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this item?");
        if (!isConfirmed) return;
    
        try {
            await axiosInstance.delete(`/banner-content-images/gallery-images/${id}`);
            const updatedData = fetchedImages.filter((data) => data.id !== id);
            setFetchedImages(updatedData);
        } catch (error) {
            setErrorMessage("Failed to delete data");
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            {errorMessage && <ErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />}
            <Modal.Header closeButton>
                <Modal.Title>Gallery Image</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="image-upload mt-4">
                    <label className="form-label">Gallery Images</label>
                    <form noValidate className={validated ? "was-validated" : ""}>
                        <input
                            type="file"
                            className="form-control mt-2"
                            accept="image/*"
                            multiple
                            onChange={handleGalleryChange}
                            required
                            disabled={fetchedImages.length + galleryImages.length >= 5}
                        />
                        <div className="invalid-feedback">Gallery Images are required.</div>
                        {galleryImages.length > 0 && (
                            <>
                                <label className="mt-4">Selected Images</label>
                                <div className="gallery-grid mt-3">
                                    {galleryImages.map((img, index) => (
                                        <div key={index} className="gallery-item">
                                            <img src={img} alt={`Gallery Preview ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </form>
                    {fetchedImages.length > 0 && (
                        <>
                        <label className="mt-4">Fetched Images</label>
                        <div className="gallery-grid mt-3">
                            {fetchedImages.map((img, index) => (
                                <div key={index} className="gallery-item">
                                    <img src={img} alt={`Fetched Preview ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                        </>
                    )}
                    {contentLoading && <div className="loading">Loading...</div>}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Submitting" : "Submit"}
                </Button>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default GalleryModal;




// import React, { useEffect, useState } from "react";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import axiosInstance from "../utils/axiosInstance";
// import ErrorToast from "../utils/error";
// import { FaTimes, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// function GalleryModal({ show, handleClose, link }) {
//     const website = link.split("/")[1];
//     const contentType = link.split("/")[3];

//     const [fetchedImages, setFetchedImages] = useState([]);
//     const [galleryImages, setGalleryImages] = useState([]);
//     const [contentLoading, setContentLoading] = useState(false);
//     const [errorMessage, setErrorMessage] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [validated, setValidated] = useState(false);

//     useEffect(() => {
//         const fetchData = async () => {
//             setContentLoading(true);
//             try {
//                 const response = await axiosInstance.get(`/banner-content-images/gallery-images/${website}/${contentType}`);
//                 const fetchedGalleryImages = response.data[0]?.images?.map(img => ({
//                     id: img.id,
//                     url: `http://localhost:5000/uploads/banner-content-images/${img.filename}`,
//                     status: img.status
//                 })) || [];
//                 setFetchedImages(fetchedGalleryImages);
//             } catch (error) {
//                 console.log(error);
//                 setErrorMessage("Data not found");
//             } finally {
//                 setContentLoading(false);
//             }
//         };
//         if (website && contentType) {
//             fetchData();
//         }
//     }, [website, contentType]);

//     const handleGalleryChange = (event) => {
//         const files = Array.from(event.target.files);
//         if (fetchedImages.length + galleryImages.length + files.length > 5) {
//             setErrorMessage("You can upload up to 5 images only.");
//             return;
//         }

//         const imagePreviews = files.map((file) => URL.createObjectURL(file));
//         setGalleryImages((prevImages) => [...prevImages, ...imagePreviews]);
//     };

//     const convertBlobToFile = async (blobUrl, fileName) => {
//         const response = await fetch(blobUrl);
//         const blob = await response.blob();
//         const mimeType = blob.type;
//         const extension = mimeType.split("/")[1];
//         return new File([blob], `${fileName}.${extension}`, { type: mimeType });
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         if (!galleryImages.length) {
//             setValidated(true);
//             return;
//         }

//         const formData = new FormData();
//         formData.append("website", website);
//         formData.append("content_type", contentType);

//         const galleryFiles = await Promise.all(
//             galleryImages
//                 .filter((image) => image.startsWith("blob:"))
//                 .map(async (image, index) => convertBlobToFile(image, `${website}-${contentType}-gallery-image-${index}`))
//         );

//         galleryFiles.forEach((file) => {
//             if (file) {
//                 formData.append("images", file);
//             }
//         });

//         try {
//             setLoading(true);
//             const response = await axiosInstance.post(`/banner-content-images/gallery-images/${website}/${contentType}`, formData, {
//                 headers: { "Content-Type": "multipart/form-data" }
//             });
//             alert(response.data.message);
//         } catch (error) {
//             setErrorMessage("Error submitting data");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const updateStatus = async (id, currentStatus) => {
//         try {
//             const newStatus = currentStatus === 1 ? 0 : 1;
//             await axiosInstance.put(`/banner-content-images/gallery-images/status/${id}`, { status: newStatus });

//             setFetchedImages(prevImages =>
//                 prevImages.map(img => img.id === id ? { ...img, status: newStatus } : img)
//             );
//         } catch (error) {
//             setErrorMessage("Failed to update status");
//         }
//     };

//     const deleteData = async (id) => {
//         const isConfirmed = window.confirm("Are you sure you want to delete this item?");
//         if (!isConfirmed) return;
    
//         try {
//             await axiosInstance.delete(`/banner-content-images/gallery-images/${id}`);
//             setFetchedImages(prevImages => prevImages.filter(img => img.id !== id));
//         } catch (error) {
//             setErrorMessage("Failed to delete data");
//         }
//     };

//     return (
//         <Modal show={show} onHide={handleClose} centered>
//             {errorMessage && <ErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />}
//             <Modal.Header closeButton>
//                 <Modal.Title>Gallery Image</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <div className="image-upload mt-4">
//                     <label className="form-label">Gallery Images</label>
//                     <form noValidate className={validated ? "was-validated" : ""}>
//                         <input
//                             type="file"
//                             className="form-control mt-2"
//                             accept="image/*"
//                             multiple
//                             onChange={handleGalleryChange}
//                             required
//                             disabled={fetchedImages.length + galleryImages.length >= 5}
//                         />
//                         <div className="invalid-feedback">Gallery Images are required.</div>
//                         {galleryImages.length > 0 && (
//                             <>
//                                 <label className="mt-4">Selected Images</label>
//                                 <div className="gallery-grid mt-3">
//                                     {galleryImages.map((img, index) => (
//                                         <div key={index} className="gallery-item">
//                                             <img src={img} alt={`Gallery Preview ${index + 1}`} />
//                                         </div>
//                                     ))}
//                                 </div>
//                             </>
//                         )}
//                     </form>
//                     {fetchedImages.length > 0 && (
//                         <>
//                             <label className="mt-4">Fetched Images</label>
//                             <div className="gallery-grid mt-3">
//                                 {fetchedImages.map((img) => (
//                                     <div key={img.id} className="gallery-item">
//                                         <img src={img.url} alt="Fetched Preview" />
//                                         {/* Delete Icon */}
//                                         <FaTimes
//                                             className="delete-icon"
//                                             onClick={() => deleteData(img.id)}
//                                             title="Delete"
//                                         />
//                                         {/* Active/Inactive Toggle */}
//                                         {img.status === 1 ? (
//                                             <FaCheckCircle
//                                                 className="status-icon active"
//                                                 onClick={() => updateStatus(img.id, img.status)}
//                                                 title="Active (Click to Inactivate)"
//                                             />
//                                         ) : (
//                                             <FaTimesCircle
//                                                 className="status-icon inactive"
//                                                 onClick={() => updateStatus(img.id, img.status)}
//                                                 title="Inactive (Click to Activate)"
//                                             />
//                                         )}
//                                     </div>
//                                 ))}
//                             </div>
//                         </>
//                     )}
//                     {contentLoading && <div className="loading">Loading...</div>}
//                 </div>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="primary" onClick={handleSubmit} disabled={loading}>
//                     {loading ? "Submitting" : "Submit"}
//                 </Button>
//                 <Button variant="secondary" onClick={handleClose}>Close</Button>
//             </Modal.Footer>

//             {/* CSS Styles */}
//             <style jsx>{`
//                 .gallery-item {
//                     position: relative;
//                     display: inline-block;
//                     margin: 5px;
//                 }
//                 .gallery-item img {
//                     width: 100px;
//                     height: 100px;
//                     object-fit: cover;
//                     border-radius: 5px;
//                     border: 2px solid #ddd;
//                 }
//                 .delete-icon {
//                     position: absolute;
//                     top: 5px;
//                     right: 5px;
//                     cursor: pointer;
//                     color: red;
//                     background: white;
//                     border-radius: 50%;
//                 }
//                 .status-icon {
//                     position: absolute;
//                     bottom: 5px;
//                     right: 5px;
//                     cursor: pointer;
//                 }
//                 .status-icon.active {
//                     color: green;
//                 }
//                 .status-icon.inactive {
//                     color: gray;
//                 }
//             `}</style>
//         </Modal>
//     );
// }

// export default GalleryModal;
