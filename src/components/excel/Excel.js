export class Excel {
    constructor(selector, options) {
        this.$el = document.querySelector(selector)
        this.components = options.components || []
    }
    getRoot() {
        // afterbegin, afterend, befoeend, beforebegin
        // this.$el.insertAdjacentHTML('afterbegin', `<h1>Test</h1>`)
        const $root = document.createElement('div')
        $root.className = 'excel'
        this.components.forEach(Component => {
            const component = new Component()
            $root.insertAdjacentHTML('beforeend', component.toHTML())
        })
        return $root
    }
    render() {
        this.$el.append(this.getRoot());
    }
}
