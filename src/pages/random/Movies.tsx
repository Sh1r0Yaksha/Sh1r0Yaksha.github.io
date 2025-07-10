import Header_text from "../../components/Header_text";
import Header_title from "../../components/Header_title";
import Table from "../../components/Table";
import MoviesJSON from '../../data/trackers/movies.json'

export default function Movies() {
    return(
        <>
            <Header_text>
                <Header_title>
                    Movies
                </Header_title>
                    <p>
                        Here is a list of movies I have watched or am planning to watch.
                    </p>
            </Header_text>    
            
            <Table jsonData={MoviesJSON} initialVisibleRows={5} href="" isOnPage={true} />
        </>
    )
}