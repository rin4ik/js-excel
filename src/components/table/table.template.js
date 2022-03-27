const CODES = {
    A: 65,
    Z: 90
}
const DEFAULT_WIDTH = 120;
function toCell(state, row) {
    return function(_, col) {
        return `
            <div class="cell" 
                contenteditable 
                data-col="${col}" 
                data-id="${row}:${col}"
                style="width: ${getWidth(state.colState, col)}"
                data-type="Cell"
            >
            </div>
        `
    }
}
function toCol({col, index, width}) {
    return `
        <div class="column" data-type="resizable" data-col="${index}" 
            style="width: ${width}">
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
function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px'
}
function withWidthFrom(state) {
    return function(col, index) {
        return {
            col, index, width: getWidth(state.colState, index)
        }
    }
}
export function createTable(rowsCount = 40, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(withWidthFrom(state))
        .map(toCol)
        .join('')
    rows.push(createRow(cols, ''))
    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(state, i))
            .join('')
        rows.push(createRow(cells, i+1))
    }
    return rows.join('')
}
