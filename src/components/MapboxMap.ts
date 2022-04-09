import mapboxgl, { Marker, Popup } from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { MapboxStyleDefinition, MapboxStyleSwitcherControl } from 'mapbox-gl-style-switcher';
import 'mapbox-gl-style-switcher/styles.css';
import { MapboxMarkerModal } from './MapboxMarkerModal';
import { MapboxSearchBar } from './MapboxSearchBar';
import { MapMarker } from '../interfaces/map-marker.interfce';
import { MapboxMarkerList } from './MapboxMarkerList';

class MapboxMap extends HTMLElement {
    map: mapboxgl.Map;
    flyToMarker: Marker;
    userMarker: Marker;
    markers: MapMarker[] = [];
    renderCheck = false;
    geocoder: MapboxGeocoder;

    mapboxMarkerListElement?: MapboxMarkerList | null;
    mapboxSearchBarElement: MapboxSearchBar;

    constructor() {
        super();

        mapboxgl.accessToken = 'pk.eyJ1IjoiaGRtYyIsImEiOiJjbDFkMjBiZ3YwNzA2M2NxaW0wOXJwODdlIn0.flDOcqO3X0uzJ6prWdwVQQ';
        this.map = new mapboxgl.Map({
            container: this,
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: 17,
            pitch: 0,
            antialias: true,
            doubleClickZoom: false,
            touchPitch: true
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
                .addTo(this.map);
        });

        this.geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        });

        this.mapboxSearchBarElement = new MapboxSearchBar(this.geocoder);

        this.flyToMarker = new mapboxgl.Marker({ color: '#fbc531' });
    }

    connectedCallback() {
        this.map.on('load', this.onMapLoadHandler);
    }

    disconnectedCallback() {
        this.removeEventListener('show-marker-list', this.toggleListMarkers);
        this.map.off('load', this.onMapLoadHandler);
        this.map.off('render', this.onMapRenderHandler);
        this.map.off('dblclick', this.onMapDoubleClickHandler);
        this.geocoder.off('result', this.onGeocoderResultHandler);
        this.geocoder.off('clear', this.onGeocoderClearHandler);
    }

    onMapLoadHandler = () => {
        this.initMarkers();

        this.insertAdjacentElement('afterbegin', this.mapboxSearchBarElement);

        this.geocoder.on('result', this.onGeocoderResultHandler);

        this.geocoder.on('clear', this.onGeocoderClearHandler);

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

        const styles: MapboxStyleDefinition[] = [
            {
                title: 'Navigation Night',
                uri: 'mapbox://styles/mapbox/navigation-night-v1'
            },
            {
                title: 'Navigation Day',
                uri: 'mapbox://styles/mapbox/navigation-day-v1'
            },
            {
                title: 'Satellite',
                uri: 'mapbox://styles/mapbox/satellite-v9'
            },
            {
                title: 'Outdoors',
                uri: 'mapbox://styles/mapbox/outdoors-v11'
            },
            {
                title: 'Streets',
                uri: 'mapbox://styles/mapbox/streets-v11'
            },
            {
                title: 'Light',
                uri: 'mapbox://styles/mapbox/light-v9'
            },
            {
                title: 'Dark',
                uri: 'mapbox://styles/mapbox/dark-v9'
            }
        ];

        const styleSwitcherControl = new MapboxStyleSwitcherControl(styles,
            {
                defaultStyle: 'Streets',
                eventListeners: {
                    onChange: (_, style: string) => {
                        this.renderCheck = style !== 'mapbox://styles/mapbox/dark-v9' &&
                            style !== 'mapbox://styles/mapbox/light-v9' &&
                            style !== 'mapbox://styles/mapbox/streets-v11';

                        return false;
                    }
                }
            }
        );

        this.map.addControl(styleSwitcherControl, 'top-right');

        this.map.on('dblclick', this.onMapDoubleClickHandler);

        this.map.on('render', this.onMapRenderHandler);

        this.addEventListener('show-marker-list', this.toggleListMarkers);
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

    onGeocoderResultHandler = (e: any) => {
        this.flyToMarker
            .setLngLat(e.result.center)
            .addTo(this.map);
        this.map.flyTo({
            center: e.result.center
        });
    }

    onGeocoderClearHandler = () => {
        this.flyToMarker.remove();
    }

    onMapRenderHandler = () => {
        if (!this.renderCheck) {
            this.add3DBuildings(this.map);
            this.addSkyLayer(this.map);
            this.renderCheck = true;
        }
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

    addSkyLayer(map: mapboxgl.Map) {
        map.addLayer({
            id: 'sky',
            type: 'sky',
            paint: {
                'sky-type': 'atmosphere',
                'sky-atmosphere-sun': [0.0, 0.0],
                'sky-atmosphere-sun-intensity': 15
            }
        });
    }

    onMapDoubleClickHandler = (e: any) => {
        this.addMarker(e.lngLat.lat, e.lngLat.lng);
        this.geocoder.clear();
    }

    addMarker(latitude: number, longitude: number) {
        const marker = new mapboxgl.Marker({ color: '#EA2027' })
            .setLngLat([longitude, latitude])
            .addTo(this.map);

        const modal = new MapboxMarkerModal(marker, this.map, this.markers);
        this.insertAdjacentElement('beforeend', modal);
    }

    toggleListMarkers = (e: any) => {
        if (e.detail.showMarkerList) {
            this.mapboxMarkerListElement = new MapboxMarkerList(this.markers, this.map, this.mapboxSearchBarElement, this.userMarker);
            document.getElementById('main-container')?.insertAdjacentElement('beforeend', this.mapboxMarkerListElement);
        } else {
            this.mapboxMarkerListElement?.shadowRoot?.querySelector('.marker-list-container')?.classList.remove('show-list');
            setTimeout(() => {
                this.mapboxMarkerListElement?.remove();
                this.mapboxMarkerListElement = null;
            }, 100);
        }
    }
};

customElements.define('mapbox-map', MapboxMap);
