import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Landmark } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const roleHint = params.get("role");

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(phone, password);

      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/official");
      }
    } catch {
      setError("Invalid phone number or password");
    } finally {
      setLoading(false);
    }
  };

  const title =
    roleHint === "admin"
      ? "Administrator Login"
      : roleHint === "official"
      ? "Official Login"
      : "Login";

  const subtitle =
    roleHint === "admin"
      ? "Authorized access only"
      : "For government officials";

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-3">
          <div className="flex justify-center">
            <Landmark className="h-9 w-9 text-primary" />
          </div>

          <CardTitle className="text-2xl font-bold">
            {title}
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            {subtitle}
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <Label className="text-base">
                Phone Number
              </Label>
              <Input
                className="h-12 text-base"
                placeholder="Enter mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label className="text-base">
                Password
              </Label>
              <Input
                className="h-12 text-base"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-600">
                {error}
              </div>
            )}

            <Button
              className="w-full h-12 text-lg"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
