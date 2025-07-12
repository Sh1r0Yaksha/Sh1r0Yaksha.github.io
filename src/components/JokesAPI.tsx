import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './JokesAPI.css'

const JokesAPI: React.FC = () => {
    const [joke, SetJoke] = useState<String | null>("");
      const [loading, setLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null);
    

    useEffect( () => {
        const fetchJoke = async () => {
            try {
                const response = await fetch('https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&format=txt&type=single');
                if (!response.ok) throw new Error("Oops! Failed to load a joke");
                const data: string = await response.text();
                SetJoke(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            };
        };

        fetchJoke();
    }, []);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    return(
        <>
            <p>{joke}</p>
            <Link to={'https://v2.jokeapi.dev'} className="attribute" target="_blank">JokesAPI</Link>
        </>
    )
}

export default JokesAPI