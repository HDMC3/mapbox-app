class MapboxNotSupport extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    get styles() {
        return /* css */`
        :host {
            display: block;
            min-height: 100vh;
            width: 100vw;
            --browser-border-color: #646464;
            --eye-color: #646464;
            --mouth-color: #646464;
        }

        .browser-container {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 25px 25px 25px;
        }

        .browser {
            height: 250px;
            width: 300px;
            box-sizing: border-box;
        }

        .browser-top-bar {
            border: 4px solid var(--browser-border-color);
            border-bottom-width: 2px;
            border-radius: 15px 15px 0 0;
            background-color: #FCFCFC;
            height: 40px;
            box-sizing: border-box;
        }

        .bar-buttons {
            height: 100%;
            display: flex;
            align-items: center;
            padding: 5px 10px;
            gap: 10px;
            box-sizing: border-box;
        }

        .bar-button {
            height: 15px;
            width: 15px;
            border-radius: 50%;
            background-color: #808080;
        }

        .browser-face {
            border: 4px solid var(--browser-border-color);
            border-top-width: 4px;
            border-radius: 0 0 15px 15px;
            background-color: #FCFCFC;
            height: 210px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 15px;
            box-sizing: border-box;
        }

        .eyes {
            display: flex;
            justify-content: space-evenly;
            height: 40px;
            width: 120px;
        }
        
        .eye {
            position: relative;
            height: 40px;
            width: 40px;
        }

        .eye::after, .eye::before {
            position: absolute;
            width: 100%;
            height: 5px;
            background-color: var(--eye-color);
            content: "";
            top: 50%;
            left: 50%;
        }
        
        .eye::after {
            transform: translate(-50%, -50%) rotateZ(45deg) ;
        }

        .eye::before {
            transform: translate(-50%, -50%) rotateZ(-45deg);
        }

        .mouth {
            width: 60px;
            height: 40px;
            border-radius: 50%;
            background-color: var(--mouth-color);
            position: relative;
        }

        .description-container {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 10px 40px;
        }

        .description {
            margin: 0;
            text-align: center;
        }

        .description-title {
            text-align: center;
        }

        .browsers-supported-list {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-evenly;
            width: 100%;
        }

        .browser-supported {
            height: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
            margin: 10px 0;
            box-sizing: border-box;
        }

        .browser-supported-image {
            height: 100%;
        }

        .browser-supported-image img {
            height: 100px;
            object-fit: cover;
            box-sizing: border-box;
        }

        .browser-supported-detail span {
            text-align: center;
            font-weight: bold;
        }

        @media screen and (min-width: 1321px) {
            .description {
                padding: 0 50px;
            }
        }
        `;
    }

    render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = // html
        `
        <style>${this.styles}</style>
        <div class="browser-container">
            <div class="browser">
                <div class="browser-top-bar">
                    <div class="bar-buttons">
                        <div class="bar-button"></div>
                        <div class="bar-button"></div>
                        <div class="bar-button"></div>
                    </div>
                </div>
                <div class="browser-face">
                    <div class="eyes">
                        <div class="eye"></div>
                        <div class="eye"></div>
                    </div>
                    <div class="mouth">
                    </div>
                </div>
            </div>
        </div>
        <div class="description-container">
            <h1 class="description-title">Ups! Parece que tu navegador no es compatible</h1>
            <p class="description">
                El funcionamiento de este sitio tiene como nucleo la libreria de Mapbox GL JS, y lamentablemente 
                no se tiene implementada una funcionalidad alternativa. Si quieres probar la aplicacion, la mayoria 
                de navegadores modernos no deberian tener problemas de compatibilidad. 
            </p>
            <p style="text-align: center;">
                Si lo deseas, puedes intentar con alguno de los siguientes navegadores:
            </p>
            <div class="browsers-supported-list">
                <div class="browser-supported">
                    <a href="https://www.google.com/chrome/" target="_blank" rel="noopener noreferrer"
                        class="browser-supported-image">
                        <img src="images/chrome-logo.svg" alt="Logo de Google Chrome">
                    </a>
                    <div class="browser-supported-detail">
                        <span>Google Chrome</span>
                    </div>
                </div>
                <div class="browser-supported">
                    <a href="https://www.microsoft.com/es-es/edge" target="_blank" rel="noopener noreferrer" 
                        class="browser-supported-image">
                        <img style="padding: 8px;" src="images/edge-logo.svg" alt="Logo de Microsoft Edge">
                    </a>
                    <div class="browser-supported-detail">
                        <span>Microsoft Edge</span>
                    </div>
                </div>
                <div class="browser-supported">
                    <a href="https://www.mozilla.org/es-ES/firefox/new/" target="_blank" rel="noopener noreferrer"
                        class="browser-supported-image">
                        <img src="images/firefox-logo.svg" alt="Logo de Firefox">
                    </a>
                    <div class="browser-supported-detail">
                        <span>Firefox</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="browsers-alternatives"></div>
        `;
    }

}

customElements.define('mapbox-not-support', MapboxNotSupport);
