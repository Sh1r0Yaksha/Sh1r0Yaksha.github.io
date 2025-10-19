import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './MD_loader.css'

interface MD_loader_props {
    src : string
}

const MD_loader: React.FC<MD_loader_props> = ({src}) => {

    const [markdown, setMarkdown] = useState<string>('');

    useEffect(() => {
            async function loadMarkdown() {
                try {
                const res = await fetch(`${src}`);
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
                } catch {
                console.warn("Markdown not found, loading 404 fallback.");
    
                try {
                    const fallbackRes = await fetch('/data/404.md');
                    const fallbackText = await fallbackRes.text();
                    setMarkdown(fallbackText);
                } catch (fallbackErr) {
                    console.error("Failed to load fallback 404 markdown:", fallbackErr);
                    setMarkdown("# Page Not Found\n\nThe requested blog does not exist.");
                }
                }
            }
    
        loadMarkdown();
        }, [src]);

    return(
        <>
        <div className='markdown-content'>
            {markdown ? (
                <ReactMarkdown>{markdown}</ReactMarkdown>
            ) : (
                <p>Loading markdown...</p>
            )}
        </div>
        
        </>
    )
}

export default MD_loader;