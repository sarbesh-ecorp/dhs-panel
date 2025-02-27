import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorToast from "../utils/error";
import axiosInstance from "../utils/axiosInstance";

export default function FAQs() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [contentLoading, setContentLoading] = useState(false);
    const [faqData, setFaqData] = useState([]);

    const location = useLocation();
    const path = location.pathname;
    const extractedPath = path.split("/")[1];

    useEffect(() => {
        const fetchData = async () => {            
            try {
                setContentLoading(true);
                const response = await axiosInstance.get(`/faq/${extractedPath}`);
                setFaqData(response.data);                
            } catch (error) {
                setErrorMessage('Data not found');
            } finally {
                setContentLoading(false);
            }
        };
        fetchData();
    },[extractedPath]);

    const updateStatus = async (id, status) => {
        try {
            await axiosInstance.put(`/faq/status/${id}`, { status: status === 1 ? 0 : 1 });
            const updatedData = faqData.map((data) => {
                if (data.id === id) {
                    data.status = status === 1 ? 0 : 1;
                }
                return data;
            });
            setFaqData(updatedData);
        } catch (error) {
            console.log(error);
            setErrorMessage('Failed to update status');
        }
    };

    const deleteData = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this item?");
        if (!isConfirmed) return;
    
        try {
            await axiosInstance.delete(`/faq/${id}`);
            const updatedData = faqData.filter((data) => data.id !== id);
            setFaqData(updatedData);
        } catch (error) {
            console.log(error);
            setErrorMessage("Failed to delete data");
        }
    };

    return (
    <div className="mainContent">
        {errorMessage && <ErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />}
        <div className="banner-header">
            <h3>FAQs ({extractedPath})</h3>
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className="banner-card">
            {contentLoading ? <div className="loading">Loading...</div> :
            <>
            <button className="btn btn-primary" onClick={() => navigate(`/${extractedPath}/faq/new`)}>Add FAQ</button>
            <table className="table table-striped table-bordered table-hover mt-3">
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Current Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {faqData.map((faq, index) => (
                        <tr key={faq.id}>
                            <td>{index + 1}</td>
                            <td>{faq.question}</td>
                            <td>{faq.answer}</td>
                            <td>
                                <button className={`btn ${faq.status === 1 ? 'btn-success' : 'btn-danger'}`} onClick={() => updateStatus(faq.id, faq.status)}>{faq.status === 1 ? 'Active' : 'Inactive'}</button>
                            </td>
                            <td>
                                <button className="btn btn-warning" onClick={() => navigate(`/${extractedPath}/faq/${faq.id}`)}><i className="fa fa-edit"></i></button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteData(faq.id)}><i className="fa fa-trash"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </>
            }
        </div>
    </div>
    );
}
