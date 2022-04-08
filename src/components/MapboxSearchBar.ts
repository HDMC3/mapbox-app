import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

export class MapboxSearchBar extends HTMLElement {
    private geocoderControl: MapboxGeocoder;
    private markerListButton?: HTMLElement | null;
    private geocoderControlInput?: HTMLInputElement | null;

    constructor(geocoderControl: MapboxGeocoder) {
        super();
        this.attachShadow({ mode: 'open' });
        this.geocoderControl = geocoderControl;
    }

    connectedCallback() {
        this.render();
        const geocoderContainer: any = this.querySelector('[slot="bar"]');
        geocoderContainer.style.width = '100%';
        this.geocoderControl.addTo(geocoderContainer);
        const geocoder: HTMLElement | null = this.querySelector('[slot="bar"] > .mapboxgl-ctrl-geocoder');
        if (geocoder) {
            geocoder.style.width = '100%';
            geocoder.style.maxWidth = 'unset';
            geocoder.style.minWidth = 'unset';

            this.geocoderControlInput = geocoder.querySelector('input');
            if (this.geocoderControlInput) {
                this.geocoderControlInput.style.outline = 'none';
                this.geocoderControlInput.addEventListener('focus', this.onfocusGeocoderControlInputHandler);
            }
        }

    }

    disconnectedCallback() {
        this.markerListButton?.removeEventListener('click', this.showMakerList);
        this.geocoderControlInput?.removeEventListener('focus', this.onfocusGeocoderControlInputHandler);
    }

    onfocusGeocoderControlInputHandler = () => {
        if (this.markerListButton?.classList.contains('show')) {
            this.showMakerList();
        }
    }

    showMakerList = () => {
        const show = this.markerListButton?.classList.toggle('show');

        const ShowMarkerListEvent = new CustomEvent('show-marker-list', {
            detail: {
                showMarkerList: show
            },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(ShowMarkerListEvent);
    }

    get styles() {
        return /* css */ `
        :host {
            display: flex;
            gap: 5px;
            position: absolute;
            top: 10px;
            left: 10px;
            width: 80%;
            height: 50px;
            box-sizing: border-box;
            z-index: 2;
        }

        .marker-list-button {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            background-color: #FFF;
            width: 50px;
            height: 50px;
            border-radius: 4px;
            box-shadow: 0 0 10px 2px rgb(0 0 0 / 10%);
            padding: 10px;
            box-sizing: border-box;
            cursor: pointer;
            transition: background-color 0.2s ease-in-out;
        }

        .marker-list-button:hover {
            background-color: #F2F2F2;
        }

        .marker-list-button:active {
            background-color: #FFF;
        }

        .menu-icon-bar {
            height: 3px;
            width: 100%;
            background-color: #646464;
            transition: opacity 0.2s;
        }

        .marker-list-button::before, .marker-list-button::after {
            position: absolute;
            content: "";
            width: 70%;
            height: 3px;
            opacity: 0;
            background-color: #646464;
            transform-origin: center center;
            transition: transform 0.2s, opacity 0.1s;
        }

        .show {
            justify-content: center;
            align-items: center;
        }

        .show .menu-icon-bar {
            opacity: 0;
        }
        
        .marker-list-button.show::before {
            opacity: 1;
            transform: rotateZ(45deg);
        }
        
        .marker-list-button.show::after {
            opacity: 1;
            transform: rotateZ(-45deg);
        }

        .marker-list-button img {
            height: 100%;
            object-fit: cover;
            box-sizing: border-box;
        }

        @media screen and (min-width: 640px) {
            .marker-list-button {
                height: 36px;
                width: 36px;
                padding: 5px;
            }
        }
        `;
    }

    render() {
        this.innerHTML = // html
            `
        <div slot="bar"></div>
        `;

        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = // html
            `
        <style>${this.styles}</style>
        <div class="marker-list-button">
            <span class="menu-icon-bar"></span>
            <span class="menu-icon-bar"></span>
            <span class="menu-icon-bar"></span>
        </div>
        <slot name="bar"></slot>
        `;

        this.markerListButton = this.shadowRoot.querySelector('.marker-list-button');
        this.markerListButton?.addEventListener('click', this.showMakerList);
    }
}

customElements.define('mapbox-search-bar', MapboxSearchBar);
