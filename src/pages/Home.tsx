import { useEffect } from "react";
import Section from "../components/Section";
import './Home.css'

import My from '../assets/images/My.webp'
import CV from '../assets/images/CV.png'
import Orcid from '../assets/images/ORCID_iD.svg'

export default function Home() {
    useEffect(() => {
    document.title = `${Home} | Akshat Singh`;
    }, [Home]);
    return (
        <>
            <Section id="about">
                <div className="home">
                    <div className="my-image">
                        <img src={My} alt="Akshat Singh" />
                    </div>
                    <div className="name">
                        <h1>Hi!<br />I'm Akshat</h1>
                    </div>
                    <div className="line">
                        -------------------------------
                    </div>

                    <div className="about">
                        <p>
                            I am a final year BS-MS(Dual Degree) student at the
                            Indian Institue of Science Education and Research(IISER) Bhopal,
                            in the department of Electrical Engineering and
                            Computer Science (EECS).<br />
                            My Masters thesis focuses on Swarm Robotics and Virtual/Mixed
                            Reality, exploring the interaction between humans and robots
                            under the guidance of Prof. Sujit PB in the MOON lab at IISER Bhopal.
                        </p>
                        <p>
                            Beyond academics, I am passionate about new technologies and
                            strive to learn about any new piece of technology I encounter.<br />
                            I enjoy anime, movies, and video games, with a passion for
                            speedrunning, where I hold world records in a few games.
                            I also like reading and traveling, which broaden my perspectives.<br />
                            In my free time, I work on small coding projects to
                            enhance my skills.
                        </p>
                    </div>
                    <div className="CV">
                        <a href="/Documents/My_CV.pdf" className="CV-button" target="_blank">
                            <img src={CV} alt="CURRICULUM VITAE" className="contact-icon-home" />
                            <span className="cv-text">CURRICULUM VITAE</span>
                        </a>
                        <a href="https://orcid.org/0009-0002-7938-7529" className="CV-button" target="_blank">
                            <img src={Orcid} alt="ORCID" className="contact-icon-home" />
                            <span className="cv-text">ORCID</span>
                        </a>
                    </div>
                </div>
            </Section>
        </>
    );
}