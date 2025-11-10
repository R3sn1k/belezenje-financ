// app/components/LogoutButton.tsx
"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-white text-blue-900 px-5 py-2 rounded-full font-medium hover:bg-gray-100 transition-all shadow-md flex items-center gap-2"
    >
      Odjava
    </button>
  );
}