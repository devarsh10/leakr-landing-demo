import { Router, Route, Routes } from "./router";
import Index from "./pages/Index.tsx";
import Demo from "./pages/Demo.tsx";
import NotFound from "./pages/NotFound.tsx";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
