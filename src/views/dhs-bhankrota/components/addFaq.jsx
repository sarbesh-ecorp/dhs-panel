import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AddFAQsBhankrota() {
    const navigate = useNavigate();

    const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);

    const handleAddMore = () => {
        setFaqs([...faqs, { question: "", answer: "" }]);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(faqs); 
    };

    return (
        <div className="mainContent">
            <div className="banner-header">
                <h3>Add FAQs</h3>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
            </div>
            <div className="banner-card">
                <form onSubmit={handleSubmit}>
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
                                    className="form-control"
                                    placeholder="Enter the question"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor={`answer-${index}`} className="form-label">Answer</label>
                                <textarea
                                    id={`answer-${index}`}
                                    name="answer"
                                    value={faq.answer}
                                    onChange={(e) => handleChange(e, index)}
                                    className="form-control"
                                    placeholder="Enter the answer"
                                    rows="3"
                                    required
                                ></textarea>
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

                    <button
                        type="button"
                        className="btn btn-primary mb-3 ms-auto d-flex"
                        onClick={handleAddMore}
                    >
                        Add More FAQ
                    </button>

                    <button type="submit" className="btn btn-success">
                        Submit FAQs
                    </button>
                </form>
            </div>
        </div>
    );
}
