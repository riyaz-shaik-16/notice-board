// components/admin/AdminLayout.jsx
import { Outlet, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout() {

  
  const { logout } = useAuth();
  
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-4">Admin</h2>

        <nav className="space-y-2">
          <NavLink to="/admin/dashboard">
            {({ isActive }) => (
              <Button
                variant={isActive ? "default" : "ghost"}
                className="w-full justify-start"
              >
                Dashboard
              </Button>
            )}
          </NavLink>

          <NavLink to="/admin/officials">
            {({ isActive }) => (
              <Button
                variant={isActive ? "default" : "ghost"}
                className="w-full justify-start"
              >
                Officials
              </Button>
            )}
          </NavLink>
        </nav>

        {/* Push logout to bottom */}
        <div className="mt-auto">
          <Button variant="destructive" className="w-full justify-start" onClick={logout}>
            Logout
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <Separator className="mb-4" />
        <Outlet />
      </main>
    </div>
  );
}
