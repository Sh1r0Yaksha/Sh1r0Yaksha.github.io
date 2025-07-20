import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import TravelBlog from "./components/TravelBlogs";
import MovieReview from "./components/MovieReview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="wanderings" element={<Wanderings />} />
          <Route path="wanderings/:slug" element={<TravelBlog />} />

          <Route path="random" element={<Random />} />
          <Route path="random/gamedev" element={<Gamedev />} />
          <Route path="random/gamedev/jumpy_moo" element={<Jumpy_Moo />} />
          
          <Route path="random/movies" element={<Movies />} />
          <Route path="random/movies/:slug" element={<MovieReview />} />

          <Route path="random/games" element={<Games />} />
          <Route path="random/anime" element={<Anime />} />
          <Route path="random/reading" element={<Reading />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;