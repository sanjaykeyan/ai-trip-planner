import { UserButton } from "@clerk/nextjs";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <nav className="flex justify-between items-center py-4 px-6 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-600">Dashboard</h1>
        <UserButton afterSignOutUrl="/" />
      </nav>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome to your travel dashboard
        </h2>
        {/* Add your dashboard content here */}
      </div>
    </div>
  );
}
