export default function UserManagement() {
    const faqData = [
        { id: 1, username: "user1@dhs.com", created_at: "2025-02-24", access: '', status: "Active" },
        { id: 2, username: "user2@dhs.com", created_at: "2025-02-24", access: '', status: "Inactive" },
    ];
    
    return (
        <div className="mainContent">
            <div className="dashboard-header">
                <h1>Manage the User of the Panel</h1>               
            </div>

            <div className="banner-card">
                <button className="btn btn-primary" >Add User</button>
                <table className="table table-striped table-bordered table-hover mt-3">
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Username</th>
                            <th>Created_at</th>
                            <th>Access</th>
                            <th>Current Status</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {faqData.map((faq, index) => (
                            <tr key={faq.id}>
                                <td>{index + 1}</td>
                                <td>{faq.username}</td>
                                <td>{faq.created_at}</td>
                                <td>{faq.access}</td>
                                <td>
                                    <button className="btn btn-success">{faq.status}</button>
                                </td>
                                <td>
                                    <button className="btn btn-warning"><i className="fa fa-edit"></i></button>
                                </td>
                                <td>
                                    <button className="btn btn-danger"><i className="fa fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        
    );
}