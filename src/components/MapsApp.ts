import { MapMarker } from '../interfaces/map-marker.interfce';
import './MapboxMap';

export class MapsApp extends HTMLElement {

    static markerList: MapMarker[] = [];

    constructor() {
        super();
        const markerListItem = localStorage.getItem('marker-list');

        if (markerListItem) {
            const markerListStorage: MapMarker[] = JSON.parse(markerListItem);
            MapsApp.markerList = markerListStorage;
        } else {
            localStorage.setItem('marker-list', '[]');
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = // html
        `
        <mapbox-map class="map-container"></mapbox-map>
        `;
    }
};

customElements.define('maps-app', MapsApp);
