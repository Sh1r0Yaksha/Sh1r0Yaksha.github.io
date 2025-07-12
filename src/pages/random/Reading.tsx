import Header_text from "../../components/Header_text";
import Header_title from "../../components/Header_title";
import Table from "../../components/Table";
import ReadingJSON from '../../data/trackers/reading.json'

export default function Reading() {
    return(
        <>
            <Header_text>
                <Header_title>
                    Books, Manga, LNs
                </Header_title>
                    <p>
                        Here is a list of books, Manga, or LNs I have read, am reading, or am planning to watch.
                    </p>
            </Header_text>    
            
            <Table jsonData={ReadingJSON} initialVisibleRows={5} href="" isOnPage={true} />
        </>
    )
}