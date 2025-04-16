import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorToast from "../utils/error";
import axiosInstance from "../utils/axiosInstance";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function Enquiry() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [contentLoading, setContentLoading] = useState(false);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filter, setFilter] = useState("");
    const [startSerial, setStartSerial] = useState(1);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 15;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setContentLoading(true);
                const response = await axiosInstance.get(`/career`);
                setData(response.data);
                setFilteredData(response.data);
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
        setCurrentPage(1);
        if (value === "") {
            setFilteredData(data);
        } else {
            setFilteredData(data.filter((item) => item.website.toLowerCase().includes(value)));
        }
    };

    const handleExport = () => {
        let exportData = [...filteredData];

        if (startSerial > 1) {
            exportData = exportData.slice(startSerial - 1);
        }

        const excelData = exportData.map((item, index) => ({
            "S.No": startSerial + index,
            Website: item.website,
            Name: item.name,
            "Mobile Number": item.mobile,
            Email: item.email,
            Resume: `https://www.dharavhighschool.org/api/uploads/resume/${item.resume}`,
        }));

        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(dataBlob, "Enquiries.xlsx");
    };

    // Pagination logic
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredData.length / recordsPerPage);

    return (
        <div className="mainContent">
            {errorMessage && <ErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />}

            <div className="banner-header">
                <h3>Enquiry</h3>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
            </div>

            <div className="filter-container mb-3">
                <label>Filter by Website:</label>
                <select className="form-control mb-2" value={filter} onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="dhs-main">DHS MAIN</option>
                    <option value="dhs-gurugram">DHS GURUGRAM</option>
                    <option value="dhs-bhankrota">DHS BHANKROTA</option>
                </select>

                <label>Start Serial Number for Export:</label>
                <input
                    type="number"
                    className="form-control mb-2"
                    value={startSerial}
                    min={1}
                    onChange={(e) => setStartSerial(Number(e.target.value))}
                />

                <button className="btn btn-success mb-2" onClick={handleExport}>Export to Excel</button>
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
                                {currentRecords.map((data, index) => (
                                    <tr key={data.id}>
                                        <td>{indexOfFirstRecord + index + 1}</td>
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

                        {/* Pagination Controls */}
                        <div className="pagination mt-3 d-flex justify-content-between align-items-center">
                            <button
                                className="btn btn-outline-primary"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                            >
                                Previous
                            </button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button
                                className="btn btn-outline-primary"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
