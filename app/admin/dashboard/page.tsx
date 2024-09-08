"use client";

import { useSession, signOut } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {session?.user?.name}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
