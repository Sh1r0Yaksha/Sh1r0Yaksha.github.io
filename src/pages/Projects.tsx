import Section from "../components/Section";
import Card from "../components/Card";
import Header_text from "../components/Header_text";
import Header_title from "../components/Header_title";
import "./Projects.css";

import BS_Project from "../assets/documents/BS_Project.pdf";
import Ame from "../assets/images/Ame.png";
import VR from "../assets/images/VR.jpg";
import Moo from "../assets/images/Moo.png";
import RSA from "../assets//images/RSA.png";
import Breast_Cancer from "../assets/images/Breast_Cancer.png";
import AmeGroundPound from "../assets/images/AmeGroundPound.png";
import Bioinfo from "../assets/images/Bioinfo.png";
import BioStatistics from "../assets/images/BioStatistics.png";
import Convex_Hull from "../assets/images/Convex Hull.png";
import Jumpy_Moo_img from "../assets/images/jumpy_Moo.png";

export default function Projects() {
  return (
    <div className="body">
      <Header_text>
        <Header_title>Projects and Ongoing Work</Header_title>
      </Header_text>
      <Section id="Projects">
        <div className="projects-row">
          <Card
            href={BS_Project}
            img_src={VR}
            img_alt="Virtual Reality"
            display_text="User-Interface for Virtual Reality-Based Human Swarm Interaction"
          >
            Final Year Project(ECS412). This project involves developing
            interfaces to facilitate collaboration between robotics swarms and
            humans in the Virtual Reality domain
          </Card>
          <Card
            href="https://github.com/Sh1r0Yaksha/SmolTAS"
            img_src={Ame}
            img_alt="SmolTAS"
            display_text="SmolTAS"
          >
            A mod for the game Smol Ame that helps with tool-assisted speedruns.
            It allows users to write inputs on a .txt file, control game speed,
            pause/resume at any point, and save/load player position and timing
          </Card>
          <Card
            href="https://github.com/Sh1r0Yaksha/Flappy_Moo"
            img_src={Moo}
            img_alt="Moo"
            display_text="Flappy Moo"
          >
            A Flappy Bird clone with various changes. Created from scratch using
            WinForms in C#
          </Card>
        </div>

        <div className="projects-row">
          <Card
            href="https://github.com/Sh1r0Yaksha/RSA"
            img_src={RSA}
            img_alt="RSA"
            display_text="RSA Encryption and Decryption"
          >
            A hobby project created while doing the Modern Cryptography course
            (ECS610), which implements the vanilla RSA encryption and decryption
            scheme.
          </Card>

          <Card
            href="https://github.com/Borun2002/Breast-Cancer-Classification"
            img_src={Breast_Cancer}
            img_alt="Breast Cancer Awareness"
            display_text="Breast Cancer Classification"
          >
            Semester Project for the course Data Science in Practice (DSE315).
            This project involved using the Breast Cancer Wisconsin data and
            classifying cases as benign or malignant.
          </Card>

          <Card
            href="https://github.com/Sh1r0Yaksha/SAMI"
            img_src={AmeGroundPound}
            img_alt="SAMI"
            display_text="Smol Ame Mod Installer(SAMI)"
          >
            A mod installer for Smol Ame game that fetches all available mods on
            Github and lets users install selected mods locally. Made using
            WinForms.
          </Card>
        </div>

        <div className="projects-row">
          <Card
            href="https://github.com/Sh1r0Yaksha/BioInformatics"
            img_src={Bioinfo}
            img_alt="Bioinformatics"
            display_text="Bioinformatics Algorithms"
          >
            A hobby project created while auditing the Bioinformatics course
            (BIO402), which implements the plot of dot matrix alignment of two
            sequences and the global sequence alignment of two sequences using
            the Needleman–Wunsch algorithm
          </Card>

          <Card
            href="https://github.com/Sh1r0Yaksha/Biostatistics_Semester_Project"
            img_src={BioStatistics}
            img_alt="BioStatistics"
            display_text="BioStatistics"
          >
            Semester Project for the course Biostatistics(BIO407). This project
            involved using data from various cell lines involving HIV-1 nef, a
            protein important for the development of AIDS, and performing
            statistical studies on it.
          </Card>

          <Card
            href="https://github.com/Sh1r0Yaksha/ConvexHullAlgorithms"
            img_src={Convex_Hull}
            img_alt="Convex Hull"
            display_text="Convex Hull Algorithms"
          >
            Implementation of the Graham's Scan and Jarvis March algorithms
            learnt while working with Dr. Sujoy Bhore
          </Card>
        </div>

        <div className="projects-row">
          
          <Card
            href="/random/gamedev/jumpy_moo"
            img_src={Jumpy_Moo_img}
            img_alt="Jumpy Moo"
            display_text="A google dino game clone. Made using Unity"
            external={false}
          />
        </div>
      </Section>
    </div>
  );
}
