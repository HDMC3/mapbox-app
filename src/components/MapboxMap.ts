import mapboxgl, { Marker, Popup } from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { MapboxMarkerModal } from './MapboxMarkerModal';
import { MapboxSearchBar } from './MapboxSearchBar';
import { MapMarker } from '../interfaces/map-marker.interfce';

class MapboxMap extends HTMLElement {
    map: mapboxgl.Map;
    flyToMarker: Marker;
    userMarker: Marker;
    markers: MapMarker[] = [];

    constructor() {
        super();

        mapboxgl.accessToken = 'pk.eyJ1IjoiaGRtYyIsImEiOiJjbDFkMjBiZ3YwNzA2M2NxaW0wOXJwODdlIn0.flDOcqO3X0uzJ6prWdwVQQ';
        this.map = new mapboxgl.Map({
            container: this,
            style: 'mapbox://styles/mapbox/streets-v11',
            // center: [-90.51332543227954, 14.64193046063697],
            zoom: 17,
            pitch: 0,
            antialias: true,
            doubleClickZoom: false
        });

        this.userMarker = new Marker();

        navigator.geolocation.getCurrentPosition((data) => {
            const latitude = data.coords.latitude;
            const longitude = data.coords.longitude;

            localStorage.setItem('user-marker', JSON.stringify({ lat: latitude, lng: longitude }));

            this.map.setCenter(new mapboxgl.LngLat(longitude, latitude));

            this.userMarker
                .setLngLat([longitude, latitude])
                .setPopup(
                    new Popup({ closeButton: false, className: 'shadow-popup' })
                        .setHTML('<h3 style="margin: 0;">Mi ubicacion</h3>')
                )
                .addTo(this.map)
                .getElement().style.opacity = '0';
        });

        this.flyToMarker = new mapboxgl.Marker({ color: '#646464' });
    }

    connectedCallback() {
        this.map.on('load', () => {

            this.initMarkers();

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

            this.userMarker.getElement().style.opacity = '1';

            const geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl
            });

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

            const navControl = new mapboxgl.NavigationControl();
            this.map.addControl(navControl, 'top-right');

            const scaleControl = new mapboxgl.ScaleControl({
                maxWidth: 100,
                unit: 'imperial'
            });
            this.map.addControl(scaleControl, 'bottom-right');

            scaleControl.setUnit('metric');

            this.map.addControl(new mapboxgl.FullscreenControl({ container: document.querySelector('body') }));

            const geolocateControl = new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: false,
                showUserHeading: false,
                showUserLocation: false,
                showAccuracyCircle: false,
                fitBoundsOptions: {
                    zoom: 15
                }
            });

            this.map.addControl(
                geolocateControl,
                'top-right'
            );

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

        const modal = new MapboxMarkerModal(marker, this.map, this.markers);
        this.insertAdjacentElement('beforeend', modal);
    }

    initMarkers() {
        const localStorageMarkersValue = localStorage.getItem('marker-list');

        if (!localStorageMarkersValue) return;

        const localStorageMarkers: MapMarker[] = JSON.parse(localStorageMarkersValue);

        this.markers = localStorageMarkers
            .map(m => {
                const popupElement = document.createElement('h3');
                popupElement.style.margin = '0';
                popupElement.textContent = m.name;

                m.mapboxMarker = new Marker({ color: '#EA2027' })
                    .setLngLat([m.longitude, m.latitude])
                    .setPopup(
                        new Popup({ closeButton: false, className: 'shadow-popup' })
                            .setDOMContent(popupElement)
                    )
                    .addTo(this.map);

                return m;
            });
    }

};

customElements.define('mapbox-map', MapboxMap);
