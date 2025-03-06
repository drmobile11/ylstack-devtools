import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import ApiGenerator from "./pages/ApiGenerator";
import ComponentGenerator from "./pages/ComponentGenerator";
import FullStackGenerator from "./pages/FullStackGenerator";
import CrudGenerator from "./pages/CrudGenerator";
import GeneratorHub from "./pages/GeneratorHub";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api-generator" element={<ApiGenerator />} />
        <Route path="/component-generator" element={<ComponentGenerator />} />
        <Route path="/fullstack-generator" element={<FullStackGenerator />} />
        <Route path="/crud-generator" element={<CrudGenerator />} />
        <Route path="/generator-hub" element={<GeneratorHub />} />
        <Route path="/backend-generator" element={<ApiGenerator />} />
        <Route path="/frontend-generator" element={<ComponentGenerator />} />
        <Route path="/color-generator" element={<GeneratorHub />} />
        <Route path="/svg-generator" element={<GeneratorHub />} />
        <Route path="/workflow-generator" element={<GeneratorHub />} />
        {import.meta.env.VITE_TEMPO === "true" && <Route path="/tempobook/*" />}
      </Routes>
    </Suspense>
  );
}

export default App;
