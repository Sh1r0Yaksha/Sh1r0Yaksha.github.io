import Places from '../data/travel/Travel.json'

import { MapContainer, TileLayer, Marker} from 'react-leaflet'
import type { LatLngTuple } from 'leaflet';
import { useNavigate } from 'react-router-dom';
import MarkerClusterGroup from 'react-leaflet-cluster';
import Header_text from '../components/Header_text';
import Header_title from '../components/Header_title';

import 'leaflet/dist/leaflet.css'
import './Wanderings.css'

export default function Wanderings() 
{
    const navigate = useNavigate();

    const handleMarkerClick = (id_place: string) => {
        navigate(`/wanderings/${id_place}`, { state: id_place });
    };

    return (
        <>
        <div className='body'>
            <Header_text>
                <Header_title>Welcome to my Wanderings</Header_title>
                <p>
                    I love traveling, so here's a map with markers showing the places I've been so far.
                    Click on a marker to read a short blog or note about the spot.
                </p><br/>
                <p>
                    You might find a few photos here and there — but fair warning, I'm not much of a photographer (in fact, I don't really enjoy taking pictures), so the visuals are a bit limited.
                    That's mostly because I believe the beauty of nature is best enjoyed with your own eyes.
                </p><br/>
                <p>
                    The work's still in progress, so it might take a while to fill in the full list with all the blogs — that is, if I can manage to keep my blogging time even half as consistent as my traveling, coding, and gaming time.
                    That said, the number of markers will only grow as time goes on — the journey's far from over.
                </p>
            </Header_text>
            <div className='map-container'>
                <MapContainer center={[23.2858, 77.2755]} zoom={2} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    <MarkerClusterGroup className='MP-markers'>
                        {Places.map(place => (
                         <Marker
                            key={place.id_place}
                            position={[place.Latitude, place.Longitude] as LatLngTuple}
                            eventHandlers={{
                                click: () => {
                                handleMarkerClick(place.id_place);
                                },
                            }}>
                         </Marker>   
                        ))}
                    </MarkerClusterGroup>
                    
                </MapContainer>
            </div>
        </div>
        </>
    )
}