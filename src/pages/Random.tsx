import Header_text from '../components/Header_text'
import Header_title from '../components/Header_title'
import Section from '../components/Section'
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
                            <li>🤹‍♂️ Basically... anything I felt like adding</li>
                        </ul>
                <p>
                    Nothing too serious or groundbreaking — just a little corner of the internet where I keep my chaotic good energy. Feel free to explore, click around, and maybe waste a few minutes. That's kind of the point.
                </p>
            </Header_text>
            <Section id='Games'>
                <Header_text>
                    <Header_title>Games</Header_title>
                </Header_text>
            </Section>
            
        </>
    )
}