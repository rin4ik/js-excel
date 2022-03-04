import { ExcelComponent } from '@/core/ExcelComponent';
import { createTable } from './table.template';
import {$} from '@core/dom'
export class Table extends ExcelComponent {
    static className = 'excel__table'
    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown']
        })
    }
    toHTML() {
        return createTable()
    }
    onMousedown(event) {
        if (event.target.dataset.resize) {
            const $resizer = $(event.target)
            const $parent = $resizer.closest('[data-type="resizable"]')
            const cols = $parent.data.col
            const cells = this.$root.findAll(`[data-col='${cols}']`)
            const coords = $parent.getCoords()
            document.onmousemove = e => {
                const delta = e.pageX - coords.right
                const value = coords.width + delta
                console.log(value)
                $parent.$el.style.width = value + 'px'
                cells.forEach(el => el.style.width = value + 'px');
            }
            document.onmouseup = () => {
                document.onmousemove = null
            }
        }
    }
}
