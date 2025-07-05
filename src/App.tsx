import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Wanderings from "./pages/Wanderings";
import NotFound from "./pages/NotFound";
import Random from "./pages/Random";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="wanderings" element={<Wanderings />} />
          <Route path="random" element={<Random />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;