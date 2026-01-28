import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function AdminOfficials() {
  const navigate = useNavigate();

  const [officials, setOfficials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // fetch officials
  useEffect(() => {
    const fetchOfficials = async () => {
      try {
        const res = await axiosInstance.get("/api/admin/officials");
        setOfficials(res.data);
      } catch (err) {
        setError("Failed to load officials");
      } finally {
        setLoading(false);
      }
    };

    fetchOfficials();
  }, []);

  // toggle active status
  const toggleActive = async (id) => {
    try {
      await axiosInstance.patch(`/api/admin/officials/${id}/toggle`);

      // update UI optimistically
      setOfficials((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, isActive: !o.isActive } : o
        )
      );
    } catch {
      alert("Failed to update status");
    }
  };

  if (loading) {
    return <p className="text-muted-foreground">Loading officials...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Officials</h2>
        <Button onClick={() => navigate("/admin/officials/create")}>
          Create Official
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Active</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {officials.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No officials found
              </TableCell>
            </TableRow>
          )}

          {officials.map((o) => (
            <TableRow key={o._id}>
              <TableCell>{o.name}</TableCell>

              <TableCell>
                <Badge variant="outline">
                  {o.department}
                </Badge>
              </TableCell>

              <TableCell>{o.role}</TableCell>

              <TableCell>
                <Switch
                  checked={o.isActive}
                  onCheckedChange={() => toggleActive(o._id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
