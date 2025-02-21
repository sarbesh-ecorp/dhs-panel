import { useNavigate } from "react-router-dom";

export default function FAQs() {
    const navigate = useNavigate();
    
    const faqData = [
        { id: 1, question: "What is React?", answer: "A JavaScript library for building user interfaces.", status: "Active" },
        { id: 2, question: "What is useState?", answer: "A React Hook to manage state in a functional component.", status: "Inactive" },
    ];

    return (
        <div className="mainContent">
            <div className="banner-header">
                <h3>FAQs</h3>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
            </div>
            <div className="banner-card">
                <button className="btn btn-primary" onClick={() => navigate('/dhs-gurugram/faq/new')}>Add FAQ</button>
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
                                    <button className="btn btn-success">{faq.status}</button>
                                </td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => navigate(`/dhs-gurugram/faq/${faq.id}`)}><i className="fa fa-edit"></i></button>
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
