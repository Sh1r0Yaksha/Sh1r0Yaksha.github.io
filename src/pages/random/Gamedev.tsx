import './Gamedev.css'
import Card from "../../components/Card";
import Header_text from "../../components/Header_text";
import Header_title from "../../components/Header_title";
import Section from "../../components/Section";
import Jumpy_Moo_img from '../../assets/images/jumpy_Moo.png'

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
                        img_src={Jumpy_Moo_img}
                        img_alt="Jumpy Moo"
                        display_text="A google dino game clone. Made using Unity"
                        external={false}>
                            A game made using unity with custom assets for webGL.
                    </Card>
                </div>
            </Section> 
        </>
    )
}