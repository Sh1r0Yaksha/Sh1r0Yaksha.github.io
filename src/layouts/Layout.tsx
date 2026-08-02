import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Layout.css";
import github_icon from '../assets/images/github-icon.svg';
import orcid_icon from '../assets/images/ORCID_iD.svg';
import linkedIn_icon from "../assets/images/linkedin-app-icon.svg";
import scholar_icon from '../assets/images/scholar.png'

export default function Layout() {
  return (
    <div className="overall">
      <Navbar />

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <div id="Contact" className="item contacts">
          <div className="contact-item contact-text">Contact:</div>
          <div className="text-contacts">
            <div className="contact-item">
              <div className="contact-text">+351-920751547</div>
            </div>
            <div className="contact-item">
              <a className="contact-text" href="mailto:akshat.singh@tecnico.ulisboa.pt">
                akshat.singh@tecnico.ulisboa.pt
              </a>
            </div>
            <div className="contact-item">
              <a className="contact-text" href="mailto:akshat12y@gmail.com">
                akshat12y@gmail.com
              </a>
            </div>
          </div>
          <div className="contact-item">
            <a
              href="https://www.linkedin.com/in/akshat12y/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={linkedIn_icon}
                alt="LinkedIn"
                className="contact-icon"
                loading="lazy"
              />
            </a>
            <a
              href="https://github.com/Sh1r0Yaksha"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={github_icon}
                alt="Github"
                className="contact-icon"
                id="github-icon"
                loading="lazy"
              />
            </a>
            <a
              href="https://orcid.org/0009-0002-7938-7529"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={orcid_icon}
                alt="ORCID"
                className="contact-icon"
                loading="lazy"
              />
            </a>
            <a
              href="https://scholar.google.com/citations?hl=en&user=cLYG3IwAAAAJ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={scholar_icon}
                alt="Scholar"
                className="contact-icon"
                loading="lazy"
              />
            </a>
          </div>
        </div>

        <div className="footer-content">
          <p>Made by Akshat. Feel free to use it as a template anywhere😊</p>
        </div>
      </footer>
    </div>
  );
}
