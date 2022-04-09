import { IControl, Map } from 'mapbox-gl';
import { MapboxInfoModal } from '../components/MapboxInfoModal';

export class InfoControl implements IControl {
    private container: HTMLElement;
    private map?: Map;

    constructor() {
        this.container = document.createElement('div');
    }

    onAdd(map: Map): HTMLElement {
        this.map = map;
        this.container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
        this.container.innerHTML = // html
        `
        <button type="button">
            <span class="info-control-icon"></span>
        </button>
        `;

        this.container.addEventListener('click', this.showModalInfo);

        return this.container;
    }

    onRemove(map: Map): void {
        this.container.removeEventListener('click', this.showModalInfo);
        this.container.parentNode?.removeChild(this.container);
        this.map = undefined;
    }

    showModalInfo = () => {
        document.querySelector('#main-container')?.insertAdjacentElement('afterbegin', new MapboxInfoModal());
    }

}
