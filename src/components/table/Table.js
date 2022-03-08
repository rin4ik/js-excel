import { ExcelComponent } from '@/core/ExcelComponent';
import { isCell, matrix, nextSelector, shouldResize } from './table.functions';
import { resizeHandler } from './table.resize';
import { createTable } from './table.template';
import { TableSelection } from './TableSelection';
import {$} from '@core/dom'

export class Table extends ExcelComponent {
    static className = 'excel__table'
    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown']
        })
    }
    toHTML() {
        return createTable()
    }
    init() {
        super.init()
        this.selection = new TableSelection()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selection.select($cell)
    }
    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const target = $target.id(true)
                const current = this.selection.current.id(true)
                const $cells = matrix(target, current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selection.select($(event.target))
            }
        }
    }
    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown'
        ]
        const {key} = event
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, id))
            this.selection.select($next)
        }
    }
}

