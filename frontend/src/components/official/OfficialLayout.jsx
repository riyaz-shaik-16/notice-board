import { Outlet, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";

export default function OfficialLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-1">Official</h2>
          <p className="text-sm text-muted-foreground mb-4">
            {user?.department?.toUpperCase()}
          </p>

          <div className="space-y-2">
            <NavLink
              to="/official/create-notice"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-md w-full justify-start ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent/50"
                }`
              }
            >
              Create Notice
            </NavLink>

            <NavLink
              to="/official/notices"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-md w-full justify-start ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent/50"
                }`
              }
            >
              My Notices
            </NavLink>
          </div>
        </div>

        <Button variant="destructive" onClick={logout}>
          Logout
        </Button>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <Separator className="mb-4" />
        <Outlet />
      </main>
    </div>
  );
}
