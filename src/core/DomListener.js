export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error(`No $root provided for DomListener`)
        }
        this.listeners = listeners
        this.$root = $root
    }
    initDOMListeners() {
        console.log(this.listeners)
    }
    removeDOMListeners() {

    }
}
