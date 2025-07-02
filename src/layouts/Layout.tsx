import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Layout.css";
import github_icon from '../assets/images/github-icon.svg';
import orcid_icon from '../assets/images/ORCID_iD.svg';
import linkedIn_icon from "../assets/images/linkedin-app-icon.svg";

export default function Layout() {
  return (
    <>
      <Navbar />

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <div id="Contact" className="item contacts">
          <div className="contact-item contact-text">Contact:</div>
          <div className="text-contacts">
            <div className="contact-item">
              <div className="contact-text">+91-7860264227</div>
            </div>
            <div className="contact-item">
              <a className="contact-text" href="mailto:akshats20@iiserb.ac.in">
                akshats20@iiserb.ac.in
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
              href="https://www.linkedin.com/in/akshat-singh-2b0466218/"
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
          </div>
        </div>

        <div className="footer-content">
          <p>&copy; 2025 Akshat Singh. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
