import mapboxgl from 'mapbox-gl';
import './MapboxMap';
import './MapboxNotSupport';

export class MapsApp extends HTMLElement {

    constructor() {
        super();
        const markerListItem = localStorage.getItem('marker-list');

        if (!markerListItem) {
            localStorage.setItem('marker-list', '[]');
        }
    }

    connectedCallback() {
        mapboxgl.accessToken = 'pk.eyJ1IjoiaGRtYyIsImEiOiJjbDFkMjBiZ3YwNzA2M2NxaW0wOXJwODdlIn0.flDOcqO3X0uzJ6prWdwVQQ';
        const isMapboxSupported = mapboxgl.supported();
        this.render(isMapboxSupported);
    }

    render(isMapboxSupported: boolean) {
        if (isMapboxSupported) {
            this.innerHTML = // html
            `
            <mapbox-map class="map-container"></mapbox-map>
            `;
        } else {
            this.innerHTML = // html
            `
            <mapbox-not-support></mapbox-not-support>
            `;
        }
    }
};

customElements.define('maps-app', MapsApp);
