import { Map } from 'mapbox-gl';
import { MapMarker } from '../interfaces/map-marker.interfce';

export class MapboxMarkerListItem extends HTMLElement {

    showButton?: HTMLButtonElement;
    deleteButton?: HTMLButtonElement;

    constructor(
        private marker: MapMarker,
        private map: Map,
        private showAction: boolean,
        private deleteAction: boolean,
        private markerList?: MapMarker[]
    ) {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {
        this.showButton?.removeEventListener('click', this.showActionHandler);
        this.deleteButton?.removeEventListener('click', this.deleteActionHandler);
    }

    get styles() {
        return /* css */`
        :host {
            display: flex;
            padding: 10px 5px 10px 15px;
            box-sizing: border-box;
            margin-bottom: 10px;
            gap: 10px;
        }

        .item-name, .item-coords {
            display: inline-block;
            width: 100%;
        }

        .item-name {
            font-weight: bold;
        }

        .item-coords {
            font-size: 0.7em;
            color: #858585;
        }

        .item-actions {
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            gap: 5px;
            padding: 0 5px;
        }

        .action-button {
            display: flex;
            place-content: center;
            outline: none;
            border: 0;
            padding: 5px 10px;
            border-radius: 10px;
            background-color: #dcdde1;
            cursor: pointer;
            color: #FFF;
            font-weight: bold;
            height: 35px;
            width: 35px;
            z-index: 4;
            transition: background-color 0.2s ease-in-out;
        }

        .show-action-button {
            background-color: #00a8ff;
        }

        .action-button > img {
            object-fit: cover;
            height: 100%;
        }

        .show-action-button:active {
            background-color: #00a8ff;
        }
        
        .show-action-button:hover {
            background-color: #0097e6;
        }

        .delete-action-button {
            background-color: #e84118;
        }

        .delete-action-button:active {
            background-color: #e84118;
        }
        
        .delete-action-button:hover {
            background-color: #c23616;
        }
        `;
    }

    showActionHandler = () => {
        this.map.flyTo({
            center: this.marker.mapboxMarker?.getLngLat()
        });
    }

    deleteActionHandler = () => {
        if (!this.markerList) return;

        const indexMarker = this.markerList.findIndex(el => el.mapboxMarker === this.marker.mapboxMarker);
        if (indexMarker !== -1) {
            this.markerList.splice(indexMarker, 1);

            const newMarkerList = this.markerList.map(el => {
                return {
                    latitude: el.latitude,
                    longitude: el.longitude,
                    name: el.name
                };
            });

            localStorage.setItem('marker-list', JSON.stringify(newMarkerList));

            this.marker.mapboxMarker?.remove();
            this.remove();
        }
    }

    render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = // html
        `
        <style>${this.styles}</style>
        <div class="item-detail">
        </div>
        <div class="item-actions">
        </div>
        `;

        const itemName = document.createElement('span');
        itemName.className = 'item-name';
        itemName.textContent = this.marker.name;
        const itemLat = document.createElement('span');
        itemLat.className = 'item-coords';
        itemLat.textContent = 'Lat: ' + Number(this.marker.latitude.toFixed(6)).toString();
        const itemLng = document.createElement('span');
        itemLng.className = 'item-coords';
        itemLng.textContent = 'Lng: ' + Number(this.marker.longitude.toFixed(6)).toString();

        this.shadowRoot.querySelector('.item-detail')?.insertAdjacentElement('beforeend', itemName);
        this.shadowRoot.querySelector('.item-detail')?.insertAdjacentElement('beforeend', itemLat);
        this.shadowRoot.querySelector('.item-detail')?.insertAdjacentElement('beforeend', itemLng);

        if (this.showAction) {
            this.showButton = document.createElement('button');
            this.showButton.innerHTML = '<img src="icons/location-icon.svg">';
            this.showButton.classList.add('action-button', 'show-action-button');
            this.shadowRoot.querySelector('.item-actions')?.insertAdjacentElement('beforeend', this.showButton);
            this.showButton.addEventListener('click', this.showActionHandler);
        }

        if (this.deleteAction) {
            this.deleteButton = document.createElement('button');
            this.deleteButton.innerHTML = '<img src="icons/delete-icon.svg">';
            this.deleteButton.classList.add('action-button', 'delete-action-button');
            this.shadowRoot.querySelector('.item-actions')?.insertAdjacentElement('beforeend', this.deleteButton);
            this.deleteButton.addEventListener('click', this.deleteActionHandler);
        }

    }

}

customElements.define('mapbox-marker-list-item', MapboxMarkerListItem);
