import Sidebar from "./(admin)/components/Sidebar";
import Navbar from "./(admin)/components/Navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";

export default async function DashboardLayout({ children }) {
  // server-side guard for all dashboard routes
  const token = cookies().get("X-AS-Token")?.value;
  if (!token) return redirect("/Login");

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    if (!["admin", "editor"].includes(payload.role)) {
      return redirect("/Login");
    }
  } catch (err) {
    return redirect("/Login");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 fixed left-0 top-0 h-full bg-white border-r">
        <Sidebar />
      </div>

      <div className="flex-1 ml-64 flex flex-col">
        <div className="sticky top-0 bg-white border-b z-50">
          <Navbar />
        </div>

        <main className="p-5">{children}</main>
      </div>
    </div>
  );
}