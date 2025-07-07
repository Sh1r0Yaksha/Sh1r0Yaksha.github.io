import React from 'react';
import type { ReactNode } from 'react';;
import './Card.css';
import { Link } from 'react-router-dom';

interface CardProps {
    href: string;
    img_src: string;
    img_alt: string;
    display_text: string;
    custom_class?: string;
    children?: ReactNode;
}

const Card: React.FC<CardProps> = ({ href, img_src, img_alt, display_text, custom_class, children }) => {
    return (
            <Link className={`card ${custom_class || ""}`} to={href} target="_blank">
            <img src={img_src} alt={img_alt} loading="lazy"/>
            <div className="content">
                <p>{display_text}</p>
            </div>
            <div className="card-hover-text">
                {children}
            </div>
        </Link>
    );
}

export default Card;