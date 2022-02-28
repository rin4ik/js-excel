// pure functions
export function capitalize(string) {
    if (typeof string !== 'string') {
        return ''
    }
    return string.charAt(string[0]).toUpperCase() + string.slice(1);
}
