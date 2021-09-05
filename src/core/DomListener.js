import { capitalize } from './utils';

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error(`No $root provided for DomListener`)
        }
        this.listeners = listeners
        this.$root = $root
    }
    initDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            if (!this[method]) {
                const name = this.name || ''
                throw new Error(
                    `Method ${method} is not implemented in ${name} Component`
                )
            }
            this.$root.on(listener, this[method].bind(this))
        })
    }
    // removeDOMListeners() {
    // }
}
function getMethodName(event) {
    return 'on' + capitalize(event)
}
