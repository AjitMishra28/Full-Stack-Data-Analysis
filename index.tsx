// pages/index.tsx

import dynamic from "next/dynamic";

// Load Dashboard with SSR disabled to prevent Recharts hydration error
const Dashboard = dynamic(() => import("../components/Dashboard"), {
  ssr: false,
  loading: () => <p className="p-6">Loading dashboard...</p>,
});

export default function Home() {
  return <Dashboard />;
}
