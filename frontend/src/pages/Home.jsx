import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Village Notice Board
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => navigate("/login?role=admin")}
          >
            Admin Login
          </Button>

          <Button
            className="w-full"
            variant="outline"
            onClick={() => navigate("/login?role=official")}
          >
            Official Login
          </Button>

          <Separator />

          <Button
            className="w-full"
            onClick={() => navigate("/notices")}
          >
            View Notices
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
