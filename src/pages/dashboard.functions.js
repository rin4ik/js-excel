import { storage } from '../core/utils'

export function toHTML(key) {
    const model = storage(key)
    const id = key.split(':')[1]
    return `
        <li class="db__record"> 
            <a href="#/excel/${id}">${model.title}</a>
            <strong>27.08.2021</strong>
        </li>
    `
}
function getAllKeys() {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.includes('excel')) continue;
        keys.push(key)
    }
    return keys
}
export function createRecordsTable() {
    const keys = getAllKeys()
    if (!keys.length) {
        return `<p>You dont have any records yet!</p>`
    }
    return `<div class="db__list-header">
            <span>Name</span>
            <span>Creation date</span>
        </div>
        <ul class="db__list">
            ${keys.map(toHTML).join('')}
        </ul>
    `
}
