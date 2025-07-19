import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams, useLocation} from 'react-router-dom';
import { supabase } from "../supabaseClient";
import type { Tables} from "../database.types.ts";
import './TravelBlogs.css'
import Header_text from './Header_text';
import Header_title from './Header_title.tsx';
import Section from './Section.tsx';


const LOCAL_KEY_PREFIX = "travelblog_data_";



export default function TravelBlog() {
    const {slug} = useParams();

    const location = useLocation();
    const storageKey = `${LOCAL_KEY_PREFIX}${slug}`;

    const [travelID, setTravelID] = useState<number>(1);
    const [PlaceBlog, SetPlaceBlog] = useState<Tables<'Travel'>>()
    const [markdown, setMarkdown] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPlaces() {
            const { data } = await supabase
            .from('Travel')
            .select("*")
            .eq('id', travelID)
            .single<Tables<'Travel'>>();
            SetPlaceBlog(data ?? undefined)
        }

        async function loadMarkdown() {
            if (PlaceBlog?.md_file_location) {
                const { data, error } = await supabase
                .storage
                .from('travel')
                .download(PlaceBlog.md_file_location);
                

                if (error) {
                    console.error("Error fetching .md file:", error.message);
                    return;
                }
                const text = await data.text();
                setMarkdown(text);

                console.log(data.text);
            }
        }

        const stateData = location.state as number | undefined;

        if (stateData) {
            setTravelID(stateData);
            localStorage.setItem(storageKey, String(stateData));
        } 
        else {
            const stored = localStorage.getItem(storageKey);
            if (stored) {
                setTravelID(Number(stored));
            }
        }

        fetchPlaces();

        loadMarkdown();
    }, [location.state, storageKey]);

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
    )
}
