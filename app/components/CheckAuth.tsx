"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function CheckAuth() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const isLoginPage = pathname === "/login";

    if (!isLoggedIn && !isLoginPage) {
      router.replace("/login");
    }
  }, [pathname, router]);

  return null;
}