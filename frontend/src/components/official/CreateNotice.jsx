import { useState } from "react";
import axiosInstance from "@/api/axios";
import { useAuth } from "@/context/AuthContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function CreateNotice() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    eventDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (key, value) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.title || !form.description || !form.eventDate) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await axiosInstance.post("/api/notices", {
        ...form,
        department: user.department, // enforced
      });

      setSuccess("Notice created successfully");
      setForm({ title: "", description: "", eventDate: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create notice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <h2 className="text-lg font-bold">Create Notice</h2>
      </CardHeader>

      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label>Title</Label>
            <Input
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              placeholder="Enter notice details"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
            />
          </div>

          <div>
            <Label>Event Date</Label>
            <Input
              type="date"
              value={form.eventDate}
              onChange={(e) => handleChange("eventDate", e.target.value)}
            />
          </div>

          <div>
            <Label>Department</Label>
            <Input value={user?.department} disabled />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <Button disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create Notice"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
