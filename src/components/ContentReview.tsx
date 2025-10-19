import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Movies from "../data/trackers/movies.json";
import Header_text from "./Header_text";
import Header_title from "./Header_title";
import Section from "./Section";

import MD_loader from "./MD_loader";

interface locationProp {
  type: string;
  id: string;
}

interface MovieProp {
  id: string;
  name: string;
  status: string;
  rating: number;
}

export default function ContentReview() {
  const location = useLocation();

  const [movieID, setMovieID] = useState<string>("");
  const [movieBlog, setMovieBlog] = useState<MovieProp | undefined>(undefined);

  useEffect(() => {
    const stateData = location.state as locationProp | undefined;
    if (stateData) {
      setMovieID(stateData.id);
    } else {
      console.error(
        "Missing route state! Expected type and id in location.state",
      );
    }
  }, [location.state]);

  useEffect(() => {
    if (!movieID) return;
    else {
      const movie = Movies.rows.find((item) => item.id == movieID);
      setMovieBlog(movie || undefined);
    }
  }, [movieID]);

  // Handle missing data case
  if (!movieBlog) {
    return <div>No info found for this media.</div>;
  }

  return (
    <>
      <Header_text>
        <Header_title>{movieBlog.name}</Header_title>
      </Header_text>

      <Section id="markdown-text">
        <MD_loader src={`/data/reviews/movies/${movieBlog?.id}.md`} />
      </Section>
    </>
  );
}
