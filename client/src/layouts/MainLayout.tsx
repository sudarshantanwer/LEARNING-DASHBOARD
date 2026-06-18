import { Outlet } from "react-router-dom";
import { NavigationBar } from "../components/NavigationBar";

export function MainLayout() {
  return (
    <div className="min-h-full">
      <NavigationBar />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}
