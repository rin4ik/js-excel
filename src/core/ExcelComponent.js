import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
    // returns components template
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name
        this.prepare()
    }
    toHTML() {
        return '';
    }

    init() {
        this.initDOMListeners()
    }
    destroy() {
        this.removeDOMListeners()
    }
    prepare() {}
}
