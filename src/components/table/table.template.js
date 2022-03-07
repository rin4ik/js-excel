const CODES = {
    A: 65,
    Z: 90
}
function toCell(row) {
    return function(_, col) {
        return `
            <div class="cell" 
                contenteditable 
                data-col="${col}" 
                data-id="${row}:${col}"
                data-type="Cell"
            >
            </div>
        `
    }
}
function toCol(col, index) {
    return `
        <div class="column" data-type="resizable" data-col="${index}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
        </div>
    `
}
function createRow(content, index) {
    const resizer = index ?
        `<div class="row-resize" data-resize="row"></div>` : '';
    return `
        <div class="row" data-type="resizable">
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
            .map(toCell(i))
            .join('')
        rows.push(createRow(cells, i+1))
    }
    return rows.join('')
}
