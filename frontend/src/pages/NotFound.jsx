import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">404</CardTitle>
          <p className="text-muted-foreground mt-2">
            Page not found
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The page you’re looking for doesn’t exist or was moved.
          </p>

          <Button onClick={() => navigate("/")}>
            Go to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
