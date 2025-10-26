import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ message: "", type: "", visible: false });

  const showToast = useCallback((message, type = "info") => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast({ message: "", type: "", visible: false });
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.visible && (
        <div
          className={`toast ${toast.type}`}
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            padding: "10px 16px",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: 500,
            boxShadow:
              "5px 5px 10px rgba(0,0,0,0.1), -5px -5px 10px rgba(255,255,255,0.6)",
            background:
              toast.type === "error"
                ? "#ffb6b6"
                : toast.type === "success"
                ? "#a8e6cf"
                : "#dde4ff",
            color: "#333",
            animation: "fadeIn 0.3s ease",
            zIndex: 1000,
          }}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}
