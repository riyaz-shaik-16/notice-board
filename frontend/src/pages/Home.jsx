import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Landmark, UserCog, FileText } from "lucide-react";




export default function Home() {
  const navigate = useNavigate();

  // return (
  //   <div className="min-h-screen flex items-center justify-center bg-muted/40">
  //     <Card className="w-full max-w-md">
  //       <CardHeader>
  //         <CardTitle className="text-center text-xl">
  //           Village Notice Board
  //         </CardTitle>
  //       </CardHeader>

  //       <CardContent className="space-y-4">
  //         <Button
  //           className="w-full"
  //           variant="outline"
  //           onClick={() => navigate("/login?role=admin")}
  //         >
  //           Admin Login
  //         </Button>

  //         <Button
  //           className="w-full"
  //           variant="outline"
  //           onClick={() => navigate("/login?role=official")}
  //         >
  //           Official Login
  //         </Button>

  //         <Separator />

  //         <Button
  //           className="w-full"
  //           onClick={() => navigate("/notices")}
  //         >
  //           View Notices
  //         </Button>
  //       </CardContent>
  //     </Card>
  //   </div>
  // );

  
return (
  <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
    <Card className="w-full max-w-lg shadow-xl">
      <CardHeader className="text-center space-y-3 pb-2">
        <div className="flex justify-center">
          <Landmark className="h-10 w-10 text-primary" />
        </div>

        <CardTitle className="text-2xl font-bold tracking-wide">
          Village Notice Board
        </CardTitle>

        <p className="text-base text-muted-foreground">
          Official announcements & public information
        </p>
      </CardHeader>

      <CardContent className="space-y-5 pt-4">
        <Button
          className="w-full h-12 text-base flex gap-3"
          variant="outline"
          onClick={() => navigate("/login?role=admin")}
        >
          <UserCog className="h-5 w-5" />
          Admin Login
        </Button>

        <Button
          className="w-full h-12 text-base flex gap-3"
          variant="outline"
          onClick={() => navigate("/login?role=official")}
        >
          <UserCog className="h-5 w-5" />
          Official Login
        </Button>

        <Separator className="my-2" />

        <Button
          className="w-full h-14 text-lg flex gap-3"
          onClick={() => navigate("/notices")}
        >
          <FileText className="h-5 w-5" />
          View Public Notices
        </Button>
      </CardContent>
    </Card>
  </div>
);
}
