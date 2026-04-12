import { Router, Route, Routes } from "./router";
import Index from "./pages/Index.tsx";
import Demo from "./pages/Demo.tsx";
import DemoProgress from "./pages/DemoProgress.tsx";
import DemoDashboard from "./pages/DemoDashboard.tsx";
import Privacy from "./pages/Privacy.tsx";
import Terms from "./pages/Terms.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/demo/progress" element={<DemoProgress />} />
      <Route path="/demo/dashboard" element={<DemoDashboard />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
