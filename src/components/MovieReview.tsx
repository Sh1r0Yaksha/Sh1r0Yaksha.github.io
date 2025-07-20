import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useLocation } from 'react-router-dom';

import Movies from '../data/trackers/movies.json'
import Header_text from './Header_text';
import Header_title from './Header_title';
import Section from './Section';

interface locationProp {
    type: string ;
    id: string;
}

interface MovieProp {
    id: string;
    name: string;
    status: string;
    rating: number;
}

export default function MovieReview() {
    const location = useLocation();

    const [movieID, setMovieID] = useState<string>('');
    const [markdown, setMarkdown] = useState<string>('');
    const [movieBlog, setMovieBlog] = useState<MovieProp | undefined>(undefined)

    useEffect(() => {
        const stateData = location.state as locationProp | undefined;
        if (stateData) {
            setMovieID(stateData.id);
        } else {
            console.error("Missing route state! Expected type and id in location.state");
        }
    }, [location.state]);

    useEffect(() => {
        if (!movieID) return;
        else{
        const movie = Movies.rows.find(item => item.id == movieID);
        setMovieBlog(movie || undefined)
        }
    }, [movieID]);

    useEffect(() => {
    if (!movieBlog?.id) return;

    async function loadMarkdown() {
        try {
        const res = await fetch(`/data/reviews/movies/${movieBlog?.id}.md`);
        const text = await res.text();

        // 🧠 Check if we accidentally received index.html instead of the md file
        if (
            !res.ok ||
            text.startsWith("<!DOCTYPE html>") ||
            res.headers.get("content-type")?.includes("text/html")
        ) {
            throw new Error("Received HTML instead of markdown (probably 404)");
        }

        setMarkdown(text);
        } catch (err) {
        console.warn("Markdown not found, loading 404 fallback.");

        try {
            const fallbackRes = await fetch('/data/travel/blogs/404.md');
            const fallbackText = await fallbackRes.text();
            setMarkdown(fallbackText);
        } catch (fallbackErr) {
            console.error("Failed to load fallback 404 markdown:", fallbackErr);
            setMarkdown("# Page Not Found\n\nThe requested blog does not exist.");
        }
        }
    }

    loadMarkdown();
    }, [movieBlog]);

    // Handle missing data case
    if (!movieBlog) {
    return <div>No travel info found for this destination.</div>;
    }

    return (
    <>
        <Header_text>
            <Header_title>{movieBlog.name}</Header_title>
        </Header_text>

        <Section id='markdown-text'>
        {markdown ? (
            <ReactMarkdown>{markdown}</ReactMarkdown>
        ) : (
            <p>Loading markdown...</p>
        )}
        </Section>
    </>
    );
}