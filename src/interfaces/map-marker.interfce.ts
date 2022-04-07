import { Marker } from 'mapbox-gl';

export interface MapMarker {
    name: string;
    latitude: number;
    longitude: number;
    mapboxMarker?: Marker;
}
