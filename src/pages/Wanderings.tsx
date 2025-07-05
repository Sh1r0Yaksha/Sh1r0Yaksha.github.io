import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import type { LatLngTuple } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import markerData from '../data/travel/markers.json';
import Header_text from '../components/Header_text';
import Header_title from '../components/Header_title';

import 'leaflet/dist/leaflet.css'
import './Wanderings.css'


export type Marker = {
id: string;
geocode: LatLngTuple;
popup: string;
href: string;
};

export const markers: Marker[] = markerData as Marker[];

export default function Wanderings() 
{
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
                    {/* <Marker position={[51.505, -0.09]}>
                        <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker> */}
                    <MarkerClusterGroup className='MP-markers'>
                        {markers.map((marker, idx) => (
                        <Marker 
                            key={idx} 
                            position={marker.geocode}
                            // eventHandlers={{
                            //     click: () => {
                            //     window.open(marker.href, '_blank', 'noopener,noreferrer');
                            //     }
                            // }}
                            >
                            <Popup>
                                {marker.popup}
                            </Popup>
                        </Marker>
                    ))}
                    </MarkerClusterGroup>
                    
                </MapContainer>
            </div>
        </div>
        </>
    )
}