import { Link } from 'react-router-dom'

import Header_text from '../components/Header_text'
import Header_title from '../components/Header_title'
import Carousel from '../components/Carousel'
import Table from '../components/Table'
import Section from '../components/Section'
import Card from '../components/Card'
import Jumpy_Moo_img from '../assets/images/jumpy_Moo.png'
import WFC_img from '../assets/images/WFC.png'
import XKCD from '../components/XKCD'
import JokesAPI from '../components/JokesAPI'
import DadJokes from '../components/DadJokes'

import moviesJSON from '../data/trackers/movies.json'

import './Random.css'

export default function Random() {
    return (
        <>
            <Header_text>
                <Header_title>Welcome to the Random page</Header_title>
                <p>
                    Hey there! 👋
                    This is my personal playground — a digital canvas where I dump all the random (but fun!) stuff I do in my free time.

                    Here, you'll find:
                
                </p>

                        <ul>
                            <li>🎲 Games I'm working on (or dreaming about)</li>
                            <li>📺 A tracker for all the anime, books, movies, and games I've consumed — or still plan to</li>
                            <li>🧠 Some tech jokes, because why not?</li>
                            <li>🕹️ Easter eggs tucked away for curious clickers (see if you can find a few!)</li>
                            <li>🤹‍♂️ Basically... anything I felt like adding.</li>
                            <li>The list will keep growing...</li>
                        </ul>
                <p>
                    Nothing too serious or groundbreaking — just a little corner of the internet where I keep my chaotic good energy. Feel free to explore, click around, and maybe waste a few minutes. That's kind of the point.
                </p>
            </Header_text>
            <Section id='Games'>
                <Header_text>
                    <Header_title>
                        <Link to='gamedev'> Game Development </Link>
                    </Header_title>
                    <p>
                        Here are a few games I made during my free time
                    </p>
                </Header_text>
                
                <Carousel>
                        <Card
                            href='gamedev/jumpy_moo'
                            img_src={Jumpy_Moo_img}
                            img_alt="Jumpy Moo"
                            display_text="A google dino game clone. Made using Unity"
                            external={false}
                            custom_class='carousel-card'>
                                A game made using unity with custom assets for webGL.
                        </Card>
                        <Card
                            href='gamedev/WFC'
                            img_src={WFC_img}
                            img_alt="Wave Function Collapse"
                            display_text='Watch funny roads forming using "quantum physics"'
                            external={false}
                            custom_class='carousel-card'>
                                A simulated view of the wave function collapse algorithm, with grayscale to colour effects
                        </Card>
                </Carousel>
            </Section>

            <Section id='Tracker'>
                <Header_text>
                    <Header_title>
                        <Link to='movies'> Movies</Link>
                    </Header_title>
                </Header_text>
                    <Table jsonData={moviesJSON} initialVisibleRows={3} href='/random/movies'/>
                

                <Header_text>
                    <Header_title>
                        <Link to='games'> Games</Link>
                    </Header_title>
                    <p>
                        Table of games
                    </p>
                </Header_text>

                <Header_text>
                    <Header_title>
                        <Link to='anime'> Anime</Link>
                    </Header_title>
                    <p>
                        Table of anime
                    </p>
                </Header_text>
                <Header_text>
                    <Header_title>
                        <Link to='reading'> Manga, Books, LNs</Link>
                    </Header_title>
                    <p>
                        Table of reads 
                    </p>
                </Header_text>
            </Section>
            
            <Section id='jokes'>
                <Header_text>
                    <Header_title>Jokes</Header_title>
                    <JokesAPI></JokesAPI>
                </Header_text>
                <XKCD></XKCD>
                <DadJokes></DadJokes>
            </Section>
        </>
    )
}