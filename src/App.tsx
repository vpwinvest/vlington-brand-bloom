import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ScrollToTop from "./components/ScrollToTop.tsx";
import CookieBanner from "./components/CookieBanner.tsx";
import Index from "./pages/Index.tsx";
import Unsubscribe from "./pages/Unsubscribe.tsx";
import SocialResponsibility from "./pages/SocialResponsibility.tsx";
import MissionVision from "./pages/MissionVision.tsx";
import Sustainability from "./pages/Sustainability.tsx";
import Lifestyle from "./pages/Lifestyle.tsx";
import InvestPortugal from "./pages/InvestPortugal.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsConditions from "./pages/TermsConditions.tsx";
import Careers from "./pages/Careers.tsx";

import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/responsabilidade-social" element={<SocialResponsibility />} />
            <Route path="/missao-visao" element={<MissionVision />} />
            <Route path="/sustentabilidade" element={<Sustainability />} />
            <Route path="/lifestyle" element={<Lifestyle />} />
            <Route path="/investir" element={<InvestPortugal />} />
            <Route path="/invest" element={<InvestPortugal />} />
            <Route path="/carreiras" element={<Careers />} />
            <Route path="/unsubscribe" element={<Unsubscribe />} />
            <Route path="/politica-privacidade" element={<PrivacyPolicy />} />
            <Route path="/termos-condicoes" element={<TermsConditions />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieBanner />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
