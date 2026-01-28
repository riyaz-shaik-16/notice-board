import { useEffect, useState } from "react";
import axiosInstance from "@/api/axios";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function MyNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyNotices = async () => {
      const res = await axiosInstance.get("/api/notices");
      setNotices(res.data);
      setLoading(false);
    };
    fetchMyNotices();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Notices</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Event Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {notices.map((n) => (
            <TableRow key={n._id}>
              <TableCell>{n.title}</TableCell>
              <TableCell>
                {new Date(n.eventDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge variant={n.isActive ? "default" : "secondary"}>
                  {n.isActive ? "Active" : "Expired"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
