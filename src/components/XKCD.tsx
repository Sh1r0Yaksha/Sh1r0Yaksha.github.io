import React, { useEffect, useState } from 'react';
import './XKCD.css'
import { Link } from 'react-router-dom';

// Define the structure of the XKCD JSON response
interface XKCDComic {
  month: string;
  num: number;
  link: string;
  year: string;
  news: string;
  safe_title: string;
  transcript: string;
  alt: string;
  img: string;
  title: string;
  day: string;
}

const XKCD: React.FC = () => {
  const [comic, setComic] = useState<XKCDComic | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComic = async () => {
      try {
        const response = await fetch('https://xkcd.now.sh/?comic=latest');
        if (!response.ok) throw new Error('Failed to fetch comic');
        const data: XKCDComic = await response.json();
        setComic(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchComic();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!comic) return null;

  return (
    <div className='xkcd'>
      <h1>xkcd</h1>
      <h2>{comic.title}</h2>
      <img
        src={comic.img}
        alt={comic.alt}
      />
      <p>{comic.alt}</p>
      <p className='attribute'><Link to='https://github.com/mrmartineau/xkcd-api' target="_blank">xkcd-api</Link></p>
    </div>
  );
};

export default XKCD;
