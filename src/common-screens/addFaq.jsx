import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ErrorToast from "../utils/error";
import axiosInstance from "../utils/axiosInstance";

export default function AddFAQs() {
    const [contentLoading, setContentLoading] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const location = useLocation();
    const path = location.pathname;
    const extractedPath = path.split("/")[1];
    const {id} = useParams();
    const navigate = useNavigate();
    const [faqs, setFaqs] = useState([{ question: "", answer: "", website: extractedPath }]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {            
            try {
                setContentLoading(true);
                const response = await axiosInstance.get(`/faq/byID/${id}`);
                setFaqs(response.data);               
            } catch (error) {
                setErrorMessage('Data not found');
            } finally {
                setContentLoading(false);
            }
        };
        if (id !== 'new') {
            fetchData();        
        }        
    },[id]);

    const handleAddMore = () => {
        setFaqs([...faqs, { question: "", answer: "", website: extractedPath }]);
    };

    const handleRemove = (index) => {
        const updatedFaqs = faqs.filter((_, i) => i !== index);
        setFaqs(updatedFaqs);
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedFaqs = [...faqs];
        updatedFaqs[index][name] = value;
        setFaqs(updatedFaqs);
    };

    const validateForm = () => {
        const newErrors = faqs.map((faq) => {
            let error = {};
            if (!faq.question.trim()) error.question = "Question is required";
            else if (faq.question.length < 5) error.question = "Question must be at least 5 characters";
            else if (faq.question.length > 200) error.question = "Question is too long (max 200 characters)";

            if (!faq.answer.trim()) error.answer = "Answer is required";
            else if (faq.answer.length > 1000) error.answer = "Answer is too long (max 1000 characters)";

            return error;
        });

        setErrors(newErrors);
        return newErrors.every((error) => Object.keys(error).length === 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true);
            let response;
            id === 'new' ? response = await axiosInstance.post(`/faq`, faqs) 
            : response = await axiosInstance.put(`/faq/${id}`, faqs);
            alert(response.data.message);
            navigate(-1);
        } catch (error) {
            setErrorMessage("Error submitting data");
            console.log(error);
        } finally {
            setLoading(false);
        } 
    };

    return (
    <div className="mainContent">
        {errorMessage && <ErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />}
        <div className="banner-header">
            <h3>Add FAQs ({extractedPath})</h3>
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className="banner-card">
            {contentLoading ? <div className="loading">Loading...</div> :
            <>
            <form>
                {faqs.map((faq, index) => (
                    <div className="faq-item" key={index}>
                        <div className="mb-3">
                            <label htmlFor={`question-${index}`} className="form-label">Question</label>
                            <input
                                type="text"
                                id={`question-${index}`}
                                name="question"
                                value={faq.question}
                                onChange={(e) => handleChange(e, index)}
                                className={`form-control ${errors[index]?.question ? 'is-invalid' : ''}`}
                                placeholder="Enter the question"
                                required
                            />
                            {errors[index]?.question && <div className="invalid-feedback">{errors[index].question}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor={`answer-${index}`} className="form-label">Answer</label>
                            <textarea
                                id={`answer-${index}`}
                                name="answer"
                                value={faq.answer}
                                onChange={(e) => handleChange(e, index)}
                                className={`form-control ${errors[index]?.answer ? 'is-invalid' : ''}`}
                                placeholder="Enter the answer"
                                rows="3"
                                required
                            ></textarea>
                            {errors[index]?.answer && <div className="invalid-feedback">{errors[index].answer}</div>}
                        </div>

                        {faqs.length > 1 && (
                            <button
                                type="button"
                                className="btn btn-danger mb-3"
                                onClick={() => handleRemove(index)}
                            >
                                Remove FAQ
                            </button>
                        )}
                    </div>
                ))}

                {id === 'new' && <button
                    type="button"
                    className="btn btn-primary mb-3 ms-auto d-flex"
                    onClick={handleAddMore}
                >
                    Add More FAQ
                </button>}
                <div className="mt-4">
                    <button className="btn btn-success" onClick={handleSubmit} disabled={loading}>{loading ? 'Submitting' : 'Submit'}</button>
                </div>                    
            </form>
            </>
            }
        </div>
    </div>
    );
}
