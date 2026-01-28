import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "@/api/axios";

const NoticeContext = createContext(null);

export const NoticeProvider = ({ children }) => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotices = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get("/api/notices", { params });
      setNotices(res.data);
    } catch (err) {
      setError("Failed to load notices");
    } finally {
      setLoading(false);
    }
  };

  // Public users should see notices immediately
  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <NoticeContext.Provider
      value={{
        notices,
        loading,
        error,
        fetchNotices,
      }}
    >
      {children}
    </NoticeContext.Provider>
  );
};

export const useNotices = () => useContext(NoticeContext);
