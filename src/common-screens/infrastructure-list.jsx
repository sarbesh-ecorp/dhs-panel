import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorToast from "../utils/error";
import axiosInstance from "../utils/axiosInstance";

export default function InfrastructureList() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [contentLoading, setContentLoading] = useState(false);    
    const [data, setData] = useState([]);

    const location = useLocation();
    const path = location.pathname;
    const extractedPath = path.split("/")[1];

    useEffect(() => {
        const fetchData = async () => {            
            try {
                setContentLoading(true);
                const response = await axiosInstance.get(`/heading-content-image/${extractedPath}`);
                setData(response.data);                
            } catch (error) {
                console.log(error)
                setErrorMessage('Data not found');
            } finally {
                setContentLoading(false);
            }
        };
        fetchData();
    },[extractedPath]);

    const updateStatus = async (id, status) => {
        try {
            await axiosInstance.put(`/infrastructure/status/${id}`, { status: status === 1 ? 0 : 1 });
            const updatedData = data.map((data) => {
                if (data.id === id) {
                    data.status = status === 1 ? 0 : 1;
                }
                return data;
            });
            setData(updatedData);
        } catch (error) {
            console.log(error);
            setErrorMessage('Failed to update status');
        }
    };

    const deleteData = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this item?");
        if (!isConfirmed) return;
    
        try {
            await axiosInstance.delete(`/heading-content-image/${id}`);
            const updatedData = data.filter((data) => data.id !== id);
            setData(updatedData);
        } catch (error) {
            console.log(error);
            setErrorMessage("Failed to delete data");
        }
    };
    

    return (
    <div className="mainContent">
        {errorMessage && <ErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />}
        <div className="banner-header">
            <h3>Infrastructure List ({extractedPath})</h3>
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className="banner-card">
            {contentLoading ? <div className="loading">Loading...</div> :
            <>
            <button className="btn btn-primary" onClick={() => navigate(`/${extractedPath}/infrastructure/new`)}>Add</button>
            <table className="table table-striped table-bordered table-hover mt-3">
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Heading</th>
                        <th>Content</th>                        
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((data, index) => (
                        <tr key={data.id}>
                            <td>{index + 1}</td>
                            <td>{data.heading}</td>
                            <td>{data.content.slice(0,10)}...</td>
                            {/* <td>
                                <button className={`btn ${data.status === 1 ? 'btn-success' : 'btn-danger'}`} onClick={() => updateStatus(data.id, data.status)}>{data.status === 1 ? 'Active' : 'Inactive'}</button>
                            </td> */}
                            <td>
                                <button className="btn btn-warning" onClick={() => navigate(`/${extractedPath}/infrastructure/${data.id}`)}><i className="fa fa-edit"></i></button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteData(data.id)}><i className="fa fa-trash"></i></button>
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
