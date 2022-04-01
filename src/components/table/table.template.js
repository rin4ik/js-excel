import { defaultStyles } from '../../constants';
import { camelToDashCase } from '../../core/utils';

const CODES = {
    A: 65,
    Z: 90
}
const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;
function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px'
}
function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px'
}
function toCell(state, row) {
    return function(_, col) {
        const id = `${row}:${col}`
        const width = getWidth(state.colState, col)
        const data = state.dataState[id]
        const styles = Object.keys(defaultStyles)
            .map(key => `${camelToDashCase(key)}: ${defaultStyles[key]}`)
            .join(';')
        return `
            <div class="cell" 
                contenteditable 
                data-col="${col}" 
                data-id="${row}:${col}"
                style="${styles}; width: ${width}"
                data-type="Cell"
            >
            ${data || ''}
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
function createRow(content, index, state) {
    const resizer = index ?
        `<div class="row-resize" data-resize="row"></div>` : '';
    const height = getHeight(state, index)
    return `
        <div class="row" 
            data-type="resizable" 
            data-row="${index}" 
            style="height: ${height}"
        >
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
    rows.push(createRow(cols, '', {}))
    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(state, i))
            .join('')
        rows.push(createRow(cells, i+1, state.rowState))
    }
    return rows.join('')
}
