import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import './XKCD.css'

interface DadJokeInter {
    id: string,
    joke: string,
    status: number
}

const DadJokes: React.FC = () => {
    
    const [dadJoke, SetDadJoke] = useState<DadJokeInter | null>(null);
    const [error, setError] = useState<string | null>(null); 
    const [loading, SetLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const fetchDadJoke = async () => {
            try {
                const response = await fetch("https://icanhazdadjoke.com/", {
                headers: {
                    Accept: "application/json"
                }
                });
                if (!response.ok) throw new Error("No dad Jokes for you");
                const data: DadJokeInter = await response.json();
                SetDadJoke(data);
            }
            catch (err) {
                setError((err as Error).message);
            }
            finally {
                SetLoading(false);
            }
        };

        fetchDadJoke();
    }, []);

    if (loading) return(<p>loading...</p>);
    if (error) return (<p>{error}</p>);
    if (!dadJoke) return null;

    return (
        <>
            <h1>Dad Joke</h1>
            <p>{dadJoke.joke}</p>
            <Link to={'https://icanhazdadjoke.com/'} className="attribute" target="_blank">icanhazdadjoke</Link>
        </>
    )
}

export default DadJokes
