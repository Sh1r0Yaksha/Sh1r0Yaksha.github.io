import './Gamedev.css'
import Card from "../../components/Card";
import Header_text from "../../components/Header_text";
import Header_title from "../../components/Header_title";
import Section from "../../components/Section";

export default function Gamedev() {
    return(
        <>
            <Header_text>
                    <Header_title>
                        Games I have created which can be played on the web
                    </Header_title>
                </Header_text> 
            <Section id="gamedev">
                <div className="games-row">
                    <Card
                        href='jumpy_moo'
                        img_src=''
                        img_alt="Jumpy Moo"
                        display_text="A google dino game clone. Made using Unity">
                            Text
                    </Card>
                </div>
            </Section> 
        </>
    )
}