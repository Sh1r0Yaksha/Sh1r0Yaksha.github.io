import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useLocation } from 'react-router-dom';
import { supabase } from "../supabaseClient";
import type { Tables } from "../database.types.ts";
import './TravelBlogs.css';
import Header_text from './Header_text';
import Header_title from './Header_title.tsx';
import Section from './Section.tsx';

export default function TravelBlog() {
  const location = useLocation();

  const [travelID, setTravelID] = useState<number>(0);
  const [PlaceBlog, SetPlaceBlog] = useState<Tables<'Travel'>>();
  const [markdown, setMarkdown] = useState<string>('');

  // 🟢 Step 1: Set travelID from location.state ONCE
  useEffect(() => {
    const stateData = location.state as number | undefined;
    if (stateData) {
      setTravelID(stateData);
    } else {
      console.error("Missing route state! Expected travelID in location.state");
    }
  }, [location.state]);

  // 🟢 Step 2: Fetch place info when travelID is available
  useEffect(() => {
    if (!travelID) return;
    if (travelID){
        async function fetchPlace() {
        const { data, error } = await supabase
            .from('Travel')
            .select('*')
            .eq('id', travelID)
            .single<Tables<'Travel'>>();

        if (error) {
            console.error("Error fetching place from Supabase:", error.message);
        } else {
            SetPlaceBlog(data ?? undefined);
        }}
        fetchPlace();
    }
  }, [travelID]);

  // 🟢 Step 3: Load markdown after PlaceBlog is set
  useEffect(() => {
    if (!PlaceBlog?.id_place) return;

    async function loadMarkdown() {
        try {
        const res = await fetch(`/data/travel/blogs/${PlaceBlog?.id_place}.md`);
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
    }, [PlaceBlog]);


  // Handle missing data case
  if (!PlaceBlog) {
    return <div>No travel info found for this destination.</div>;
  }

  return (
    <>
      <Header_text>
        <Header_title>{PlaceBlog.Place}</Header_title>
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
