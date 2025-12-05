import Section from "../components/Section";
import './Home.css'

import CV from '../assets/documents/My_CV.pdf'
import My from '../assets/images/My.webp'
import CV_img from '../assets/images/CV.png'
import Orcid from '../assets/images/ORCID_iD.svg'

export default function Home() {
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
                            I am a PhD researcher at Instituto Superior Técnico (IST), Lisbon Working in the Institute for Systems and Robotics (ISR) at the Department of Electronics and Computer Engineering (DEEC).<br />
                            My Research focuses on the intersection of Extended Reality with Drone Swarms, exploring the various methods for human-swarm interaction which I am pursuing under the supervision of Dr. Meysam Basiri and Prof. Rodrigo Ventura.<br />
                            This research work is an extension of my Masters thesis which focused on Swarm Robotics and Virtual/Mixed Reality which I pursued under the guidance of Prof. Sujit PB in the MOON lab at IISER Bhopal, where I also completed my bachelors and masters as a 5-year dual-degree.
                        </p>
                        <p>
                            Beyond academics, I am passionate about new technologies and strive to learn about any new piece of technology I encounter.<br />
                            I enjoy anime, movies, and video games, with a passion for speedrunning, where I hold world records in a few games. I also like reading and traveling, and have started to cook as a hobby, which broaden my perspectives.<br />
                            In my free time, I work on small coding projects to enhance my skills.
                        </p>
                    </div>
                    <div className="CV">
                        <a href={CV} className="CV-button" target="_blank">
                            <img src={CV_img} alt="CURRICULUM VITAE" className="contact-icon-home" />
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