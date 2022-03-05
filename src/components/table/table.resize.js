import {$} from '@core/dom'

export function resizeHandler($root, event) {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const cols = $parent.data.col
    const isColumn = $resizer.data.resize === 'col'
    const coords = $parent.getCoords()
    const sideProp = isColumn ? 'bottom' : 'right'
    let value
    $resizer.css({
        opacity: 1,
        zIndex: 1000,
        [sideProp]: '-5000px'
    })
    document.onmousemove = e => {
        if (isColumn) {
            const delta = e.pageX - coords.right
            value = coords.width + delta
            $resizer.css({
                right: -delta + 'px'
            })
        } else {
            const delta = e.pageY - coords.bottom
            value = coords.height + delta
            $resizer.css({
                bottom: -delta + 'px'
            })
        }
    }
    document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        if (isColumn) {
            $parent.css({
                width: value + 'px'
            })
            $root.findAll(`[data-col='${cols}']`)
                .forEach(el => el.style.width = value + 'px');
        } else {
            $parent.css({
                height: value + 'px'
            })
        }
        $resizer.css({
            opacity: 0,
            bottom: 0,
            right: 0
        })
    }
}
