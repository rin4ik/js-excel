import { ExcelComponent } from '@/core/ExcelComponent';

export class Table extends ExcelComponent {
    static className = 'excel__table'
    constructor($root) {
        super($root, {
            name: 'Formula',
            listeners: ['input']
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
}
