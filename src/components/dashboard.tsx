"use client";

import UserAndRoleContent from "./content";
import DashboardStatus from "./dashboard-status";

export default function Dashboard() {
  return (
    <>
      <DashboardStatus />
      <UserAndRoleContent />
    </>
  );
}
