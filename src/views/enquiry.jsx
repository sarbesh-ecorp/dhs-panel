import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorToast from "../utils/error";
import axiosInstance from "../utils/axiosInstance";

export default function Enquiry() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [contentLoading, setContentLoading] = useState(false);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setContentLoading(true);
                const response = await axiosInstance.get(`/career`);
                setData(response.data);
                setFilteredData(response.data); // Initialize filtered data
            } catch (error) {
                setErrorMessage("Data not found");
            } finally {
                setContentLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleFilterChange = (event) => {
        const value = event.target.value.toLowerCase();
        setFilter(value);
        if (value === "") {
            setFilteredData(data); // Reset filter
        } else {
            setFilteredData(data.filter((item) => item.website.toLowerCase().includes(value)));
        }
    };

    return (
        <div className="mainContent">
            {errorMessage && <ErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />}
            <div className="banner-header">
                <h3>Enquiry</h3>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
            </div>

            <div className="filter-container mb-3">
                <label>Filter by Website:</label>
                <select className="form-control" value={filter} onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="dhs-main">DHS MAIN</option>
                    <option value="dhs-gurugram">DHS GURUGRAM</option>
                    <option value="dhs-bhankrota">DHS BHANKROTA</option>
                </select>
            </div>

            <div className="banner-card">
                {contentLoading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <>
                        <table className="table table-striped table-bordered table-hover mt-3">
                            <thead>
                                <tr>
                                    <th>S.no</th>
                                    <th>Website</th>
                                    <th>Name</th>
                                    <th>Mobile Number</th>
                                    <th>Email</th>
                                    <th>Resume</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((data, index) => (
                                    <tr key={data.id}>
                                        <td>{index + 1}</td>
                                        <td>{data.website}</td>
                                        <td>{data.name}</td>
                                        <td>{data.mobile}</td>
                                        <td>{data.email}</td>
                                        <td>
                                            <a href={`https://www.dharavhighschool.org/api/uploads/resume/${data.resume}`} target="_blank" rel="noopener noreferrer">
                                                Open Resume
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
}
