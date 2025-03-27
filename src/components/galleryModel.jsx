import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axiosInstance from "../utils/axiosInstance";
import ErrorToast from "../utils/error";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

function GalleryModal({ show, handleClose, link }) {
    const website = link.split("/")[1];
    const contentType = link.split("/")[3];

    const [fetchedImages, setFetchedImages] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);
    const [contentLoading, setContentLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [imageID, setImageID] = useState('')

    useEffect(() => {
        if (website && contentType) {
            fetchData();
        }
    }, [website, contentType]);

    const fetchData = async () => {
        setContentLoading(true);
        try {
            const response = await axiosInstance.get(`/banner-content-images/gallery-images/${website}/${contentType}`);
            const fetchedGalleryImages = response.data[0].images ? response.data[0].images.map(
                    (img) => `https://www.dharavhighschool.org/api/uploads/banner-content-images/${img}`
                ) : '';
            setImageID(response.data[0].id)
            setFetchedImages(fetchedGalleryImages);
        } catch (error) {
            console.log(error);
            setErrorMessage("Data not found");
        } finally {
            setContentLoading(false);
        }
    };

    const handleGalleryChange = (event) => {
        const files = Array.from(event.target.files);
        if (fetchedImages.length + galleryImages.length + files.length > 10) {
            setErrorMessage("You can upload up to 10 images only.");
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
        if (galleryImages.length < 2) {
            setErrorMessage("Choose atleast 2 images.");
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
            fetchData();
        } catch (error) {
            setErrorMessage("Error submitting data");
        } finally {
            setLoading(false);
        }
    };

    const deleteData = async (imagePath) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this item?");
        if (!isConfirmed) return;
        console.log(imagePath)
        try {
            const response = await axiosInstance.delete(`/banner-content-images/gallery-images/${encodeURIComponent(imagePath)}/${imageID}`);
            console.log(response)
            fetchData();
        } catch (error) {
            console.log(error)
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
                                    <FaTimes
                                            className="delete-icon"
                                            onClick={() => deleteData(img.slice(67))}
                                            title="Delete"
                                        />
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
            <style jsx>{`
                .gallery-item {
                    position: relative;
                    display: inline-block;
                    margin: 5px;
                }
                .gallery-item img {
                    width: 100px;
                    height: 100px;
                    object-fit: cover;
                    border-radius: 5px;
                    border: 2px solid #ddd;
                }
                .delete-icon {
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    cursor: pointer;
                    color: red;
                    background: white;
                    border-radius: 50%;
                }
                .status-icon {
                    position: absolute;
                    bottom: 5px;
                    right: 5px;
                    cursor: pointer;
                }
                .status-icon.active {
                    color: green;
                }
                .status-icon.inactive {
                    color: gray;
                }
            `}</style>
        </Modal>
    );
}

export default GalleryModal;