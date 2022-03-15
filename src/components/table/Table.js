import { ExcelComponent } from '@/core/ExcelComponent';
import { isCell, matrix, nextSelector, shouldResize } from './table.functions';
import { resizeHandler } from './table.resize';
import { createTable } from './table.template';
import { TableSelection } from './TableSelection';
import {$} from '@core/dom'

export class Table extends ExcelComponent {
    static className = 'excel__table'
    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }
    toHTML() {
        return createTable()
    }
    init() {
        super.init()
        this.selection = new TableSelection()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selectCell($cell);
        this.$on('formula:input', text => {
            this.selection.current.text(text)
        })
        this.$on('formula:done', () => {
            this.selection.current.focus()
        })
        this.$subscribe(state => {
            console.log('Table State', state)
        })
    }
    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
    }
    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event)
            this.$dispatch({type: 'TABLE_RESIZE', data})
        } catch (e) {
            console.warn('Resize error', e.message)
        }
    }
    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const target = $target.id(true)
                const current = this.selection.current.id(true)
                const $cells = matrix(target, current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selectCell($target)
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
            this.selectCell($next);
        }
    }
    onInput(event) {
        this.$emit('table:input', $(event.target))
    }
}

