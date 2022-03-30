import './MapboxMap';

class MapsApp extends HTMLElement {
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
