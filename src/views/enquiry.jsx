import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorToast from "../utils/error";

export default function Enquiry() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [contentLoading, setContentLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {            
            try {
                setContentLoading(true);
                const response = await axiosInstance.get(`/enquiry`);
                setData(response.data);                
            } catch (error) {
                setErrorMessage('Data not found');
            } finally {
                setContentLoading(false);
            }
        };
        fetchData();
    },[]);

    return (
    <div className="mainContent">
        {errorMessage && <ErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />}
        <div className="banner-header">
            <h3>Enquiry</h3>
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className="banner-card">
            {contentLoading ? <div className="loading">Loading...</div> :
            <>
            {/* <table className="table table-striped table-bordered table-hover mt-3">
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Website</th>
                        <th>Answer</th>
                      
                    </tr>
                </thead>
                <tbody>
                    {data.map((data, index) => (
                        <tr key={data.id}>
                            <td>{index + 1}</td>
                            <td>{data.website}</td>
                            <td>{data.answer}</td>
                           
                        </tr>
                    ))}
                </tbody>
            </table> */}
            </>
            }
        </div>
    </div>
    );
}