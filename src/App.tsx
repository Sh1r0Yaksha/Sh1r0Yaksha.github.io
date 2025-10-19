import { Routes, Route, HashRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Wanderings from "./pages/Wanderings";
import NotFound from "./pages/NotFound";
import Random from "./pages/Random";
import Gamedev from "./pages/random/Gamedev";
import Movies from "./pages/random/Movies";
import Games from "./pages/random/Games";
import Anime from "./pages/random/Anime";
import Reading from "./pages/random/Reading";
import Jumpy_Moo from "./pages/random/gamedev/Jumpy_Moo";
import WFC from "./pages/random/gamedev/WFC";
import TravelBlog from "./components/TravelBlogs";
import ContentReview from "./components/ContentReview";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="wanderings" element={<Wanderings />} />
          <Route path="wanderings/:slug" element={<TravelBlog />} />
          <Route path="random" element={<Random />} />
          <Route path="random/gamedev" element={<Gamedev />} />
          <Route path="random/gamedev/jumpy_moo" element={<Jumpy_Moo />} />
          <Route path="random/gamedev/WFC" element={<WFC />} />
          <Route path="random/movies" element={<Movies />} />
          <Route path="random/movies/:slug" element={<ContentReview />} />
          /* TODO: Create components for below and change it to them */
          <Route path="random/games" element={<Games />} />
          <Route path="random/games/:slug" element={<ContentReview />} />
          <Route path="random/anime" element={<Anime />} />
          <Route path="random/anime/:slug" element={<ContentReview />} />
          <Route path="random/reading" element={<Reading />} />
          <Route path="random/reading/:slug" element={<ContentReview />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
