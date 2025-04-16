import { useEffect, useState } from "react";
import Select from "react-select";
import axiosInstance from "../utils/axiosInstance";
import ErrorToast from "../utils/error";
import { useNavigate } from "react-router-dom";

export default function UserManagement() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newUser, setNewUser] = useState({ username: "", password: "", access: [] });
    const [errorMessage, setErrorMessage] = useState("");
    const [contentLoading, setContentLoading] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    
    const accessOptions = [
        { value: "dhs-main", label: "DHS MAIN" },
        { value: "dhs-gurugram", label: "DHS GURUGRAM" },
        { value: "dhs-bhankrota", label: "DHS Ajmer Road Jaipur" },
        { value: "user-management", label: "USER MANAGEMENT"},
        { value: "enquiry", label: "ENQUIRY"}
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setContentLoading(true);
                const response = await axiosInstance.get(`/auth`);                
                setData(response.data);                             
    
            } catch (error) {
                setErrorMessage('Data not found');
            } finally {
                setContentLoading(false);
            }
        };
        fetchData();
    }, []);
    
    const handleInputChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };
    
    const handleAccessChange = (selectedOptions) => {
        setNewUser({ ...newUser, access: selectedOptions.map(option => option.value) });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newUser.username || !newUser.password || !newUser.access) {
            setValidated(true);
            return;
        }
        try {
            setLoading(true);
            const response = await axiosInstance.post("/auth/register", newUser);
            if (response.status === 200) {
                setData([...data, { ...newUser, id: data.length + 1, created_at: new Date().toISOString().split('T')[0] }]);
                setModalIsOpen(false);
                setNewUser({ username: "", password: "", access: [] });
                alert(response.data.message);
            }
        } catch (error) {
            setErrorMessage(error.response.data.error === "User already exists" ? 'User already exists' : "Error submitting data");
            console.error("Error adding user:", error.response.data.error);
        } finally {
            setLoading(false);
        } 
    };

    const deleteData = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this item?");
        if (!isConfirmed) return;
    
        try {
            await axiosInstance.delete(`/auth/${id}`);
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
                <h3>Manage Users</h3>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
            </div>

            <div className="banner-card">
                {contentLoading ? <div className="loading">Loading...</div> :
                <>
                <button className="btn btn-primary" onClick={() => setModalIsOpen(true)}>Add User</button>
                
                <table className="table table-striped table-bordered table-hover mt-3">
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Username</th>
                            <th>Created_at</th>
                            <th>Access</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.created_at.slice(0, 10)}</td>
                                <td>{Array.isArray(user.access) ? user.access.join(", ") : user.access || "No Access"}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteData(user.id)}><i className="fa fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </>}
            </div>

            <div className={`modal fade ${modalIsOpen ? "show d-block" : ""}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add User</h5>
                            <button type="button" className="close" onClick={() => setModalIsOpen(false)}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <form noValidate onSubmit={handleSubmit} className={validated ? "was-validated" : ""}>
                            <div className="modal-body">
                                <input type="text" name="username" placeholder="Username" value={newUser.username.trim()} onChange={handleInputChange} className="form-control mb-2" required/>
                                <div className="invalid-feedback">Username is required.</div>
                                <input type="password" name="password" placeholder="Password" value={newUser.password.trim()} onChange={handleInputChange} className="form-control mb-2"required />
                                <div className="invalid-feedback">Password is required.</div>
                                <Select options={accessOptions} isMulti onChange={handleAccessChange} className="mb-2" required/>
                                <div className="invalid-feedback">Access items are required.</div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-success" type='submit' disabled={loading}>{loading ? 'Submitting' : 'Submit'}</button>
                                <button className="btn btn-secondary" onClick={() => setModalIsOpen(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {modalIsOpen && <div className="modal-backdrop fade show" onClick={() => setModalIsOpen(false)}></div>}
        </div>
    );
}