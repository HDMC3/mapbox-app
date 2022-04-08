import { Map, Marker } from 'mapbox-gl';
import { MapMarker } from '../interfaces/map-marker.interfce';
import { MapboxMarkerListItem } from './MapboxMarkerListItem';
import { MapboxSearchBar } from './MapboxSearchBar';

export class MapboxMarkerList extends HTMLElement {

    private markerListContainer?: HTMLElement | null;
    private backdrop?: HTMLElement | null;

    constructor(private markerList: MapMarker[], private map: Map, private mapboxSearchBarElement: MapboxSearchBar, private markerUserLocation: Marker) {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        setTimeout(() => {
            this.shadowRoot?.querySelector('.marker-list-container')?.classList.add('show-list');
        }, 100);
    }

    disconnectedCallback() {
        this.markerListContainer?.removeEventListener('click', this.actionButtonsHandler);
        this.backdrop?.removeEventListener('click', this.onclickBackdropHandler);
    }

    get styles() {
        return /* css */`
        :host {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            align-items: flex-end;
            justify-content: flex-start;
            height: 100vh;
            width: 100%;
            font-size: 1em;
        }

        .backdrop {
            height: 100%;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }

        .marker-list-container {
            position: relative;
            left: 10px;
            bottom: 10px;
            border-radius: 4px;
            background-color: #FFF;
            box-shadow: 0 0 10px 2px rgb(0 0 0 / 10%);
            width: 300px;
            height: calc(100% - 90px);
            padding: 5px;
            display: flex;
            flex-direction: column;
            overflow-y: scroll;
            transform: translateX(-500px);
            z-index: 2;
            transition: transform 0.2s ease-in-out;
        }

        /* Firefox */
        .marker-list-container {
            scrollbar-width: 0.8em;
            scrollbar-color: #64646460 #FFF;
        }

        /* Chrome, Safari y Edge */
        .marker-list-container::-webkit-scrollbar {
            width: 0.8em;
        }

        .marker-list-container::-webkit-scrollbar-track {
            background: transparent;
            border-radius: 0.7em;
        }

        .marker-list-container::-webkit-scrollbar-thumb {
            background-color: #64646460;
            border-radius: 20px;
            border: 4px solid #FFF;
        }

        .show-list {
            transform: translateX(0);
        }

        .marker-list-header {
            width: 100%;
            border-bottom: 1px solid #80808080;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px 0;
            box-sizing: border-box;
            margin-bottom: 10px;
        }

        .marker-list-header > span {
            font-size: 1.2em;
        }
        `;
    }

    actionButtonsHandler = (e: any) => {
        let actionButton: any = null;

        if (e.path[0] instanceof HTMLButtonElement) {
            actionButton = e.path[0];
        }

        if (e.path[0] instanceof HTMLImageElement) {
            actionButton = e.path[1];
        }

        if (!actionButton) return;

        const action = actionButton.classList.contains('delete-action-button')
            ? 'delete'
            : 'show';

        if (action === 'show') {
            this.mapboxSearchBarElement.showMakerList();
        }
    }

    onclickBackdropHandler = () => {
        this.mapboxSearchBarElement.showMakerList();
    }

    render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = // html
            `
        <style>${this.styles}</style>
        <div class="backdrop"></div>
        <div class="marker-list-container">
            <div class="marker-list-header">
                <span>Marcadores guardados</span>
            </div>
        </div>
        `;

        const userLocationItem = new MapboxMarkerListItem({
            name: 'Ubicacion de dispositivo',
            latitude: this.markerUserLocation.getLngLat().lat,
            longitude: this.markerUserLocation.getLngLat().lng,
            mapboxMarker: this.markerUserLocation
        }, this.map, true, false);

        this.shadowRoot.querySelector('.marker-list-container')?.insertAdjacentElement('beforeend', userLocationItem);

        for (const marker of this.markerList) {
            this.shadowRoot.querySelector('.marker-list-container')
                ?.insertAdjacentElement('beforeend', new MapboxMarkerListItem(marker, this.map, true, true, this.markerList));
        }

        this.markerListContainer = this.shadowRoot.querySelector('.marker-list-container');
        this.markerListContainer?.addEventListener('click', this.actionButtonsHandler);

        this.backdrop = this.shadowRoot.querySelector('.backdrop');
        this.backdrop?.addEventListener('click', this.onclickBackdropHandler);
    }

}

customElements.define('mapbox-marker-list', MapboxMarkerList);
