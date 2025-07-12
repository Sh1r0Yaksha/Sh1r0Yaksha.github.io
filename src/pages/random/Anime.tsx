import Header_text from "../../components/Header_text";
import Header_title from "../../components/Header_title";
import Table from "../../components/Table";
import AnimeJSON from '../../data/trackers/anime.json'

export default function Anime() {
    return(
        <>
            <Header_text>
                <Header_title>
                    Anime
                </Header_title>
                    <p>
                        Here is a list of anime I have watched, am watching, or am planning to watch.
                    </p>
            </Header_text>
            
            <Table jsonData={AnimeJSON} initialVisibleRows={5} href="" isOnPage={true} />
        </>
    )
}