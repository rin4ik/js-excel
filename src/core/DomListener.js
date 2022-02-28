import { capitalize } from './utils'

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error(`No $root provided for DomListener`)
        }
        this.$root = $root
        this.listeners = listeners
    }
    initDOMListeners() {
        this.listeners.forEach(listener => {
            const method = `on${capitalize(listener)}`
            if (!this[method]) {
                const name = this.name || ''
                console.log(this)
                throw new Error(`
                    Method ${method} is not implemented in ${name}`
                )
            }
            this.$root.on(listener, this[method].bind(this))
        })
    }
    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const method = `on${capitalize(listener)}`
            this.$root.remove(listener, this[method])
        })
    }
}
