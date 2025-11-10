"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shirt, Lock, User, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const VALID_USERNAME = "admin";
  const VALID_PASSWORD = "dresovi2025";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify({ username: "Admin" }));
        router.push("/");
      } else {
        setError("Napačno uporabniško ime ali geslo!");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Ozadje z ikonami dresov */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 gap-10 h-full">
          {[...Array(32)].map((_, i) => (
            <Shirt key={i} className="w-20 h-20 text-white animate-pulse" />
          ))}
        </div>
      </div>

      <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400 rounded-full mb-4">
            <Shirt className="w-12 h-12 text-blue-900" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800">
            Dresovi<span className="text-yellow-400">.</span>Manager
          </h1>
          <p className="text-gray-600 mt-2">Prijava v administracijo</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Uporabniško ime
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
                placeholder="admin"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Geslo
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-blue-900 font-bold py-4 rounded-xl hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Prijavljam...
              </>
            ) : (
              <>
                Prijava
                <Shirt className="w-6 h-6" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p><strong>Uporabniško ime:</strong> admin</p>
          <p className="mt-1"><strong>Geslo:</strong> dresovi2025</p>
        </div>
      </div>
    </div>
  );
}