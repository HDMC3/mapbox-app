import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

class MapboxMap extends HTMLElement {

    connectedCallback() {
        mapboxgl.accessToken = 'pk.eyJ1IjoiaGRtYyIsImEiOiJjbDFkMjBiZ3YwNzA2M2NxaW0wOXJwODdlIn0.flDOcqO3X0uzJ6prWdwVQQ';
        const map = new mapboxgl.Map({
            container: this,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-90.51332543227954, 14.64193046063697],
            zoom: 17,
            pitch: 0,
            bearing: -17.6,
            antialias: true
        });

        map.on('load', () => {
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

            map.addLayer({
                id: 'sky',
                type: 'sky',
                paint: {
                    'sky-type': 'atmosphere',
                    'sky-atmosphere-sun': [0.0, 0.0],
                    'sky-atmosphere-sun-intensity': 15
                }
            });

            map.addControl(
                new MapboxGeocoder({
                    accessToken: mapboxgl.accessToken,
                    mapboxgl: mapboxgl
                }), 'top-right');

            const nav = new mapboxgl.NavigationControl();
            map.addControl(nav, 'top-right');

            const scale = new mapboxgl.ScaleControl({
                maxWidth: 100,
                unit: 'imperial'
            });
            map.addControl(scale, 'bottom-right');

            scale.setUnit('metric');

            map.addControl(new mapboxgl.FullscreenControl({ container: document.querySelector('body') }));

        });

    }
};

customElements.define('mapbox-map', MapboxMap);
