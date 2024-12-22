import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import Layout from '@/components/layout/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import Home from '@/pages/Home';
import Whitepaper from '@/pages/Whitepaper';
import Plan from '@/pages/Plan';
import Governance from '@/pages/Governance';
import UBI from '@/pages/UBI';
import FoundingCitizen from '@/pages/FoundingCitizen';
import FAQ from '@/pages/FAQ';
import SOVconnect from '@/pages/SOVconnect';
import Admin from '@/pages/Admin';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="sov-states-theme">
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/whitepaper" element={<Whitepaper />} />
              <Route path="/plan" element={<Plan />} />
              <Route path="/governance" element={<Governance />} />
              <Route path="/ubi" element={<UBI />} />
              <Route path="/founding-citizen" element={<FoundingCitizen />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/sovconnect" element={<SOVconnect />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Layout>
        </Router>
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;