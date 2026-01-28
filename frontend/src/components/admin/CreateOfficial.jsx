import { useState } from "react";
import axiosInstance from "@/api/axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function CreateOfficial() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (loading) return;

    setError("");
    setSuccess("");

    const { name, phone, password, department } = form;

    if (!name || !phone || !password || !department) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await axiosInstance.post("/api/admin/officials", {
        name,
        phone,
        password,
        department,
      });

      setSuccess("Official created successfully");
      setForm({
        name: "",
        phone: "",
        password: "",
        department: "",
      });

      setTimeout(() => setSuccess(""), 2500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create official"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md">
      <CardHeader>
        <h2 className="text-lg font-bold">Create Official</h2>
      </CardHeader>

      <CardContent className="space-y-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label>Name</Label>
            <Input
              placeholder="Official name"
              value={form.name}
              disabled={loading}
              onChange={(e) =>
                handleChange("name", e.target.value)
              }
            />
          </div>

          <div>
            <Label>Phone</Label>
            <Input
              placeholder="9876543210"
              value={form.phone}
              disabled={loading}
              onChange={(e) =>
                handleChange(
                  "phone",
                  e.target.value.replace(/\D/g, "")
                )
              }
            />
          </div>

          <div>
            <Label>Password</Label>
            <Input
              type="password"
              value={form.password}
              disabled={loading}
              onChange={(e) =>
                handleChange("password", e.target.value)
              }
            />
          </div>

          <div>
            <Label>Department</Label>
            <Select
              value={form.department}
              disabled={loading}
              onValueChange={(value) =>
                handleChange("department", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="school">School</SelectItem>
                <SelectItem value="ration">Ration</SelectItem>
                <SelectItem value="sanitation">Sanitation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {success && (
            <p className="text-sm text-green-600">{success}</p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
