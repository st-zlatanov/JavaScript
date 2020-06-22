const styles = div {
    display: block;
                position: absolute;
                height: 210px;
                width: 210px;
                background-repeat: no-repeat;
                background-size: 420px 210px;

                transition-delay: 0s;
                transition-duration: 100ms;
                transition-property: transform;
                transition-timing-function: linear;

                background-image: url(/assets/ship-sprite.gif);

                top: 0;
                left: 0;
                background-position: 0 0;
                transform: rotate(90deg);
};


class SpaceShip extends HTMLElement {
    constructor(){
        super();
        console.log("constructed");
    }
    adoptedCallback(){
        console.log("attached");
    }
    connectedCallback(){
        console.log("connected");
    }
    disconnectedCallback(){
        console.log("disconnected");
    }
    static get observedAttributes(){

    }
    attributeChangedCallback(){

    }
}

windows.customElements.define('space-ship', SpaceShip);