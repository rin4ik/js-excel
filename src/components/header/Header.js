import { ExcelComponent } from '@/core/ExcelComponent';

export class Header extends ExcelComponent {
    static className = 'excel__header'
    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options
        })
    }
    toHTML() {
        return `
            <input type="text" value="New table" class="input">
            <div>
                <div class="button">
                    <i class="material-icons">delete</i>
                </div>
                <div class="button">
                    <i class="material-icons">exit_to_app</i>
                </div>
            </div>
        `
    }
    onInput(event) {
        console.log('oniput header', event.target.textContent.trim())
    }
}
