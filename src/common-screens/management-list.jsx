import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorToast from "../utils/error";
import axiosInstance from "../utils/axiosInstance";

export default function ManagementList() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [contentLoading, setContentLoading] = useState(false);    
    const [memberData, setMemberData] = useState([]);

    const location = useLocation();
    const path = location.pathname;
    const extractedPath = path.split("/")[1];

    useEffect(() => {
        const fetchData = async () => {            
            try {
                setContentLoading(true);
                const response = await axiosInstance.get(`/board-of-management/${extractedPath}`);
                console.log(response)
                setMemberData(response.data);                
            } catch (error) {
                setErrorMessage('Data not found');
            } finally {
                setContentLoading(false);
            }
        };
        fetchData();
    },[extractedPath]) 

    return (
        <div className="mainContent">
            {errorMessage && <ErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />}
            <div className="banner-header">
                <h3>Management List ({extractedPath})</h3>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
            </div>
            <div className="banner-card">
            {contentLoading ? <div className="loading">Loading...</div> :
                 <>
                <button className="btn btn-primary" onClick={() => navigate(`/${extractedPath}/board-of-management/new`)}>Add Member</button>
                <table className="table table-striped table-bordered table-hover mt-3">
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Current Status</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {memberData.map((data, index) => (
                            <tr key={data.id}>
                                <td>{index + 1}</td>
                                <td>{data.name}</td>
                                <td>{data.designation}</td>
                                <td>
                                    <button className={`btn ${data.status === 1 ? 'btn-success' : 'btn-danger'}`}>{data.status}</button>
                                </td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => navigate(`/${extractedPath}/board-of-management/${data.id}`)}><i className="fa fa-edit"></i></button>
                                </td>
                                <td>
                                    <button className="btn btn-danger"><i className="fa fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </>}
            </div>
        </div>
    );
}
