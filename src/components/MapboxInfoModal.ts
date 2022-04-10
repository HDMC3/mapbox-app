export class MapboxInfoModal extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.shadowRoot?.querySelector('.backdrop')?.addEventListener('click', this.closeInfoModal);
        this.shadowRoot?.querySelector('.close-button')?.addEventListener('click', this.closeInfoModal);
        setTimeout(() => {
            this.shadowRoot?.querySelector('.modal-container')?.classList.add('fade-in');
            this.shadowRoot?.querySelector('.backdrop')?.classList.add('fade-in');
        }, 100);
    }

    disconnectedCallback() {
        this.shadowRoot?.querySelector('.backdrop')?.removeEventListener('click', this.closeInfoModal);
        this.shadowRoot?.querySelector('.close-button')?.removeEventListener('click', this.closeInfoModal);
    }

    closeInfoModal = () => {
        this.shadowRoot?.querySelector('.modal-container')?.classList.remove('fade-in');
        this.shadowRoot?.querySelector('.backdrop')?.classList.remove('fade-in');
        setTimeout(() => {
            this.remove();
        }, 200);
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
            z-index: 4;
            height: 100vh;
            width: 100vw;
        }

        .backdrop {
            position: absolute;
            top: 0;
            left: 0;
            background-color: #64646450;
            height: 100%;
            width: 100%;
            opacity: 0;
            transition: opacity 0.2s ease-in-out;
        }

        .modal-container {
            position: relative;
            background-color: #FFF;
            width: 70%;
            height: 85%;
            border-radius: 8px;
            z-index: 2;
            overflow-y: scroll;
            padding: 5px 10px 10px 10px;
            opacity: 0;
            transition: opacity 0.2s ease-in-out;
            box-sizing: border-box;
            border-top: 10px solid #FFF;
            border-bottom: 15px solid #FFF;
        }

        .close-button {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 20px;
            height: 20px;
            display: flex;
            justify-content: center;
            cursor: pointer;
            padding: 10px;
            border-radius: 4px;
            box-sizing: border-box;
        }

        .close-button:hover {
            background-color: #64646440;
        }

        .close-button:active {
            background-color: #00000000;
        }

        .close-button::after, .close-button::before {
            position: absolute;
            align-self: center;
            content: "";
            width: 90%;
            height: 2px;
            background-color: #646464;
        }

        .close-button:after {
            transform: rotateZ(-45deg);
        }

        .close-button:before {
            transform: rotateZ(45deg);
        }

        .modal-header {
            display: flex;
            place-content: center;
        }

        .modal-header h2 {
            text-align: center;
        }

        .modal-content {
            padding: 0 25px;
        }

        /* Firefox */
        .modal-container {
            scrollbar-width: 0.8em;
            scrollbar-color: #64646460 #FFF;
        }

        /* Chrome, Safari y Edge */
        .modal-container::-webkit-scrollbar {
            width: 15px;
        }

        .modal-container::-webkit-scrollbar-track {
            background: #FFF;
            border-radius: 0 40px 40px 0;
        }

        .modal-container::-webkit-scrollbar-thumb {
            background-color: #64646460;
            border-radius: 20px;
            border: 4px solid #FFF;
        }

        .fade-in {
            opacity: 1;
        }

        .key {
            padding: 2px 3px;
            background-color: #64646420;
            border-radius: 5px;
            font-weight: bold;
            /* box-shadow: 0px 2px 0px 0px #64646440; */
            border: 1px solid #646464;
        }

        .image-container {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 150px;
            padding: 20px 0;
        }

        img {
            height: 100%;
            object-fit: cover;
        }

        .list-item-container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        @media screen and (max-width: 321px) {
            .modal-container {
                width: 100%;
                align-self: flex-start;
                border-radius: 0;
                padding: 10px 5px;
            }

            .modal-header h2 {
                margin-top: 30px;
            }
        }

        @media screen and (max-width: 600px){
            .modal-content {
                padding: 0 15px;
            }
        }

        @media screen and (min-width: 321px) {
            .modal-container {
                width: 90%;
            }

            .modal-header h2 {
                margin-top: 30px;
            }
        }

        @media screen and (min-width: 600px){
            .modal-container {
                width: 80%;
            }
        }

        @media screen and (min-width: 768px){
            .modal-container {
                width: 70%
            }
        }
        `;
    }

    render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = // html
        `
        <style>${this.styles}</style>
        <div class="backdrop"></div>
        <div class="modal-container">
            <span class="close-button"></span>
            <div class="modal-header">
                <h2>Informacion de interacciones</h2>
            </div>
            <div class="modal-content">
                <h3 style="text-decoration: underline">Nuevo marcador</h3>
                <p>
                    Para agregar un marcador al mapa, debes dar doble click (o "doble tap" en dispositivos tactiles), 
                    en el lugar donde deseas ubicar el marcador. Esto mostrara una ventana donde deberas escribir el nombre 
                    con el que se guardara tu nuevo marcador.
                    <h4>Popup de marcador</h4>
                    <p>
                        Cuando das clic izquierdo sobre un marcador, se mostrara un Popup con el nombre dado al marcador 
                        cuando fue guardado.
                    </p>
                </p>

                <h3 style="text-decoration: underline">Acercar / Alejar</h3>
                <p>
                    Puedes alejar o acercar el mapa con los controles  <code class="key">+</code> y <code class="key">-</code> 
                    en la parte superior derecha de la pantalla, o con alguna de las dos siguientes acciones:
                </p>
                <ul>
                    <li>
                        <div class="list-item-container">
                            <p style="text-align: left">
                                Haciendo scroll con la rueda del mouse (o con el touchpad en el caso de laptops).
                            </p>
                            <div class="image-container">
                                <img src="images/zoom-mouse.gif">
                            </div>
                        </div>
                    </li>

                    <li>
                        <div class="list-item-container">
                            <p>
                                En dispositivos tactiles, puedes acercar o alejar el mapa con el tipico gesto de "pellizcar" la pantalla.
                            </p>
                            <div class="image-container">
                                <img src="images/zoom-touch.gif">
                            </div>
                        </div>
                    </li>
                </ul>

                <h3 style="text-decoration: underline">Perspectiva 3D</h3>
                <p>
                    Puedes tener una visualizacion de perspectiva en 3D del mapa, con la que puedes ver la elevacion de 
                    algunos edificios representados en el plano (disponible en las capas Dark, Light, y Streets). 
                </p>
                <p>
                    Para acceder a esta vista puedes utilizar las siguientes opciones:
                </p>
                <ul>
                    <li>
                        <div class="list-item-container">
                            <p>
                                Utilizando teclado y mouse, manteniendo presionada la tecla <code class="key">CTRL</code> haz click izquierdo 
                                sobre el mapa, y manteniendo el click, arrastra para cambiar el angulo de perspectiva.
                            </p>
                            <div class="image-container">
                                <img src="images/3d-ctrl-mouse.gif">
                            </div>
                        </div>
                    </li>

                    <li>
                        <div class="list-item-container">
                            <p>
                                Utilizando unicamente el mouse, puedes dar click derecho sobre el mapa, y manteniendo el click, 
                                arrastra para cambiar el angulo de perspectiva.
                            </p>
                            <div class="image-container">
                                <img src="images/3d-mouse.gif">
                            </div>
                        </div>
                    </li>

                    <li>
                        <div class="list-item-container">
                            <p>
                                En dispositivos tactiles, toca la pantalla con dos dedos al mismo tiempo, y manteniendo el contacto 
                                arrastra hacia arriba o hacia abajo para cambiar el angulo de perspectiva, luego suelta y navega por el mapa. 
                            </p>
                            <div class="image-container">
                                <img src="images/3d-touch.gif">
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        `;
    }
}

customElements.define('mapbox-info-modal', MapboxInfoModal);
