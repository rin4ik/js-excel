import { ExcelComponent } from '@/core/ExcelComponent';

export class Table extends ExcelComponent {
    static className = 'excel__table'
    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['input', 'click']
        })
    }
    toHTML() {
        return `
            <div class="row">
                    <div class="row-info"></div>
                    <div class="row-data">
                        <div class="column">
                            A
                        </div>
                        <div class="column">
                            B
                        </div>
                        <div class="column">
                            C
                        </div>  
                    </div>
                </div>
                <div class="row">
                    <div class="row-info">1</div>
                    <div class="row-data">
                        <div class="cell selected" contenteditable> A1
                        </div>
                        <div class="cell" contenteditable> B2
                        </div>
                        <div class="cell" contenteditable> C3
                        </div>
                    </div>
                </div> 
            `
    }
    onInput(event) {
        console.log('oniput table', event.target.textContent.trim(), this.$root)
    }
    onClick(event) {
        console.log('onClick table column', event)
    }
}
