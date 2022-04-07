import './MapboxMap';

export class MapsApp extends HTMLElement {

    constructor() {
        super();
        const markerListItem = localStorage.getItem('marker-list');

        if (!markerListItem) {
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
