import { useState, useEffect } from "react";

export default function ErrorToast({ message, onClose,  }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 300);
        }, 2000);

        return () => clearTimeout(timer);
    }, [onClose]);

    if (!visible) return null;

    return (
        <div style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: message === 'Data not found' || 'Error submitting data' ? "#D32F2F" : "#388E3C",
            color: "white",
            padding: "12px 16px",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "16px",
            fontWeight: "bold",
            animation: "fadeIn 0.3s ease-in-out, fadeOut 0.3s ease-in-out 1.7s",
        }}>
            <span>{message}</span>
            <button 
                onClick={() => setVisible(false)} 
                style={{
                    background: "transparent",
                    border: "none",
                    color: "white",
                    fontSize: "18px",
                    cursor: "pointer",
                    fontWeight: "bold",
                }}
            >
                ✖
            </button>
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(-10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes fadeOut {
                        from { opacity: 1; transform: translateY(0); }
                        to { opacity: 0; transform: translateY(-10px); }
                    }
                `}
            </style>
        </div>
    );
}
