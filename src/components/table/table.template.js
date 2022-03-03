const CODES = {
    A: 65,
    Z: 90
}
function toCell(cell) {
    return `
        <div class="cell" contenteditable>${cell}</div>
    `
}
function toCol(col) {
    return `
        <div class="column">
        ${col}
        <div class="col-resize"></div>
        </div>
    `
}
function createRow(content, index) {
    const resizer = index ? `<div class="row-resize"></div>` : '';
    return `
        <div class="row">
            <div class="row-info">
                ${index}
                ${resizer} 
            </div>
            <div class="row-data">${content}</div>
        </div>    
    `
}
function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}
export function createTable(rowsCount = 40) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toCol)
        .join('')
    rows.push(createRow(cols, ''))
    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell)
            .join('')
        rows.push(createRow(cells, i+1))
    }
    return rows.join('')
}
