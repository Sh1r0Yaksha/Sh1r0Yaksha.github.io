import Header_text from "../../components/Header_text";
import Header_title from "../../components/Header_title";
import Table from "../../components/Table";
import GamesJSON from '../../data/trackers/games.json'

export default function Games() {
    return(
        <>
            <Header_text>
                <Header_title>
                    Games
                </Header_title>
                    <p>
                        Here is a list of Games I have played, am playing, or am planning to play.
                    </p>
            </Header_text>    
            
            <Table jsonData={GamesJSON} initialVisibleRows={5} href="" isOnPage={true} />
        </>
    )
}