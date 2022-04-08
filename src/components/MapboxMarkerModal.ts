import { Marker, Map, Popup } from 'mapbox-gl';
import { MapMarker } from '../interfaces/map-marker.interfce';

export class MapboxMarkerModal extends HTMLElement {

    marker: Marker;
    map: Map;
    cancelButton?: HTMLButtonElement | null;
    saveButton?: HTMLButtonElement | null;
    backdropModal?: HTMLElement | null;
    markerForm?: HTMLFormElement | null;
    inputMarkerName?: HTMLInputElement | null;
    mapboxMarkerList: MapMarker[];

    constructor(marker: Marker, map: Map, mapboxMarkerList: MapMarker[]) {
        super();
        this.attachShadow({ mode: 'open' });
        this.marker = marker;
        this.map = map;
        this.mapboxMarkerList = mapboxMarkerList;
        document.addEventListener('focusin', this.removeFocusGeocoder);
    }

    connectedCallback() {
        this.render();
        setTimeout(() => {
            this.shadowRoot?.querySelector('.modal-container')?.classList.add('fade-in');
            this.backdropModal?.classList.add('fade-in');
        }, 100);
    }

    disconnectedCallback() {
        this.saveButton?.removeEventListener('click', this.saveMarker);
        this.markerForm?.removeEventListener('submit', this.saveMarker);
        this.inputMarkerName?.removeEventListener('keyup', this.checkInvalidInput);
        this.cancelButton?.removeEventListener('click', this.cancelSaveMarker);
        this.backdropModal?.removeEventListener('click', this.cancelSaveMarker);
        document.removeEventListener('focusin', this.removeFocusGeocoder);
    }

    removeFocusGeocoder(e: any) {
        if (e.target.classList.contains('mapboxgl-ctrl-geocoder--input')) {
            e.target.blur();
        }
    }

    saveMarker = (e: any) => {
        e.preventDefault();

        if (!this.markerForm) return;

        if (!this.inputMarkerName) return;

        const markerName = this.inputMarkerName.value.trim();

        if (this.inputMarkerName.value.replace(/\s/g, '').length === 0) {
            this.inputMarkerName.classList.add('invalid-marker-name');
            this.markerForm.querySelector('.invalid-text')?.classList.add('show-invalid-text');
            this.markerForm.querySelector('.invalid-text')!.textContent = 'El nombre es requerido';
            this.inputMarkerName.addEventListener('keyup', this.checkInvalidInput);
            return;
        }

        if (this.checkMarkerExists(markerName)) {
            this.inputMarkerName.removeEventListener('keyup', this.checkInvalidInput);
            this.inputMarkerName.classList.add('invalid-marker-name');
            this.markerForm.querySelector('.invalid-text')?.classList.add('show-invalid-text');
            this.markerForm.querySelector('.invalid-text')!.textContent = 'Ya existe un marcador con el mismo nombre';
            return;
        }

        const popupElement = document.createElement('h3');
        popupElement.style.margin = '0';
        popupElement.textContent = markerName;
        this.marker.setPopup(
            new Popup({ closeButton: false, className: 'shadow-popup' })
                .setDOMContent(popupElement)
        );

        const newMarker: MapMarker = {
            name: markerName,
            latitude: this.marker.getLngLat().lat,
            longitude: this.marker.getLngLat().lng,
            mapboxMarker: this.marker
        };

        this.mapboxMarkerList.push(newMarker);

        const updatedMarkerList = this.mapboxMarkerList.map(el => {
            return {
                name: el.name,
                latitude: el.latitude,
                longitude: el.longitude
            };
        });

        localStorage.setItem('marker-list', JSON.stringify(updatedMarkerList));

        this.inputMarkerName.removeEventListener('keyup', this.checkInvalidInput);
        this.remove();
    }

    checkMarkerExists(name: string) {
        const markerListSTR = localStorage.getItem('marker-list');

        if (!markerListSTR) return false;

        const markerList: MapMarker[] = JSON.parse(markerListSTR);

        return markerList.some((marker) => marker.name.toLowerCase() === name.toLowerCase());
    }

    cancelSaveMarker = () => {
        this.marker.remove();
        this.shadowRoot?.querySelector('.modal-container')?.classList.remove('fade-in');
        this.backdropModal?.classList.remove('fade-in');
        setTimeout(() => {
            this.remove();
        }, 200);
    }

    checkInvalidInput = () => {
        if (!this.inputMarkerName) return;

        if (this.inputMarkerName.value.replace(/\s/g, '').length !== 0) {
            this.inputMarkerName.classList.remove('invalid-marker-name');
            this.markerForm?.querySelector('.invalid-text')?.classList.remove('show-invalid-text');
        } else {
            this.inputMarkerName.classList.add('invalid-marker-name');
            this.markerForm?.querySelector('.invalid-text')?.classList.add('show-invalid-text');
        }
    }

    get styles() {
        return /* css */`
        :host {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            width: 100vw;
            z-index: 3;
        }
        
        .modal-container {
            position: absolute;
            background-color: #FFF;
            border-radius: 15px;
            width: 40%;
            overflow: hidden;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        }

        hr {
            border-color: #64646430;
            margin: 0;
        }

        .modal-title {
            margin: 0;
            font-size: 2em;
            font-weight: bold;
        }
        
        .modal-header {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 2rem;
            border-bottom: 2px solid white;
            align-self: flex-start;
            text-align: center;
            padding: 2em 1em 0.5em 1em;
        }

        .modal-content {
            padding: 1em 3em 2em 3em;
            align-self: center;
            height: 100%;
        }

        form {
            display: flex;
            flex-direction: column;
        }

        label {
            margin-bottom: 0.5em;
            font-size: 1.5em;
        }

        input {
            outline: none;
            height: 2em;
            border: 2px solid #64646430;
            border-radius: 5px;
            font-size: 1.2em;
            padding: 0 0.5em;
            transition: border-color 0.25s ease-in-out;
        }

        input:focus, input:hover {
            border-color: #64646460;
        }

        .modal-footer {
            height: 3rem;
            align-self: flex-end;
            border-top: 2px solid white;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding: 1em;
            background-color: #77777750;
            gap: 0.5em
        }

        .button {
            background-color: #7f8fa6;
            padding: 0.5em 1em;
            color: #FFF;
            height: 3em;
            border-radius: 15px;
            border: none;
            font-weight: bold;
            transition: background-color 0.25s ease-in-out;
        }

        .button:hover {
            background-color: #718093;
        }

        .button:active {
            background-color: #7f8fa6;
        }

        .save-button {
            background-color: #00a8ff;
            color: #FFF;
        }

        .save-button:hover {
            background-color: #0097e6;
        }

        .save-button:active {
            background-color: #00a8ff;
        }

        .cancel-button {
            background-color: #e84118;
            color: #FFF;
        }

        .cancel-button:hover {
            background-color: #c23616;
        }

        .cancel-button:active {
            background-color: #e84118;
        }

        .backdrop {
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background-color: #64646480;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        }

        .fade-in {
            opacity: 1;
        }

        .invalid-marker-name, .invalid-marker-name:hover, .invalid-marker-name:focus {
            border-color: #e84118;
        }

        .invalid-text {
            color: #e84118;
            font-size: small;
            display: none;
        }

        .show-invalid-text {
            display: initial;
        }

        @media screen and (max-width: 321px) {
            .modal-container {
                width: 100%;
                align-self: flex-start;
                border-radius: 0
            }

            .modal-header {
                height: unset;
            }

            .modal-content {
                padding: 1em 1em 2em 1em;
            }

            .modal-footer {
                justify-content: center;
            }
        }

        @media screen and (min-width: 321px) {
            .modal-container {
                width: 90%;
            }

            .modal-footer {
                justify-content: center;
            }
        }

        @media screen and (min-width: 600px){
            .modal-container {
                width: 80%;
            }
        }
        @media screen and (min-width: 768px){
            .modal-container {
                width: 50%
            }
        }

        @media screen and (min-width: 1224px){
            .modal-container {
                width: 40%
            }
        }
        `;
    }

    private render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = // html
                `
            <style>${this.styles}</style>
            <div class="backdrop"></div>
            <div class="modal-container">
                <div class="modal-header">
                    <span class="modal-title">Nuevo marcador</span>
                </div>

                <div class="modal-content">
                    <form>
                        <label for="marker-name">Nombre:</label>
                        <input id="marker-name" autocomplete="off" value="">
                        <span class="invalid-text">El nombre es requerido</span>
                    </form>
                </div>

                <div class="modal-footer">
                    <button class="button cancel-button">Cancelar</button>
                    <button class="button save-button">Guardar marcador</button>
                </div>
            </div>
            `;

            this.markerForm = this.shadowRoot.querySelector('form');
            this.markerForm?.addEventListener('submit', this.saveMarker);
            this.inputMarkerName = this.markerForm?.querySelector('input');
            this.saveButton = this.shadowRoot.querySelector('.save-button');
            this.saveButton?.addEventListener('click', this.saveMarker);
            this.cancelButton = this.shadowRoot.querySelector('.cancel-button');
            this.cancelButton?.addEventListener('click', this.cancelSaveMarker);
            this.backdropModal = this.shadowRoot.querySelector('.backdrop');
            this.backdropModal?.addEventListener('click', this.cancelSaveMarker);
        }
    }

}

customElements.define('map-marker-modal', MapboxMarkerModal);
