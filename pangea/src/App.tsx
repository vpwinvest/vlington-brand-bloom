import { Navigate, Route, Routes } from "react-router-dom";
import { Shell } from "@/components/layout/Shell";
import { useAppState } from "@/state/AppStateContext";
import Landing from "@/pages/Landing";
import RoleSelect from "@/pages/RoleSelect";
import TalentOnboarding from "@/pages/onboarding/TalentOnboarding";
import CompanyOnboarding from "@/pages/onboarding/CompanyOnboarding";
import MissionFeed from "@/pages/MissionFeed";
import MissionDetail from "@/pages/MissionDetail";
import TalentDiscovery from "@/pages/TalentDiscovery";
import TalentProfileView from "@/pages/TalentProfileView";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";

function Protected({ children }: { children: React.ReactNode }) {
  const { role } = useAppState();
  if (!role) return <Navigate to="/start" replace />;
  return <Shell>{children}</Shell>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/start" element={<RoleSelect />} />
      <Route path="/onboarding/talent" element={<TalentOnboarding />} />
      <Route path="/onboarding/company" element={<CompanyOnboarding />} />

      <Route path="/missions" element={<Protected><MissionFeed /></Protected>} />
      <Route path="/missions/:missionId" element={<Protected><MissionDetail /></Protected>} />
      <Route path="/talent" element={<Protected><TalentDiscovery /></Protected>} />
      <Route path="/talent/:talentId" element={<Protected><TalentProfileView /></Protected>} />
      <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
      <Route path="/profile" element={<Protected><Profile /></Protected>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
