var k=Object.defineProperty;var f=(n,e,t)=>e in n?k(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var i=(n,e,t)=>(f(n,typeof e!="symbol"?e+"":e,t),t);import{m,a as c,l as v,M as w}from"./vendor.b9bb53bc.js";const y=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerpolicy&&(a.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?a.credentials="include":r.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}};y();class u extends HTMLElement{constructor(e,t,o){super();i(this,"marker");i(this,"map");i(this,"cancelButton");i(this,"saveButton");i(this,"backdropModal");i(this,"markerForm");i(this,"inputMarkerName");i(this,"mapboxMarkerList");i(this,"saveMarker",e=>{var s,l;if(e.preventDefault(),!this.markerForm||!this.inputMarkerName)return;const t=this.inputMarkerName.value.trim();if(this.inputMarkerName.value.replace(/\s/g,"").length===0){this.inputMarkerName.classList.add("invalid-marker-name"),(s=this.markerForm.querySelector(".invalid-text"))==null||s.classList.add("show-invalid-text"),this.markerForm.querySelector(".invalid-text").textContent="El nombre es requerido",this.inputMarkerName.addEventListener("keyup",this.checkInvalidInput);return}if(this.checkMarkerExists(t)){this.inputMarkerName.removeEventListener("keyup",this.checkInvalidInput),this.inputMarkerName.classList.add("invalid-marker-name"),(l=this.markerForm.querySelector(".invalid-text"))==null||l.classList.add("show-invalid-text"),this.markerForm.querySelector(".invalid-text").textContent="Ya existe un marcador con el mismo nombre";return}const o=document.createElement("h3");o.style.margin="0",o.textContent=t,this.marker.setPopup(new m.exports.Popup({closeButton:!1,className:"shadow-popup"}).setDOMContent(o));const r={name:t,latitude:this.marker.getLngLat().lat,longitude:this.marker.getLngLat().lng,mapboxMarker:this.marker};this.mapboxMarkerList.push(r);const a=this.mapboxMarkerList.map(d=>({name:d.name,latitude:d.latitude,longitude:d.longitude}));localStorage.setItem("marker-list",JSON.stringify(a)),this.inputMarkerName.removeEventListener("keyup",this.checkInvalidInput),this.remove()});i(this,"cancelSaveMarker",()=>{var e,t,o;this.marker.remove(),(t=(e=this.shadowRoot)==null?void 0:e.querySelector(".modal-container"))==null||t.classList.remove("fade-in"),(o=this.backdropModal)==null||o.classList.remove("fade-in"),setTimeout(()=>{this.remove()},200)});i(this,"checkInvalidInput",()=>{var e,t,o,r;!this.inputMarkerName||(this.inputMarkerName.value.replace(/\s/g,"").length!==0?(this.inputMarkerName.classList.remove("invalid-marker-name"),(t=(e=this.markerForm)==null?void 0:e.querySelector(".invalid-text"))==null||t.classList.remove("show-invalid-text")):(this.inputMarkerName.classList.add("invalid-marker-name"),(r=(o=this.markerForm)==null?void 0:o.querySelector(".invalid-text"))==null||r.classList.add("show-invalid-text")))});this.attachShadow({mode:"open"}),this.marker=e,this.map=t,this.mapboxMarkerList=o,document.addEventListener("focusin",this.removeFocusGeocoder)}connectedCallback(){this.render(),setTimeout(()=>{var e,t,o;(t=(e=this.shadowRoot)==null?void 0:e.querySelector(".modal-container"))==null||t.classList.add("fade-in"),(o=this.backdropModal)==null||o.classList.add("fade-in")},100)}disconnectedCallback(){var e,t,o,r,a;(e=this.saveButton)==null||e.removeEventListener("click",this.saveMarker),(t=this.markerForm)==null||t.removeEventListener("submit",this.saveMarker),(o=this.inputMarkerName)==null||o.removeEventListener("keyup",this.checkInvalidInput),(r=this.cancelButton)==null||r.removeEventListener("click",this.cancelSaveMarker),(a=this.backdropModal)==null||a.removeEventListener("click",this.cancelSaveMarker),document.removeEventListener("focusin",this.removeFocusGeocoder)}removeFocusGeocoder(e){e.target.classList.contains("mapboxgl-ctrl-geocoder--input")&&e.target.blur()}checkMarkerExists(e){const t=localStorage.getItem("marker-list");return t?JSON.parse(t).some(r=>r.name.toLowerCase()===e.toLowerCase()):!1}get styles(){return`
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
        `}render(){var e,t,o,r,a;this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
            `,this.markerForm=this.shadowRoot.querySelector("form"),(e=this.markerForm)==null||e.addEventListener("submit",this.saveMarker),this.inputMarkerName=(t=this.markerForm)==null?void 0:t.querySelector("input"),this.saveButton=this.shadowRoot.querySelector(".save-button"),(o=this.saveButton)==null||o.addEventListener("click",this.saveMarker),this.cancelButton=this.shadowRoot.querySelector(".cancel-button"),(r=this.cancelButton)==null||r.addEventListener("click",this.cancelSaveMarker),this.backdropModal=this.shadowRoot.querySelector(".backdrop"),(a=this.backdropModal)==null||a.addEventListener("click",this.cancelSaveMarker))}}customElements.define("map-marker-modal",u);class b extends HTMLElement{constructor(e){super();i(this,"geocoderControl");i(this,"markerListButton");i(this,"geocoderControlInput");i(this,"onfocusGeocoderControlInputHandler",()=>{var e;(e=this.markerListButton)!=null&&e.classList.contains("show")&&this.showMakerList()});i(this,"showMakerList",()=>{var o;const e=(o=this.markerListButton)==null?void 0:o.classList.toggle("show"),t=new CustomEvent("show-marker-list",{detail:{showMarkerList:e},bubbles:!0,composed:!0});this.dispatchEvent(t)});this.attachShadow({mode:"open"}),this.geocoderControl=e}connectedCallback(){this.render();const e=this.querySelector('[slot="bar"]');e.style.width="100%",this.geocoderControl.addTo(e);const t=this.querySelector('[slot="bar"] > .mapboxgl-ctrl-geocoder');t&&(t.style.width="100%",t.style.maxWidth="unset",t.style.minWidth="unset",this.geocoderControlInput=t.querySelector("input"),this.geocoderControlInput&&(this.geocoderControlInput.style.outline="none",this.geocoderControlInput.addEventListener("focus",this.onfocusGeocoderControlInputHandler)))}disconnectedCallback(){var e,t;(e=this.markerListButton)==null||e.removeEventListener("click",this.showMakerList),(t=this.geocoderControlInput)==null||t.removeEventListener("focus",this.onfocusGeocoderControlInputHandler)}get styles(){return`
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
        `}render(){var e;this.innerHTML=`
        <div slot="bar"></div>
        `,this.shadowRoot&&(this.shadowRoot.innerHTML=`
        <style>${this.styles}</style>
        <div class="marker-list-button">
            <span class="menu-icon-bar"></span>
            <span class="menu-icon-bar"></span>
            <span class="menu-icon-bar"></span>
        </div>
        <slot name="bar"></slot>
        `,this.markerListButton=this.shadowRoot.querySelector(".marker-list-button"),(e=this.markerListButton)==null||e.addEventListener("click",this.showMakerList))}}customElements.define("mapbox-search-bar",b);class h extends HTMLElement{constructor(e,t,o,r,a){super();i(this,"showButton");i(this,"deleteButton");i(this,"showActionHandler",()=>{var e;this.map.flyTo({center:(e=this.marker.mapboxMarker)==null?void 0:e.getLngLat()})});i(this,"deleteActionHandler",()=>{var t;if(!this.markerList)return;const e=this.markerList.findIndex(o=>o.mapboxMarker===this.marker.mapboxMarker);if(e!==-1){this.markerList.splice(e,1);const o=this.markerList.map(r=>({latitude:r.latitude,longitude:r.longitude,name:r.name}));localStorage.setItem("marker-list",JSON.stringify(o)),(t=this.marker.mapboxMarker)==null||t.remove(),this.remove()}});this.marker=e,this.map=t,this.showAction=o,this.deleteAction=r,this.markerList=a,this.attachShadow({mode:"open"})}connectedCallback(){this.render()}disconnectedCallback(){var e,t;(e=this.showButton)==null||e.removeEventListener("click",this.showActionHandler),(t=this.deleteButton)==null||t.removeEventListener("click",this.deleteActionHandler)}get styles(){return`
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
        `}render(){var r,a,s,l,d;if(!this.shadowRoot)return;this.shadowRoot.innerHTML=`
        <style>${this.styles}</style>
        <div class="item-detail">
        </div>
        <div class="item-actions">
        </div>
        `;const e=document.createElement("span");e.className="item-name",e.textContent=this.marker.name;const t=document.createElement("span");t.className="item-coords",t.textContent="Lat: "+Number(this.marker.latitude.toFixed(6)).toString();const o=document.createElement("span");o.className="item-coords",o.textContent="Lng: "+Number(this.marker.longitude.toFixed(6)).toString(),(r=this.shadowRoot.querySelector(".item-detail"))==null||r.insertAdjacentElement("beforeend",e),(a=this.shadowRoot.querySelector(".item-detail"))==null||a.insertAdjacentElement("beforeend",t),(s=this.shadowRoot.querySelector(".item-detail"))==null||s.insertAdjacentElement("beforeend",o),this.showAction&&(this.showButton=document.createElement("button"),this.showButton.innerHTML='<img src="icons/location-icon.svg">',this.showButton.classList.add("action-button","show-action-button"),(l=this.shadowRoot.querySelector(".item-actions"))==null||l.insertAdjacentElement("beforeend",this.showButton),this.showButton.addEventListener("click",this.showActionHandler)),this.deleteAction&&(this.deleteButton=document.createElement("button"),this.deleteButton.innerHTML='<img src="icons/delete-icon.svg">',this.deleteButton.classList.add("action-button","delete-action-button"),(d=this.shadowRoot.querySelector(".item-actions"))==null||d.insertAdjacentElement("beforeend",this.deleteButton),this.deleteButton.addEventListener("click",this.deleteActionHandler))}}customElements.define("mapbox-marker-list-item",h);class g extends HTMLElement{constructor(e,t,o,r){super();i(this,"markerListContainer");i(this,"backdrop");i(this,"actionButtonsHandler",e=>{let t=null;if(e.path[0]instanceof HTMLButtonElement&&(t=e.path[0]),e.path[0]instanceof HTMLImageElement&&(t=e.path[1]),!t)return;(t.classList.contains("delete-action-button")?"delete":"show")==="show"&&this.mapboxSearchBarElement.showMakerList()});i(this,"onclickBackdropHandler",()=>{this.mapboxSearchBarElement.showMakerList()});this.markerList=e,this.map=t,this.mapboxSearchBarElement=o,this.markerUserLocation=r,this.attachShadow({mode:"open"})}connectedCallback(){this.render(),setTimeout(()=>{var e,t;(t=(e=this.shadowRoot)==null?void 0:e.querySelector(".marker-list-container"))==null||t.classList.add("show-list")},100)}disconnectedCallback(){var e,t;(e=this.markerListContainer)==null||e.removeEventListener("click",this.actionButtonsHandler),(t=this.backdrop)==null||t.removeEventListener("click",this.onclickBackdropHandler)}get styles(){return`
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

        .markers-not-found {
            display: flex;
            padding: 20px 5px 20px 15px;
            box-sizing: border-box;
            align-items: center;
            justify-content: center;
        }

        .markers-not-found span {
            font-size: 1.2em;
            text-align: center;
            color: #808080
        }
        `}render(){var o,r,a,s,l,d;if(!this.shadowRoot)return;this.shadowRoot.innerHTML=`
        <style>${this.styles}</style>
        <div class="backdrop"></div>
        <div class="marker-list-container">
            <div class="marker-list-header">
                <span>Marcadores guardados</span>
            </div>
        </div>
        `,this.markerListContainer=this.shadowRoot.querySelector(".marker-list-container"),(o=this.markerListContainer)==null||o.addEventListener("click",this.actionButtonsHandler),this.backdrop=this.shadowRoot.querySelector(".backdrop"),(r=this.backdrop)==null||r.addEventListener("click",this.onclickBackdropHandler);const e=this.markerUserLocation.getLngLat()===void 0,t=((a=this.markerList)==null?void 0:a.length)===0;if(!e){const p=new h({name:"Ubicaci\xF3n de dispositivo",latitude:this.markerUserLocation.getLngLat().lat,longitude:this.markerUserLocation.getLngLat().lng,mapboxMarker:this.markerUserLocation},this.map,!0,!1);(s=this.shadowRoot.querySelector(".marker-list-container"))==null||s.insertAdjacentElement("beforeend",p)}if(!t)for(const p of this.markerList)(l=this.shadowRoot.querySelector(".marker-list-container"))==null||l.insertAdjacentElement("beforeend",new h(p,this.map,!0,!0,this.markerList));t&&e&&((d=this.shadowRoot.querySelector(".marker-list-container"))==null||d.insertAdjacentHTML("beforeend",`
                <div class="markers-not-found">
                    <span>No se encontraron marcadores</span>
                </div>
                `))}}customElements.define("mapbox-marker-list",g);class x extends HTMLElement{constructor(){super();i(this,"closeInfoModal",()=>{var e,t,o,r;(t=(e=this.shadowRoot)==null?void 0:e.querySelector(".modal-container"))==null||t.classList.remove("fade-in"),(r=(o=this.shadowRoot)==null?void 0:o.querySelector(".backdrop"))==null||r.classList.remove("fade-in"),setTimeout(()=>{this.remove()},200)});this.attachShadow({mode:"open"})}connectedCallback(){var e,t,o,r;this.render(),(t=(e=this.shadowRoot)==null?void 0:e.querySelector(".backdrop"))==null||t.addEventListener("click",this.closeInfoModal),(r=(o=this.shadowRoot)==null?void 0:o.querySelector(".close-button"))==null||r.addEventListener("click",this.closeInfoModal),setTimeout(()=>{var a,s,l,d;(s=(a=this.shadowRoot)==null?void 0:a.querySelector(".modal-container"))==null||s.classList.add("fade-in"),(d=(l=this.shadowRoot)==null?void 0:l.querySelector(".backdrop"))==null||d.classList.add("fade-in")},100)}disconnectedCallback(){var e,t,o,r;(t=(e=this.shadowRoot)==null?void 0:e.querySelector(".backdrop"))==null||t.removeEventListener("click",this.closeInfoModal),(r=(o=this.shadowRoot)==null?void 0:o.querySelector(".close-button"))==null||r.removeEventListener("click",this.closeInfoModal)}get styles(){return`
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

        @media screen and (min-width: 1024px) {
            .modal-container {
                width: 700px;
            }
        }
        `}render(){!this.shadowRoot||(this.shadowRoot.innerHTML=`
        <style>${this.styles}</style>
        <div class="backdrop"></div>
        <div class="modal-container">
            <span class="close-button"></span>
            <div class="modal-header">
                <h2>Informaci\xF3n de interacciones</h2>
            </div>
            <div class="modal-content">
                <h3 style="text-decoration: underline">Nuevo marcador</h3>
                <p>
                    Para agregar un marcador al mapa, debes dar doble click (o "doble tap" en dispositivos t\xE1ctiles),
                    en el lugar donde deseas ubicar el marcador. Esto mostrar\xE1 una ventana donde deber\xE1s escribir el nombre
                    con el que deseas guardar tu nuevo marcador.
                    <h4>Popup de marcador</h4>
                    <p>
                        Cuando das clic izquierdo sobre un marcador, se mostrar\xE1 un Popup con el nombre dado al marcador 
                        cuando fue guardado.
                    </p>
                </p>

                <h3 style="text-decoration: underline">Acercar / Alejar</h3>
                <p>
                    Puedes alejar o acercar el mapa con los controles  <code class="key">+</code> y <code class="key">-</code> 
                    ubicados en la parte superior derecha de la pantalla, o con alguna de las dos siguientes acciones:
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
                                En dispositivos t\xE1ctiles, puedes acercar o alejar el mapa con el t\xEDpico gesto de "pellizcar" la pantalla.
                            </p>
                            <div class="image-container">
                                <img src="images/zoom-touch.gif">
                            </div>
                        </div>
                    </li>
                </ul>

                <h3 style="text-decoration: underline">Perspectiva 3D</h3>
                <p>
                    Puedes tener una visualizaci\xF3n de perspectiva en 3D del mapa, con la que puedes ver la elevaci\xF3n de 
                    algunos edificios representados en el plano (disponible en las capas Dark, Light, y Streets). 
                </p>
                <p>
                    Para acceder a esta vista cuentas con las siguientes opciones:
                </p>
                <ul>
                    <li>
                        <div class="list-item-container">
                            <p>
                                Utilizando teclado y mouse, manteniendo presionada la tecla <code class="key">CTRL</code> 
                                haz click izquierdo sobre el mapa, y manteniendo el click, arrastra para cambiar el \xE1ngulo de perspectiva.
                            </p>
                            <div class="image-container">
                                <img src="images/3d-ctrl-mouse.gif">
                            </div>
                        </div>
                    </li>

                    <li>
                        <div class="list-item-container">
                            <p>
                                Utilizando \xFAnicamente el mouse, puedes dar click derecho sobre el mapa, y manteniendo el click, 
                                arrastra para cambiar el \xE1ngulo de perspectiva.
                            </p>
                            <div class="image-container">
                                <img src="images/3d-mouse.gif">
                            </div>
                        </div>
                    </li>

                    <li>
                        <div class="list-item-container">
                            <p>
                                En dispositivos t\xE1ctiles, toca la pantalla con dos dedos al mismo tiempo, y manteniendo el contacto 
                                arrastra hacia arriba o hacia abajo para cambiar el \xE1ngulo de perspectiva, luego suelta y navega por el mapa. 
                            </p>
                            <div class="image-container">
                                <img src="images/3d-touch.gif">
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        `)}}customElements.define("mapbox-info-modal",x);class L{constructor(){i(this,"container");i(this,"map");i(this,"showModalInfo",()=>{var e;(e=document.querySelector("#main-container"))==null||e.insertAdjacentElement("afterbegin",new x)});this.container=document.createElement("div")}onAdd(e){return this.map=e,this.container.className="mapboxgl-ctrl mapboxgl-ctrl-group",this.container.innerHTML=`
        <button type="button">
            <span class="info-control-icon"></span>
        </button>
        `,this.container.addEventListener("click",this.showModalInfo),this.container}onRemove(e){var t;this.container.removeEventListener("click",this.showModalInfo),(t=this.container.parentNode)==null||t.removeChild(this.container),this.map=void 0}}class M extends HTMLElement{constructor(){super();i(this,"map");i(this,"flyToMarker");i(this,"userMarker");i(this,"markers",[]);i(this,"renderCheck",!1);i(this,"geocoder");i(this,"mapboxMarkerListElement");i(this,"mapboxSearchBarElement");i(this,"onMapLoadHandler",()=>{this.initMarkers(),this.insertAdjacentElement("afterbegin",this.mapboxSearchBarElement),this.geocoder.on("result",this.onGeocoderResultHandler),this.geocoder.on("clear",this.onGeocoderClearHandler);const e=new c.NavigationControl;this.map.addControl(e,"top-right");const t=new c.ScaleControl({maxWidth:100,unit:"imperial"});this.map.addControl(t,"bottom-right"),t.setUnit("metric"),this.map.addControl(new c.FullscreenControl({container:document.querySelector("body")}));const o=new c.GeolocateControl({positionOptions:{enableHighAccuracy:!0},trackUserLocation:!1,showUserHeading:!1,showUserLocation:!1,showAccuracyCircle:!1,fitBoundsOptions:{zoom:15}});this.map.addControl(o,"top-right");const r=[{title:"Navigation Night",uri:"mapbox://styles/mapbox/navigation-night-v1"},{title:"Navigation Day",uri:"mapbox://styles/mapbox/navigation-day-v1"},{title:"Satellite",uri:"mapbox://styles/mapbox/satellite-v9"},{title:"Outdoors",uri:"mapbox://styles/mapbox/outdoors-v11"},{title:"Streets",uri:"mapbox://styles/mapbox/streets-v11"},{title:"Light",uri:"mapbox://styles/mapbox/light-v9"},{title:"Dark",uri:"mapbox://styles/mapbox/dark-v9"}],a=new w(r,{defaultStyle:"Streets",eventListeners:{onChange:(s,l)=>(this.renderCheck=l!=="mapbox://styles/mapbox/dark-v9"&&l!=="mapbox://styles/mapbox/light-v9"&&l!=="mapbox://styles/mapbox/streets-v11",!1)}});this.map.addControl(a,"top-right"),this.map.addControl(new L,"top-right"),this.map.on("dblclick",this.onMapDoubleClickHandler),this.map.on("render",this.onMapRenderHandler),this.addEventListener("show-marker-list",this.toggleListMarkers)});i(this,"onGeocoderResultHandler",e=>{this.flyToMarker.setLngLat(e.result.center).addTo(this.map),this.map.flyTo({center:e.result.center})});i(this,"onGeocoderClearHandler",()=>{this.flyToMarker.remove()});i(this,"onMapRenderHandler",()=>{this.renderCheck||(this.add3DBuildings(this.map),this.addSkyLayer(this.map),this.renderCheck=!0)});i(this,"onMapDoubleClickHandler",e=>{this.addMarker(e.lngLat.lat,e.lngLat.lng),this.geocoder.clear()});i(this,"toggleListMarkers",e=>{var t,o,r,a;e.detail.showMarkerList?(this.mapboxMarkerListElement=new g(this.markers,this.map,this.mapboxSearchBarElement,this.userMarker),(t=document.getElementById("main-container"))==null||t.insertAdjacentElement("beforeend",this.mapboxMarkerListElement)):((a=(r=(o=this.mapboxMarkerListElement)==null?void 0:o.shadowRoot)==null?void 0:r.querySelector(".marker-list-container"))==null||a.classList.remove("show-list"),setTimeout(()=>{var s;(s=this.mapboxMarkerListElement)==null||s.remove(),this.mapboxMarkerListElement=null},100))});c.accessToken="pk.eyJ1IjoiaGRtYyIsImEiOiJjbDFkMjBiZ3YwNzA2M2NxaW0wOXJwODdlIn0.flDOcqO3X0uzJ6prWdwVQQ",this.map=new c.Map({container:this,style:"mapbox://styles/mapbox/streets-v11",zoom:17,pitch:0,antialias:!0,doubleClickZoom:!1,touchPitch:!0}),this.userMarker=new m.exports.Marker,navigator.geolocation.getCurrentPosition(e=>{const t=e.coords.latitude,o=e.coords.longitude;localStorage.setItem("user-marker",JSON.stringify({lat:t,lng:o})),this.map.setCenter(new c.LngLat(o,t)),this.userMarker.setLngLat([o,t]).setPopup(new m.exports.Popup({closeButton:!1,className:"shadow-popup"}).setHTML('<h3 style="margin: 0;">Ubicacion de dispositivo</h3>')).addTo(this.map)},()=>{this.map.setCenter([-90.513231,14.642028])}),this.geocoder=new v({accessToken:c.accessToken,placeholder:"Buscar...",mapboxgl:this.map}),this.mapboxSearchBarElement=new b(this.geocoder),this.flyToMarker=new c.Marker({color:"#fbc531"})}connectedCallback(){this.map.on("load",this.onMapLoadHandler)}disconnectedCallback(){this.removeEventListener("show-marker-list",this.toggleListMarkers),this.map.off("load",this.onMapLoadHandler),this.map.off("render",this.onMapRenderHandler),this.map.off("dblclick",this.onMapDoubleClickHandler),this.geocoder.off("result",this.onGeocoderResultHandler),this.geocoder.off("clear",this.onGeocoderClearHandler)}initMarkers(){const e=localStorage.getItem("marker-list");if(!e)return;const t=JSON.parse(e);this.markers=t.map(o=>{const r=document.createElement("h3");return r.style.margin="0",r.textContent=o.name,o.mapboxMarker=new m.exports.Marker({color:"#EA2027"}).setLngLat([o.longitude,o.latitude]).setPopup(new m.exports.Popup({closeButton:!1,className:"shadow-popup"}).setDOMContent(r)).addTo(this.map),o})}add3DBuildings(e){var r;const t=e.getStyle().layers,o=(r=t==null?void 0:t.find(a=>a.type==="symbol"&&(a==null?void 0:a.layout)&&(a==null?void 0:a.layout["text-field"])))==null?void 0:r.id;e.addLayer({id:"add-3d-buildings",source:"composite","source-layer":"building",filter:["==","extrude","true"],type:"fill-extrusion",minzoom:15,paint:{"fill-extrusion-color":"#aaa","fill-extrusion-height":["interpolate",["linear"],["zoom"],15,0,15.05,["get","height"]],"fill-extrusion-base":["interpolate",["linear"],["zoom"],15,0,15.05,["get","min_height"]],"fill-extrusion-opacity":1}},o)}addSkyLayer(e){e.addLayer({id:"sky",type:"sky",paint:{"sky-type":"atmosphere","sky-atmosphere-sun":[0,0],"sky-atmosphere-sun-intensity":15}})}addMarker(e,t){const o=new c.Marker({color:"#EA2027"}).setLngLat([t,e]).addTo(this.map),r=new u(o,this.map,this.markers);this.insertAdjacentElement("beforeend",r)}}customElements.define("mapbox-map",M);class E extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"})}connectedCallback(){this.render()}get styles(){return`
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
        `}render(){!this.shadowRoot||(this.shadowRoot.innerHTML=`
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
        `)}}customElements.define("mapbox-not-support",E);class S extends HTMLElement{constructor(){super();localStorage.getItem("marker-list")||localStorage.setItem("marker-list","[]")}connectedCallback(){c.accessToken="pk.eyJ1IjoiaGRtYyIsImEiOiJjbDFkMjBiZ3YwNzA2M2NxaW0wOXJwODdlIn0.flDOcqO3X0uzJ6prWdwVQQ";const e=c.supported();this.render(e)}render(e){e?this.innerHTML=`
            <mapbox-map class="map-container"></mapbox-map>
            `:this.innerHTML=`
            <mapbox-not-support></mapbox-not-support>
            `}}customElements.define("maps-app",S);
