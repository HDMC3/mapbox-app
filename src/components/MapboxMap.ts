import mapboxgl from 'mapbox-gl';

class MapboxMap extends HTMLElement {

    connectedCallback() {
        mapboxgl.accessToken = 'pk.eyJ1IjoiaGRtYyIsImEiOiJjbDFkMjBiZ3YwNzA2M2NxaW0wOXJwODdlIn0.flDOcqO3X0uzJ6prWdwVQQ';
        const map = new mapboxgl.Map({
            container: this,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-90.513604, 14.641601], // [lon, lat]
            zoom: 9
        });
    }
};

customElements.define('mapbox-map', MapboxMap);
