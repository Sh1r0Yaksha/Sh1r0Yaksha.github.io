import Section from "../components/Section";
import Header_text from "../components/Header_text";
import Header_title from "../components/Header_title";
import publications from "../data/Publications.json";

import "./Publications.css";

type Publication = {
  text: string;
  doi: string;
};

const pubs = publications as Publication[];

export default function Publications() {
    return (
        <div className="body">
            <Header_text>
                <Header_title>Publications</Header_title>
            </Header_text>
            <Section id="Publications">
                <div className="pubs">
                    <ol className="bracket-list">
                        {pubs.map((pub) => (
                        <li key={pub.doi}>
                            {pub.text}, doi:{" "}
                            <a
                            href={`https://doi.org/${pub.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                            {pub.doi}
                            </a>.
                        </li>
                        ))}
                    </ol>
                </div>
            </Section>
        </div>
    )

}