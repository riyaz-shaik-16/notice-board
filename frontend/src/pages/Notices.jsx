import { useEffect, useState } from "react";
import axiosInstance from "@/api/axios";
import NoticeCard from "@/components/NoticeCard";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PublicNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await axiosInstance.get("/api/notices");
        setNotices(res.data);
      } catch (err) {
        setError("Failed to load notices");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading notices...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">Village Notices</h1>

      {notices.length === 0 && (
        <p className="text-center text-muted-foreground">
          No notices available
        </p>
      )}

      {notices.map((notice) => (
        <NoticeCard key={notice._id} notice={notice} />
      ))}
    </div>
  );
}
