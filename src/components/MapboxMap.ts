import mapboxgl, { Marker } from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { MapMarkerModal } from './MapMarkerModal';
import { MapboxSearchBar } from './MapboxSearchBar';

class MapboxMap extends HTMLElement {
    map: mapboxgl.Map;
    flyToMarker: Marker;

    constructor() {
        super();

        mapboxgl.accessToken = 'pk.eyJ1IjoiaGRtYyIsImEiOiJjbDFkMjBiZ3YwNzA2M2NxaW0wOXJwODdlIn0.flDOcqO3X0uzJ6prWdwVQQ';
        this.map = new mapboxgl.Map({
            container: this,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-90.51332543227954, 14.64193046063697],
            zoom: 17,
            pitch: 0,
            antialias: true,
            doubleClickZoom: false
        });

        this.flyToMarker = new mapboxgl.Marker({ color: '#EA2027' });
    }

    connectedCallback() {
        this.map.on('load', () => {

            this.add3DBuildings(this.map);

            this.map.addLayer({
                id: 'sky',
                type: 'sky',
                paint: {
                    'sky-type': 'atmosphere',
                    'sky-atmosphere-sun': [0.0, 0.0],
                    'sky-atmosphere-sun-intensity': 15
                }
            });

            const geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl
            });

            // this.map.addControl(geocoder, 'top-right');

            document.getElementById('main-container')?.insertAdjacentElement('afterbegin', new MapboxSearchBar(geocoder));

            geocoder.on('result', (e) => {
                this.flyToMarker
                    .setLngLat(e.result.center)
                    .addTo(this.map);
                this.map.flyTo({
                    center: e.result.center
                });
            });

            geocoder.on('clear', () => {
                this.flyToMarker.remove();
            });

            const nav = new mapboxgl.NavigationControl();
            this.map.addControl(nav, 'top-right');

            const scale = new mapboxgl.ScaleControl({
                maxWidth: 100,
                unit: 'imperial'
            });
            this.map.addControl(scale, 'bottom-right');

            scale.setUnit('metric');

            this.map.addControl(new mapboxgl.FullscreenControl({ container: document.querySelector('body') }));

            this.map.on('click', (_) => {
                // console.log(e);
            });

            this.map.on('dblclick', e => {
                this.addMarker(e.lngLat.lat, e.lngLat.lng);
                geocoder.clear();
            });

        });

    }

    add3DBuildings(map: mapboxgl.Map) {
        const layers = map.getStyle().layers;
        const labelLayerId = layers?.find(
            (layer) => layer.type === 'symbol' && layer?.layout && layer?.layout['text-field']
        )?.id;

        map.addLayer(
            {
                id: 'add-3d-buildings',
                source: 'composite',
                'source-layer': 'building',
                filter: ['==', 'extrude', 'true'],
                type: 'fill-extrusion',
                minzoom: 15,
                paint: {
                    'fill-extrusion-color': '#aaa',
                    'fill-extrusion-height': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15,
                        0,
                        15.05,
                        ['get', 'height']
                    ],
                    'fill-extrusion-base': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15,
                        0,
                        15.05,
                        ['get', 'min_height']
                    ],
                    'fill-extrusion-opacity': 1
                }
            },
            labelLayerId
        );

    }

    addMarker(latitude: number, longitude: number) {
        const marker = new mapboxgl.Marker({ color: '#EA2027' })
            .setLngLat([longitude, latitude])
            .addTo(this.map);

        const modal = new MapMarkerModal(marker, this.map);
        this.insertAdjacentElement('beforeend', modal);
    }

};

customElements.define('mapbox-map', MapboxMap);
